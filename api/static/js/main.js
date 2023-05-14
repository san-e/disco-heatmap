//import "./heatmap.js";
//import "./panzoom.min.js";

"use strict;"

async function a(){

function posToPercentage(pos) {
  return (pos * 6.6 - 50).toFixed(2);
}

async function getJsonData(url) {
  let response = await fetch(url);
  
  let commits = await response.json();
  return commits
}


/* https://stackoverflow.com/a/25490531 */
function getCookie(a, b) {
  b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

const systemArray = await getJsonData("../static/data/systemArray.json");
const oorpSystems = await getJsonData("../static/data/oorpSystems.json");
const sysNameToNickname = await getJsonData("../static/data/sysNameToNickname.json");

// const elem = document.querySelector(".grid");
// const panzoom = Panzoom(elem, {
//   maxScale: 5,
//   minScale: 1,
//   panOnlyWhenZoomed: false,
//   canvas: true,
//   contain: "outside"
// });

// elem.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);

// const input = document.querySelector("#deine-mutter");
// input.value = window.intervall;
// input.onchange = function() {
//   window.intervall = input.value;
//   clearInterval(update);
//   update = setInterval(updateHeatmap, window.intervall)
// };

function highlight(element) {
  var className = element.className;
  element.className = className + " highlighted";
}

function unhighlight(element) {
  var className = element.className;
  element.className = className.replace("highlighted", "");
}

function Line(x1, x2, y1, y2, classString, propString, container) {
  x1 = parseFloat(x1);
  x2 = parseFloat(x2);
  y1 = parseFloat(y1);
  y2 = parseFloat(y2);
  var lineObject = document.createElement("div");
  var linePivot = document.createElement("div");
  var parent = document.querySelector(container);
  var xDiff = x1 - x2;
  var yDiff = y1 - y2;
  var xAvg = (x1 + x2) / 2.0;
  var yAvg = (y1 + y2) / 2.0;
  var lineLength = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  linePivot.className = classString + " " + propString;
  linePivot.style.left = yAvg + "%";
  linePivot.style.top = xAvg + "%";
  linePivot.style.position = "absolute";
  lineObject.style.height = (lineLength / 100) * parent.offsetHeight + "px";
  lineObject.style.transform =
    "translateY(-" + (lineLength / 200) * parent.offsetHeight + "px)";
  lineObject.style.webkitTransform =
    "translateY(-" + (lineLength / 200) * parent.offsetHeight + "px)";
  lineObject.style.position = "absolute";
  lineObject.className = propString;
  linePivot.style.transform = "rotate(" + -Math.atan2(yDiff, xDiff) + "rad)";
  linePivot.style.webkitTransform =
    "rotate(" + -Math.atan2(yDiff, xDiff) + "rad)";
  linePivot.appendChild(lineObject);
  document.querySelector(container).appendChild(linePivot);
}

function getPos(element) {
  const parentPos = document.querySelector(".grid").getBoundingClientRect();
  const childPos = element.getBoundingClientRect();
  var relativePos = {};

  (relativePos.top = (childPos.top - parentPos.top).toFixed(2)),
  (relativePos.right = (childPos.right - parentPos.right).toFixed(2)),
  (relativePos.bottom = (childPos.bottom - parentPos.bottom).toFixed(2)),
  (relativePos.left = (childPos.left - parentPos.left).toFixed(2));
  return relativePos;
}

function populateSystems() {
  for (var nickname in systemArray) {
    if (oorpSystems.includes(nickname)) {
      continue;
    }
    var system = document.createElement("div");
    system.className = "system li";
    system.id = nickname;
    system.onmouseover = function () {
      highlight(this);
    };
    system.onmouseout = function () {
      unhighlight(this);
    };
    system.onclick = function () {
      getPos(this);
    };
    var systemLabel = document.createElement("label");
    systemLabel.className = "systemLabel";
    systemLabel.innerHTML = systemArray[nickname]["name"];
    system.appendChild(systemLabel);
    system.style.top = posToPercentage(systemArray[nickname]["pos"][1]) + "%";
    system.style.left = posToPercentage(systemArray[nickname]["pos"][0]) + "%";
    system.style.position = "absolute";
    document.querySelector(".systemContainer").appendChild(system);
  }
  console.log("Systems Populated");
}

function drawConnections() {
  for (var nickname in systemArray) {
    if (oorpSystems.includes(nickname)) {
      continue;
    }
    var x1 = posToPercentage(systemArray[nickname]["pos"][1]);
    var y1 = posToPercentage(systemArray[nickname]["pos"][0]);
    for (var jhconnectionIndex in systemArray[nickname]["jhConnections"]) {
      var connection =
        systemArray[nickname]["jhConnections"][jhconnectionIndex];
      if (oorpSystems.includes(connection)) {
        continue;
      }
      var x2 = posToPercentage(systemArray[connection]["pos"][1]);
      var y2 = posToPercentage(systemArray[connection]["pos"][0]);

      Line(x1, x2, y1, y2, "systemConnection", "jhConnection", ".connections");
    }
    for (var jgconnectionIndex in systemArray[nickname]["jgConnections"]) {
      var connection =
        systemArray[nickname]["jgConnections"][jgconnectionIndex];
      if (oorpSystems.includes(connection)) {
        continue;
      }
      var x2 = posToPercentage(systemArray[connection]["pos"][1]);
      var y2 = posToPercentage(systemArray[connection]["pos"][0]);

      Line(x1, x2, y1, y2, "systemConnection", "jgConnection", ".connections");
    }
  }
  console.log("Connections Drawn");
}

function initzializeHeatmap() {
  var heatmapInstance = h337.create({
    container: document.querySelector(".heatmap"),
    blur: .85,
    radius: 80
  });

  return heatmapInstance
}

async function getSystemPlayercount() {
  let players = await getJsonData("../player-api")
  let systemCounts= players["playercount"];
  let timestamp = players["timestamp"]
  let total = players["total"]

  return [systemCounts, timestamp, total];
  }

async function updateHeatmap() {
  const amogus = await getSystemPlayercount()
  const playercount = amogus[0];
  const timestamp = amogus[1];
  const total = amogus[2];
  var datapoints = [];
  Object.keys(playercount).forEach(system => {
    const count = playercount[system];

    var x = parseFloat(getPos(document.getElementById(system)).left) + 7;
    var y = parseFloat(getPos(document.getElementById(system)).top) + 7;

    var datapoint = {
      x: x + Math.floor(Math.random()-0.5) * (count / 5),
      y: y + Math.floor(Math.random()-0.5) * (count / 5),
      value: count * window.maxValue
    };
    datapoints.push(datapoint)
  })

  var data = {
    max: Math.max(...Object.values(playercount)),
    min: 0,
    data: datapoints,
  }

  heatmapInstance.setData(data)
  document.getElementById("timestamp").innerHTML = timestamp
  document.getElementById("total-players").innerHTML = "Total Players: " + total
}

window.intervall = 60_000;
window.maxValue = 1

const maxValSlider = document.getElementById("value-range");
if (getCookie("maxVal")) {
  maxValSlider.value = parseInt(getCookie("maxVal"));
  window.maxValue = parseInt(getCookie("maxVal"));
};
maxValSlider.oninput = function() {
  window.maxValue = maxValSlider.value / 100;
};

const updateButton = document.getElementById("update-button");
updateButton.onclick = function(){
  updateHeatmap();
  document.cookie = "maxVal=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; path=/; domain='" + location.host;
  document.cookie = "maxVal=" + ((window.maxValue+1) * 100);
};

populateSystems();
drawConnections();
var heatmapInstance = initzializeHeatmap();

await updateHeatmap();
var update = setInterval(updateHeatmap, window.intervall);

}

a();