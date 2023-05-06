import "./heatmap.js";

function posToPercentage(pos) {
  return (pos * 6.6 - 50).toFixed(2);
}

var systemArray = {
  br01: {
    pos: [2, 11],
    name: "New London",
    connections: [
      "br10",
      "br02",
      "br03",
      "br04",
      "br05",
      "br03",
      "br04",
      "br05"
    ]
  },
  br02: {
    pos: [4, 10],
    name: "Manchester",
    connections: ["br01", "br07", "iw03", "iw04", "br07", "iw03"]
  },
  br03: {
    pos: [3, 12],
    name: "Cambridge",
    connections: ["br01", "bw01", "br16", "br01", "bw01", "bw02", "br16"]
  },
  br04: {
    pos: [2, 9],
    name: "Leeds",
    connections: [
      "br01",
      "br07",
      "bw10",
      "br05",
      "br06",
      "br07",
      "iw03",
      "br01"
    ]
  },
  br05: {
    pos: [1, 12],
    name: "Dublin",
    connections: ["br01", "br01", "br04", "br06", "br16"]
  },
  br06: {
    pos: [0, 10],
    name: "Edinburgh",
    connections: ["br04", "br05", "br08", "bw10", "bw15"]
  },
  br07: {
    pos: [3, 8.7],
    name: "Newcastle",
    connections: ["br02", "br04", "br02", "br04", "bw10", "iw11"]
  },
  br08: {
    pos: [0, 5],
    name: "Orkney",
    connections: ["br06", "ew13", "bw08", "ga05"]
  },
  br10: {
    pos: [0, 16],
    name: "New London Atmosphere",
    connections: ["br01"]
  },
  br13: {
    pos: [5, 8],
    name: "Inverness",
    connections: ["iw04", "iw08", "iw11"]
  },
  br16: {
    pos: [1.5, 13],
    name: "Poole",
    connections: ["br03", "ew07", "br03", "br05"]
  },
  bw01: {
    pos: [5, 12],
    name: "Omega-3",
    connections: ["br03", "bw03", "br03", "bw02"]
  },
  bw02: {
    pos: [5, 13],
    name: "Omega-5",
    connections: ["ew03", "bw01", "bw03", "br03"]
  },
  bw03: {
    pos: [7, 12.0],
    name: "Omega-7",
    connections: ["bw01", "rh03", "bw02", "ew07", "bw04"]
  },
  bw04: {
    pos: [7, 12.9],
    name: "Omega-11",
    connections: ["rh03", "bw03", "rh05", "rh03", "bw12"]
  },
  bw05: {
    pos: [11, 5],
    name: "Sigma-13",
    connections: ["ku04", "rh04", "ku04", "bw06", "bw07", "rh04"]
  },
  bw06: {
    pos: [12, 5],
    name: "Sigma-17",
    connections: ["bw07", "bw05", "bw07", "ew04", "li16"]
  },
  bw07: {
    pos: [11, 4],
    name: "Sigma-19",
    connections: ["ku04", "bw06", "bw05", "bw06", "bw69", "ew02", "ku04"]
  },
  bw08: {
    pos: [2, 5],
    name: "Tau-23",
    connections: [
      "br08",
      "bw09",
      "bw10",
      "bw16",
      "ew01",
      "ew13",
      "ku03",
      "bw10",
      "ew13"
    ]
  },
  bw09: {
    pos: [3, 6],
    name: "Tau-29",
    connections: ["bw10", "ku03", "bw08", "bw10", "iw12"]
  },
  bw10: {
    pos: [2, 7],
    name: "Tau-31",
    connections: [
      "br04",
      "bw08",
      "bw09",
      "br06",
      "iw11",
      "br07",
      "bw16",
      "bw09",
      "bw08"
    ]
  },
  bw12: {
    pos: [10.5, 12.8],
    name: "Omega-55",
    connections: ["ew07", "hi02", "bw04", "rh05", "hi20"]
  },
  bw15: {
    pos: [-1, 9],
    name: "Roussillon",
    connections: ["br06", "bw16", "ga05"]
  },
  bw16: {
    pos: [1, 5.5],
    name: "Tau-44",
    connections: ["bw08", "bw10", "bw15", "ga08"]
  },
  bw69: {
    pos: [10, 3],
    name: "Sigma-59",
    connections: ["ku13", "bw07", "ku13", "li16", "st39"]
  },
  bw71: {
    pos: [14, 7],
    name: "Omicron Rho",
    connections: ["hi20", "rh09", "st04", "st07"]
  },
  ew01: {
    pos: [3, 2],
    name: "Tau-37",
    connections: ["hi01", "ku10", "bw08", "ga04"]
  },
  ew02: {
    pos: [11, 1],
    name: "Omicron Beta",
    connections: ["hi19", "bw07", "hi01", "st08"]
  },
  ew03: {
    pos: [10, 14],
    name: "Omega-41",
    connections: ["ew04", "ew07", "hi02", "bw02"]
  },
  ew04: {
    pos: [14, 11],
    name: "Omicron Theta",
    connections: ["hi02", "bw06", "ew03", "hi01"]
  },
  ew06: {
    pos: [16, 11],
    name: "Omicron Kappa",
    connections: ["hi02", "st04"]
  },
  ew07: {
    pos: [6, 14],
    name: "Omega-48",
    connections: ["bw12", "ew09", "bw03", "br16", "ew03"]
  },
  ew09: {
    pos: [4, 14.8],
    name: "Omega-52",
    connections: ["ew07"]
  },
  ew13: {
    pos: [1, 2],
    name: "Languedoc",
    connections: ["ga01", "bw08", "ga01", "ga08", "br08", "bw08", "ew15"]
  },
  ew15: {
    pos: [2, 0],
    name: "Burgundy",
    connections: ["ga01", "ew16", "ga04", "ga01", "ga04", "ew13", "ew16"]
  },
  ew16: {
    pos: [1, -1],
    name: "Champagne",
    connections: ["ga02", "ew15", "ga02", "ew15"]
  },
  fp7_system: {
    pos: [16, 6],
    name: "Omicron Lost",
    connections: ["st04", "st03"]
  },
  ga01: {
    pos: [1, 0],
    name: "Ile-de-France",
    connections: [
      "ga03",
      "ga08",
      "ew13",
      "ew15",
      "ga01",
      "ga01",
      "ga03",
      "ga08",
      "ew13",
      "ew15"
    ]
  },
  ga02: {
    pos: [0, -1],
    name: "Orleanais",
    connections: ["ew16", "ga03", "ga03", "ew16"]
  },
  ga03: {
    pos: [-1, 0],
    name: "Picardy",
    connections: ["ga01", "ga02", "ga07", "ga01", "ga02"]
  },
  ga04: {
    pos: [3, 1],
    name: "Lorraine",
    connections: ["ew15", "ew01", "ew15", "ku10"]
  },
  ga05: {
    pos: [-1, 6],
    name: "Tau-61",
    connections: ["br08", "bw15"]
  },
  ga07: {
    pos: [-2, 10],
    name: "Zurich",
    connections: ["ga03", "rh07", "rh07"]
  },
  ga08: {
    pos: [0, 1],
    name: "Provence",
    connections: ["ga01", "ga01", "ew13", "bw16"]
  },
  hi01: {
    pos: [8.1, -0.3],
    name: "Omicron Alpha",
    connections: ["ew01", "ew02", "ew04", "st06"]
  },
  hi02: {
    pos: [13, 14],
    name: "Omicron Gamma",
    connections: ["ew03", "ew04", "ew06", "hi20", "bw12"]
  },
  hi10: {
    pos: [13.3, 5.7],
    name: "Omicron Nu",
    connections: ["li15", "li15", "st01"]
  },
  hi19: {
    pos: [13.7, 7.7],
    name: "Planet Knossos",
    connections: ["ew02", "hi20"]
  },
  hi20: {
    pos: [14, 9],
    name: "Omicron Xi",
    connections: ["hi02", "rh06", "hi19", "bw71", "bw12"]
  },
  iw01: {
    pos: [9, 9],
    name: "Bering",
    connections: ["li04", "iw02", "rh08", "li18", "li04", "rh02", "rh02"]
  },
  iw02: {
    pos: [9, 10],
    name: "Hudson",
    connections: ["li04", "rh02", "iw01", "li04", "rh02"]
  },
  iw03: {
    pos: [5, 10],
    name: "Magellan",
    connections: ["br02", "li02", "br02", "br04", "iw04", "iw08"]
  },
  iw04: {
    pos: [5, 9],
    name: "Cortez",
    connections: ["br02", "li02", "br13", "iw03", "iw11", "li02"]
  },
  iw05: {
    pos: [6, 6],
    name: "Kepler",
    connections: ["ku02", "li03", "iw06", "li03", "li12"]
  },
  iw06: {
    pos: [8, 6],
    name: "Galileo",
    connections: ["ku02", "li03", "iw05", "ku02", "li03"]
  },
  iw08: {
    pos: [6, 10],
    name: "Vespucci",
    connections: ["iw03", "li17", "br13"]
  },
  iw11: {
    pos: [4, 8.9],
    name: "Coronado",
    connections: ["br07", "iw04", "bw10", "br13"]
  },
  iw12: {
    pos: [3.5, 7],
    name: "Baffin",
    connections: ["bw09"]
  },
  ku01: {
    pos: [7, 4],
    name: "New Tokyo",
    connections: ["ku02", "ku03", "ku04", "ku05", "ku03", "ku04", "ku05"]
  },
  ku02: {
    pos: [7, 5],
    name: "Shikoku",
    connections: ["ku01", "iw05", "iw06", "iw06", "ku03"]
  },
  ku03: {
    pos: [6, 4],
    name: "Kyushu",
    connections: [
      "bw09",
      "ku01",
      "ku09",
      "bw08",
      "ku01",
      "ku02",
      "ku05",
      "ku09"
    ]
  },
  ku04: {
    pos: [8, 4],
    name: "Honshu",
    connections: [
      "ku01",
      "ku13",
      "li16",
      "bw05",
      "bw07",
      "ku01",
      "li16",
      "bw05",
      "bw07"
    ]
  },
  ku05: {
    pos: [7, 3],
    name: "Hokkaido",
    connections: ["ku01", "ku01", "ku03", "ku06", "ku07", "ku10"]
  },
  ku06: {
    pos: [7, 2],
    name: "Chugoku",
    connections: ["ku09", "ku05", "ku07"]
  },
  ku07: {
    pos: [9, 2],
    name: "Tohoku",
    connections: ["ku05", "ku06", "ku13", "st39"]
  },
  ku09: {
    pos: [5, 3],
    name: "Tottori",
    connections: ["ku03", "ku03", "ku06", "ku10"]
  },
  ku10: {
    pos: [5, 2],
    name: "Tau-53",
    connections: ["ew01", "ga04", "ku05", "ku09"]
  },
  ku13: {
    pos: [9, 3],
    name: "Okinawa",
    connections: ["bw69", "ku04", "bw69", "ku07"]
  },
  li01: {
    pos: [7, 8],
    name: "New York",
    connections: [
      "li02",
      "li03",
      "li04",
      "li05",
      "li09",
      "li01",
      "li01",
      "li03",
      "li04"
    ]
  },
  li02: {
    pos: [6, 9],
    name: "California",
    connections: ["iw03", "iw04", "li01", "iw04", "li04", "li09", "li12"]
  },
  li03: {
    pos: [7, 7],
    name: "Colorado",
    connections: ["li01", "iw05", "iw06", "iw05", "iw06", "li01", "li12"]
  },
  li04: {
    pos: [8, 9],
    name: "Texas",
    connections: [
      "iw01",
      "iw02",
      "li01",
      "li15",
      "iw01",
      "iw02",
      "li01",
      "li02",
      "li17",
      "li15"
    ]
  },
  li05: {
    pos: [9, 7],
    name: "Alaska",
    connections: ["li01", "li15"]
  },
  li09: {
    pos: [7, 9],
    name: "Pennsylvania",
    connections: ["li01", "li02", "li17"]
  },
  li12: {
    pos: [6, 8],
    name: "Ontario",
    connections: ["li02", "li03", "iw05"]
  },
  li15: {
    pos: [9, 8],
    name: "Virginia",
    connections: ["li04", "hi10", "li05", "li04", "hi10"]
  },
  li16: {
    pos: [10, 6],
    name: "Sigma-21",
    connections: ["ku04", "bw06", "bw69", "ku04", "rh09"]
  },
  li17: {
    pos: [7, 10],
    name: "Kansas",
    connections: ["no01", "li04", "li09", "iw08"]
  },
  li18: {
    pos: [10.1, 8.6],
    name: "Puerto Rico",
    connections: ["iw01"]
  },
  no01: {
    pos: [8, 10],
    name: "Unknown",
    connections: ["li17", "rh08"]
  },
  rh01: {
    pos: [11, 11],
    name: "New Berlin",
    connections: ["rh02", "rh03", "rh04", "rh05", "rh02", "rh05", "rh04"]
  },
  rh02: {
    pos: [10, 10],
    name: "Hamburg",
    connections: [
      "iw01",
      "iw02",
      "rh01",
      "iw01",
      "iw02",
      "rh01",
      "rh07",
      "rh08"
    ]
  },
  rh03: {
    pos: [10, 11],
    name: "Stuttgart",
    connections: ["bw03", "bw04", "rh01", "rh07", "bw04", "rh05", "rh07"]
  },
  rh04: {
    pos: [12, 10],
    name: "Frankfurt",
    connections: [
      "rh01",
      "bw05",
      "rh06",
      "rh09",
      "rh08",
      "rh01",
      "rh05",
      "rh06",
      "rh08",
      "bw05"
    ]
  },
  rh05: {
    pos: [11, 12],
    name: "Dresden",
    connections: ["rh01", "rh01", "rh03", "rh04", "rh07", "bw04", "bw12"]
  },
  rh06: {
    pos: [13, 11],
    name: "Munich",
    connections: ["rh04", "rh04", "rh09", "hi20"]
  },
  rh07: {
    pos: [8.5, 11],
    name: "Cologne",
    connections: ["rh03", "ga07", "rh02", "rh03", "rh05", "ga07"]
  },
  rh08: {
    pos: [11, 9],
    name: "Thuringia",
    connections: ["iw01", "rh02", "no01", "rh04", "rh04"]
  },
  rh09: {
    pos: [12, 7],
    name: "Sigma-15",
    connections: ["rh04", "rh06", "li16", "bw71"]
  },
  st01: {
    pos: [13.5, 4.8],
    name: "Omicron Minor",
    connections: ["hi10", "st07", "st08"]
  },
  st03: {
    pos: [16, 4],
    name: "Omicron Major",
    connections: ["fp7_system", "st05", "st05"]
  },
  st04: {
    pos: [16, 9],
    name: "Omicron Delta",
    connections: ["ew06", "bw71", "fp7_system", "st07"]
  },
  st05: {
    pos: [14, 3],
    name: "Omicron Iota",
    connections: ["st03", "st06", "st07"]
  },
  st06: {
    pos: [15, 1],
    name: "Omicron Psi",
    connections: ["hi01", "st03", "st39"]
  },
  st07: {
    pos: [14.7, 5.3],
    name: "Omicron Zeta",
    connections: ["st01", "st05", "st08", "st04", "bw71"]
  },
  st08: {
    pos: [13.3, 3.7],
    name: "Omicron Mu",
    connections: ["st07", "ew02", "st01", "st39"]
  },
  st39: {
    pos: [13, 2.5],
    name: "Omicron Epsilon",
    connections: ["st08", "bw69", "st06", "ku07"]
  }
};

var oorpSystems = [
  "br09",
  "br14",
  "br17",
  "br19",
  "br22",
  "bw11",
  "bw13",
  "bw14",
  "bw17",
  "bw21",
  "bw46",
  "bw58",
  "ca01",
  "ev01",
  "ev02",
  "ev03",
  "ew05",
  "ew08",
  "ew11",
  "ew12",
  "li06",
  "ew14",
  "ew17",
  "ew18",
  "ew19",
  "ew37",
  "ew45",
  "ew63",
  "ew85",
  "ga06",
  "ga09",
  "ga10",
  "ga11",
  "ga12",
  "ga13",
  "ga14",
  "hi03",
  "hi05",
  "hi08",
  "hi08",
  "hi18",
  "hi22",
  "hlp1",
  "hlp2",
  "iw07",
  "iw09",
  "iw13",
  "ku08",
  "ku15",
  "ku16",
  "ku17",
  "li07",
  "li08",
  "li10",
  "li11",
  "li13",
  "li14",
  "rh10",
  "rh11",
  "rh12",
  "st02",
  "st02c",
  "st03b"
];

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

function amogus(element) {
  const parentPos = document.getElementsByClassName('grid').getBoundingClientRect();
  alert(parentPos)
  // const childPos  = element.getBoundingClientRect();
  // var relativePos = {};

  // relativePos.top    = childPos.top - parentPos.top,
  // relativePos.right  = childPos.right - parentPos.right,
  // relativePos.bottom = childPos.bottom - parentPos.bottom,
  // relativePos.left   = childPos.left - parentPos.left;
  // alert(relativePos.left)
}

function populateSystems() {
  for (var nickname in systemArray) {
    if (oorpSystems.includes(nickname)) {
      continue;
    }
    var system = document.createElement("div");
    system.className = "system li";
    system.id = nickname
    system.onmouseover = function () {
      highlight(this);
    };
    system.onmouseout = function () {
      unhighlight(this);
    };
    system.onclick = function() {
      amogus(this)
    }
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

function generateConnections() {
  for (var nickname in systemArray) {
    var x1 = posToPercentage(systemArray[nickname]["pos"][1]);
    var y1 = posToPercentage(systemArray[nickname]["pos"][0]);
    for (var connectionIndex in systemArray[nickname]["connections"]) {
      var connection = systemArray[nickname]["connections"][connectionIndex];
      var x2 = posToPercentage(systemArray[connection]["pos"][1]);
      var y2 = posToPercentage(systemArray[connection]["pos"][0]);

      Line(x1, x2, y1, y2, "systemConnection", "", ".connections");
    }
  }
}

function heat() {
  // minimal heatmap instance configuration
  var heatmapInstance = h337.create({
    // only container is required, the rest will be defaults
    container: document.querySelector(".heatmap")
  });

  // now generate some random data
  var points = [];
  var max = 0;
  var width = 834;
  var height = 834;
  var len = 200;

  while (len--) {
    var val = Math.floor(Math.random() * 100);
    max = Math.max(max, val);
    var point = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      value: val
    };
    points.push(point);
  }
  // heatmap data format
  var data = {
    max: max,
    data: points
  };
  // if you have a set of datapoints always use setData instead of addData
  // for data initialization
  heatmapInstance.setData(data);
}

populateSystems();
generateConnections();
heat();

