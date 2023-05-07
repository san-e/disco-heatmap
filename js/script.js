import "./heatmap.js";
//import "./panzoom.min.js";

function posToPercentage(pos) {
  return (pos * 6.6 - 50).toFixed(2);
}

const systemArray = {
  br01: {
    name: "New London",
    pos: [2, 11],
    jgConnections: ["br02", "br03", "br04", "br05"],
    jhConnections: ["br10", "br03", "br04", "br05"]
  },
  br02: {
    name: "Manchester",
    pos: [4, 10],
    jgConnections: ["br01", "br07", "iw03", "iw04"],
    jhConnections: ["br07", "iw03"]
  },
  br03: {
    name: "Cambridge",
    pos: [3, 12],
    jgConnections: ["br01", "bw01", "br16"],
    jhConnections: ["br01", "bw01", "bw02", "br16"]
  },
  br04: {
    name: "Leeds",
    pos: [2, 9],
    jgConnections: ["br01", "br07", "bw10"],
    jhConnections: ["br05", "br06", "br07", "iw03", "br01"]
  },
  br05: {
    name: "Dublin",
    pos: [1, 12],
    jgConnections: ["br01"],
    jhConnections: ["br01", "br04", "br06", "br16"]
  },
  br06: {
    name: "Edinburgh",
    pos: [0, 10],
    jgConnections: [],
    jhConnections: ["br04", "br05", "br08", "bw10", "bw15"]
  },
  br07: {
    name: "Newcastle",
    pos: [3, 8.7],
    jgConnections: ["br02", "br04"],
    jhConnections: ["br02", "br04", "bw10", "iw11"]
  },
  br08: {
    name: "Orkney",
    pos: [0, 5],
    jgConnections: [],
    jhConnections: ["br06", "ew13", "bw08", "ga05"]
  },
  br09: {
    name: "Leeds VR",
    pos: [4, 11],
    jgConnections: [],
    jhConnections: []
  },
  br10: {
    name: "New London Atmosphere",
    pos: [0, 16],
    jgConnections: [],
    jhConnections: ["br01"]
  },
  br13: {
    name: "Inverness",
    pos: [5, 8],
    jgConnections: [],
    jhConnections: ["iw04", "iw08", "iw11"]
  },
  br14: {
    name: "???",
    pos: [4, 16],
    jgConnections: [],
    jhConnections: []
  },
  br16: {
    name: "Poole",
    pos: [1.5, 13],
    jgConnections: ["br03"],
    jhConnections: ["ew07", "br03", "br05"]
  },
  br17: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  br19: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  br22: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  bw01: {
    name: "Omega-3",
    pos: [5, 12],
    jgConnections: ["br03", "bw03"],
    jhConnections: ["br03", "bw02"]
  },
  bw02: {
    name: "Omega-5",
    pos: [5, 13],
    jgConnections: [],
    jhConnections: ["ew03", "bw01", "bw03", "br03"]
  },
  bw03: {
    name: "Omega-7",
    pos: [7, 12.0],
    jgConnections: ["bw01", "rh03"],
    jhConnections: ["bw02", "ew07", "bw04"]
  },
  bw04: {
    name: "Omega-11",
    pos: [7, 12.9],
    jgConnections: ["rh03"],
    jhConnections: ["bw03", "rh05", "rh03", "bw12"]
  },
  bw05: {
    name: "Sigma-13",
    pos: [11, 5],
    jgConnections: ["ku04", "rh04"],
    jhConnections: ["ku04", "bw06", "bw07", "rh04"]
  },
  bw06: {
    name: "Sigma-17",
    pos: [12, 5],
    jgConnections: ["bw07"],
    jhConnections: ["bw05", "bw07", "ew04", "li16"]
  },
  bw07: {
    name: "Sigma-19",
    pos: [11, 4],
    jgConnections: ["ku04", "bw06"],
    jhConnections: ["bw05", "bw06", "bw69", "ew02", "ku04"]
  },
  bw08: {
    name: "Tau-23",
    pos: [2, 5],
    jgConnections: ["bw10", "ew13"],
    jhConnections: ["br08", "bw09", "bw10", "bw16", "ew01", "ew13", "ku03"]
  },
  bw09: {
    name: "Tau-29",
    pos: [3, 6],
    jgConnections: ["bw10", "ku03"],
    jhConnections: ["bw08", "bw10", "iw12"]
  },
  bw10: {
    name: "Tau-31",
    pos: [2, 7],
    jgConnections: ["br04", "bw08", "bw09"],
    jhConnections: ["br06", "iw11", "br07", "bw16", "bw09", "bw08"]
  },
  bw11: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  bw12: {
    name: "Omega-55",
    pos: [10.5, 12.8],
    jgConnections: [],
    jhConnections: ["ew07", "hi02", "bw04", "rh05", "hi20"]
  },
  bw13: {
    name: "Uncharted Tau",
    pos: [12, 16],
    jgConnections: [],
    jhConnections: []
  },
  bw14: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  bw15: {
    name: "Roussillon",
    pos: [-1, 9],
    jgConnections: [],
    jhConnections: ["br06", "bw16", "ga05"]
  },
  bw16: {
    name: "Tau-44",
    pos: [1, 5.5],
    jgConnections: [],
    jhConnections: ["bw08", "bw10", "bw15", "ga08"]
  },
  bw17: {
    name: "Drake",
    pos: [4, 18],
    jgConnections: [],
    jhConnections: ["br13"]
  },
  bw21: {
    name: "Uncharted Sigma",
    pos: [14, 16],
    jgConnections: [],
    jhConnections: []
  },
  bw46: {
    name: "Omega-54",
    pos: [10, 12],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  bw58: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  bw69: {
    name: "Sigma-59",
    pos: [10, 3],
    jgConnections: ["ku13"],
    jhConnections: ["bw07", "ku13", "li16", "st39"]
  },
  bw71: {
    name: "Omicron Rho",
    pos: [14, 7],
    jgConnections: [],
    jhConnections: ["hi20", "rh09", "st04", "st07"]
  },
  ew01: {
    name: "Tau-37",
    pos: [3, 2],
    jgConnections: [],
    jhConnections: ["hi01", "ku10", "bw08", "ga04"]
  },
  ew02: {
    name: "Omicron Beta",
    pos: [11, 1],
    jgConnections: ["hi19"],
    jhConnections: ["bw07", "hi01", "st08"]
  },
  ew03: {
    name: "Omega-41",
    pos: [10, 14],
    jgConnections: [],
    jhConnections: ["ew04", "ew07", "hi02", "bw02"]
  },
  ew04: {
    name: "Omicron Theta",
    pos: [14, 11],
    jgConnections: [],
    jhConnections: ["hi02", "bw06", "ew03", "hi01"]
  },
  ew05: {
    name: "Uncharted I",
    pos: [2, 17],
    jgConnections: [],
    jhConnections: []
  },
  ew06: {
    name: "Omicron Kappa",
    pos: [16, 11],
    jgConnections: [],
    jhConnections: ["hi02", "st04"]
  },
  ew07: {
    name: "Omega-48",
    pos: [6, 14],
    jgConnections: [],
    jhConnections: ["bw12", "ew09", "bw03", "br16", "ew03"]
  },
  ew08: {
    name: "Omega-49",
    pos: [2.9, 16.5],
    jgConnections: [],
    jhConnections: ["ew13"]
  },
  ew09: {
    name: "Omega-52",
    pos: [4, 14.8],
    jgConnections: [],
    jhConnections: ["ew07"]
  },
  ew11: {
    name: "Uncharted IV",
    pos: [12, 1.5],
    jgConnections: [],
    jhConnections: []
  },
  ew12: {
    name: "???",
    pos: [0, 17],
    jgConnections: [],
    jhConnections: []
  },
  ew13: {
    name: "Languedoc",
    pos: [1, 2],
    jgConnections: ["ga01", "bw08"],
    jhConnections: ["ga01", "ga08", "br08", "bw08", "ew15"]
  },
  ew14: {
    name: "Uncharted Gallia",
    pos: [2, 2],
    jgConnections: [],
    jhConnections: ["ew13"]
  },
  ew15: {
    name: "Burgundy",
    pos: [2, 0],
    jgConnections: ["ga01", "ew16", "ga04"],
    jhConnections: ["ga01", "ga04", "ew13", "ew16"]
  },
  ew16: {
    name: "Champagne",
    pos: [1, -1],
    jgConnections: ["ga02", "ew15"],
    jhConnections: ["ga02", "ew15"]
  },
  ew17: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ew18: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ew19: {
    name: "Uncharted III",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: []
  },
  ew37: {
    name: "Uncharted II",
    pos: [4, 17],
    jgConnections: [],
    jhConnections: []
  },
  ew45: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ew63: {
    name: "Uncharted Omega",
    pos: [16, 16],
    jgConnections: [],
    jhConnections: []
  },
  ew85: {
    name: "Uncharted Omicron",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: []
  },
  fp7_system: {
    name: "Omicron Lost",
    pos: [16, 6],
    jgConnections: [],
    jhConnections: ["st04", "st03"]
  },
  ga01: {
    name: "Ile-de-France",
    pos: [1, 0],
    jgConnections: ["ga03", "ga08", "ew13", "ew15"],
    jhConnections: ["ga01", "ga01", "ga03", "ga08", "ew13", "ew15"]
  },
  ga02: {
    name: "Orleanais",
    pos: [0, -1],
    jgConnections: ["ew16", "ga03"],
    jhConnections: ["ga03", "ew16"]
  },
  ga03: {
    name: "Picardy",
    pos: [-1, 0],
    jgConnections: ["ga01", "ga02", "ga07"],
    jhConnections: ["ga01", "ga02"]
  },
  ga04: {
    name: "Lorraine",
    pos: [3, 1],
    jgConnections: ["ew15"],
    jhConnections: ["ew01", "ew15", "ku10"]
  },
  ga05: {
    name: "Tau-61",
    pos: [-1, 6],
    jgConnections: [],
    jhConnections: ["br08", "bw15"]
  },
  ga06: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ga07: {
    name: "Zurich",
    pos: [-2, 10],
    jgConnections: ["ga03", "rh07"],
    jhConnections: ["rh07"]
  },
  ga08: {
    name: "Provence",
    pos: [0, 1],
    jgConnections: ["ga01"],
    jhConnections: ["ga01", "ew13", "bw16"]
  },
  ga09: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ga10: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ga11: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ga12: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ga13: {
    name: "???",
    pos: [15, 13],
    jgConnections: ["ew04"],
    jhConnections: []
  },
  ga14: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  hi01: {
    name: "Omicron Alpha",
    pos: [8.1, -0.3],
    jgConnections: [],
    jhConnections: ["ew01", "ew02", "ew04", "st06"]
  },
  hi02: {
    name: "Omicron Gamma",
    pos: [13, 14],
    jgConnections: [],
    jhConnections: ["ew03", "ew04", "ew06", "hi20", "bw12"]
  },
  hi03: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  hi05: {
    name: "Omicron Tau",
    pos: [6, -1],
    jgConnections: [],
    jhConnections: ["hi01"]
  },
  hi08: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  hi10: {
    name: "Omicron Nu",
    pos: [13.3, 5.7],
    jgConnections: ["li15"],
    jhConnections: ["li15", "st01"]
  },
  hi18: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  hi19: {
    name: "Planet Knossos",
    pos: [13.7, 7.7],
    jgConnections: ["ew02"],
    jhConnections: ["hi20"]
  },
  hi20: {
    name: "Omicron Xi",
    pos: [14, 9],
    jgConnections: [],
    jhConnections: ["hi02", "rh06", "hi19", "bw71", "bw12"]
  },
  hi22: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  iw01: {
    name: "Bering",
    pos: [9, 9],
    jgConnections: ["li04", "rh02"],
    jhConnections: ["iw02", "rh08", "li18", "li04", "rh02"]
  },
  iw02: {
    name: "Hudson",
    pos: [9, 10],
    jgConnections: ["li04", "rh02"],
    jhConnections: ["iw01", "li04", "rh02"]
  },
  iw03: {
    name: "Magellan",
    pos: [5, 10],
    jgConnections: ["br02", "li02"],
    jhConnections: ["br02", "br04", "iw04", "iw08"]
  },
  iw04: {
    name: "Cortez",
    pos: [5, 9],
    jgConnections: ["br02", "li02"],
    jhConnections: ["br13", "iw03", "iw11", "li02"]
  },
  iw05: {
    name: "Kepler",
    pos: [6, 6],
    jgConnections: ["ku02", "li03"],
    jhConnections: ["iw06", "li03", "li12"]
  },
  iw06: {
    name: "Galileo",
    pos: [8, 6],
    jgConnections: ["ku02", "li03"],
    jhConnections: ["iw05", "ku02", "li03"]
  },
  iw07: {
    name: "Texas VR",
    pos: [8, 18],
    jgConnections: [],
    jhConnections: []
  },
  iw08: {
    name: "Vespucci",
    pos: [6, 10],
    jgConnections: [],
    jhConnections: ["iw03", "li17", "br13", "li10"]
  },
  iw09: {
    name: "Bastille",
    pos: [-1, 15],
    jgConnections: [],
    jhConnections: []
  },
  iw11: {
    name: "Coronado",
    pos: [4, 8.9],
    jgConnections: [],
    jhConnections: ["br07", "iw04", "bw10", "br13"]
  },
  iw12: {
    name: "Baffin",
    pos: [3.5, 7],
    jgConnections: [],
    jhConnections: ["bw09"]
  },
  iw13: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ku01: {
    name: "New Tokyo",
    pos: [7, 4],
    jgConnections: ["ku02", "ku03", "ku04", "ku05"],
    jhConnections: ["ku03", "ku04", "ku05"]
  },
  ku02: {
    name: "Shikoku",
    pos: [7, 5],
    jgConnections: ["ku01", "iw05", "iw06"],
    jhConnections: ["iw06", "ku03"]
  },
  ku03: {
    name: "Kyushu",
    pos: [6, 4],
    jgConnections: ["bw09", "ku01", "ku09"],
    jhConnections: ["bw08", "ku01", "ku02", "ku05", "ku09"]
  },
  ku04: {
    name: "Honshu",
    pos: [8, 4],
    jgConnections: ["ku01", "ku13", "li16", "bw05", "bw07"],
    jhConnections: ["ku01", "li16", "bw05", "bw07"]
  },
  ku05: {
    name: "Hokkaido",
    pos: [7, 3],
    jgConnections: ["ku01"],
    jhConnections: ["ku01", "ku03", "ku06", "ku07", "ku10"]
  },
  ku06: {
    name: "Chugoku",
    pos: [7, 2],
    jgConnections: [],
    jhConnections: ["ku09", "ku05", "ku07"]
  },
  ku07: {
    name: "Tohoku",
    pos: [9, 2],
    jgConnections: [],
    jhConnections: ["ku05", "ku06", "ku13", "st39"]
  },
  ku08: {
    name: "Nagano",
    pos: [7, 1],
    jgConnections: [],
    jhConnections: ["hi01"]
  },
  ku09: {
    name: "Tottori",
    pos: [5, 3],
    jgConnections: ["ku03"],
    jhConnections: ["ku03", "ku06", "ku10"]
  },
  ku10: {
    name: "Tau-53",
    pos: [5, 2],
    jgConnections: [],
    jhConnections: ["ew01", "ga04", "ku05", "ku09"]
  },
  ku13: {
    name: "Okinawa",
    pos: [9, 3],
    jgConnections: ["bw69", "ku04"],
    jhConnections: ["bw69", "ku07"]
  },
  ku15: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ku16: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  ku17: {
    name: "Uncharted Kusari",
    pos: [6, 16],
    jgConnections: [],
    jhConnections: []
  },
  li01: {
    name: "New York",
    pos: [7, 8],
    jgConnections: ["li02", "li03", "li04", "li05", "li09"],
    jhConnections: ["li01", "li01", "li03", "li04"]
  },
  li02: {
    name: "California",
    pos: [6, 9],
    jgConnections: ["iw03", "iw04", "li01"],
    jhConnections: ["iw04", "li04", "li09", "li12"]
  },
  li03: {
    name: "Colorado",
    pos: [7, 7],
    jgConnections: ["li01", "iw05", "iw06"],
    jhConnections: ["iw05", "iw06", "li01", "li12"]
  },
  li04: {
    name: "Texas",
    pos: [8, 9],
    jgConnections: ["iw01", "iw02", "li01", "li15"],
    jhConnections: ["iw01", "iw02", "li01", "li02", "li17", "li15"]
  },
  li05: {
    name: "Alaska",
    pos: [9, 7],
    jgConnections: ["li01"],
    jhConnections: ["li15"]
  },
  li06: {
    name: "Connecticut",
    pos: [1, 15],
    jgConnections: [],
    jhConnections: ["li06", "li06", "li06", "li06"]
  },
  li07: {
    name: "Uncharted Liberty",
    pos: [2, 16],
    jgConnections: [],
    jhConnections: []
  },
  li08: {
    name: "Alberta",
    pos: [5, 17],
    jgConnections: [],
    jhConnections: ["hi01"]
  },
  li09: {
    name: "Pennsylvania",
    pos: [7, 9],
    jgConnections: ["li01"],
    jhConnections: ["li02", "li17"]
  },
  li10: {
    name: "Unknown",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["iw08"]
  },
  li11: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  li12: {
    name: "Ontario",
    pos: [6, 8],
    jgConnections: [],
    jhConnections: ["li02", "li03", "iw05"]
  },
  li13: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  li14: {
    name: "New Hampshire",
    pos: [10, 8],
    jgConnections: [],
    jhConnections: ["li15"]
  },
  li15: {
    name: "Virginia",
    pos: [9, 8],
    jgConnections: ["li04", "hi10"],
    jhConnections: ["li05", "li04", "hi10"]
  },
  li16: {
    name: "Sigma-21",
    pos: [10, 6],
    jgConnections: ["ku04"],
    jhConnections: ["bw06", "bw69", "ku04", "rh09"]
  },
  li17: {
    name: "Kansas",
    pos: [7, 10],
    jgConnections: ["no01"],
    jhConnections: ["li04", "li09", "iw08"]
  },
  li18: {
    name: "Puerto Rico",
    pos: [10.1, 8.6],
    jgConnections: [],
    jhConnections: ["iw01"]
  },
  no01: {
    name: "Unknown",
    pos: [8, 10],
    jgConnections: ["li17"],
    jhConnections: ["rh08"]
  },
  rh01: {
    name: "New Berlin",
    pos: [11, 11],
    jgConnections: ["rh02", "rh03", "rh04", "rh05"],
    jhConnections: ["rh02", "rh05", "rh04"]
  },
  rh02: {
    name: "Hamburg",
    pos: [10, 10],
    jgConnections: ["iw01", "iw02", "rh01"],
    jhConnections: ["iw01", "iw02", "rh01", "rh07", "rh08"]
  },
  rh03: {
    name: "Stuttgart",
    pos: [10, 11],
    jgConnections: ["bw03", "bw04", "rh01", "rh07"],
    jhConnections: ["bw04", "rh05", "rh07"]
  },
  rh04: {
    name: "Frankfurt",
    pos: [12, 10],
    jgConnections: ["rh01", "bw05", "rh06", "rh09"],
    jhConnections: ["rh08", "rh01", "rh05", "rh06", "rh08", "bw05"]
  },
  rh05: {
    name: "Dresden",
    pos: [11, 12],
    jgConnections: ["rh01"],
    jhConnections: ["rh01", "rh03", "rh04", "rh07", "bw04", "bw12"]
  },
  rh06: {
    name: "Munich",
    pos: [13, 11],
    jgConnections: ["rh04"],
    jhConnections: ["rh04", "rh09", "hi20"]
  },
  rh07: {
    name: "Cologne",
    pos: [8.5, 11],
    jgConnections: ["rh03", "ga07"],
    jhConnections: ["rh02", "rh03", "rh05", "ga07"]
  },
  rh08: {
    name: "Thuringia",
    pos: [11, 9],
    jgConnections: [],
    jhConnections: ["iw01", "rh02", "no01", "rh04", "rh04"]
  },
  rh09: {
    name: "Sigma-15",
    pos: [12, 7],
    jgConnections: ["rh04"],
    jhConnections: ["rh06", "li16", "bw71"]
  },
  rh10: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  rh11: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  rh12: {
    name: "Uncharted Rheinland",
    pos: [8, 16],
    jgConnections: [],
    jhConnections: []
  },
  st01: {
    name: "Omicron Minor",
    pos: [13.5, 4.8],
    jgConnections: [],
    jhConnections: ["hi10", "st07", "st08"]
  },
  st02: {
    name: "Omega-58",
    pos: [12, 12],
    jgConnections: [],
    jhConnections: ["bw06"]
  },
  st02c: {
    name: "Omicron Chi",
    pos: [12.5, 1.5],
    jgConnections: [],
    jhConnections: ["ew04"]
  },
  st03: {
    name: "Omicron Major",
    pos: [16, 4],
    jgConnections: ["st05"],
    jhConnections: ["fp7_system", "st05"]
  },
  st03b: {
    name: "Omicron Major",
    pos: [16, 3],
    jgConnections: ["st03"],
    jhConnections: []
  },
  st04: {
    name: "Omicron Delta",
    pos: [16, 9],
    jgConnections: [],
    jhConnections: ["ew06", "bw71", "fp7_system", "st07"]
  },
  st05: {
    name: "Omicron Iota",
    pos: [14, 3],
    jgConnections: ["st06", "st07"],
    jhConnections: ["st03"]
  },
  st06: {
    name: "Omicron Psi",
    pos: [15, 1],
    jgConnections: ["st03"],
    jhConnections: ["hi01", "st39"]
  },
  st07: {
    name: "Omicron Zeta",
    pos: [14.7, 5.3],
    jgConnections: ["st05"],
    jhConnections: ["st01", "st08", "st04", "bw71"]
  },
  st08: {
    name: "Omicron Mu",
    pos: [13.3, 3.7],
    jgConnections: [],
    jhConnections: ["st07", "ew02", "st01", "st39"]
  },
  st39: {
    name: "Omicron Epsilon",
    pos: [13, 2.5],
    jgConnections: [],
    jhConnections: ["st08", "bw69", "st06", "ku07"]
  },
  ca01: {
    name: "???",
    pos: [13, 5],
    jgConnections: [],
    jhConnections: []
  },
  ev01: {
    name: "Planet Tomioka",
    pos: [9, 1],
    jgConnections: [],
    jhConnections: ["ku09"]
  },
  ev02: {
    name: "Atmosphere",
    pos: [0, 16],
    jgConnections: [],
    jhConnections: []
  },
  ev03: {
    name: "Atmosphere",
    pos: [0, 16],
    jgConnections: [],
    jhConnections: []
  },
  hlp1: {
    name: "HELP SYSTEM",
    pos: [15, 0],
    jgConnections: [],
    jhConnections: []
  },
  hlp2: {
    name: "HELP SYSTEM",
    pos: [15, 0],
    jgConnections: [],
    jhConnections: []
  }
};

const oorpSystems = [
  "br09",
  "br10",
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

const sysNameToNickname = {
  "New London": "br01",
  "Manchester": "br02",
  "Cambridge": "br03",
  "Leeds": "br04",
  "Dublin": "br05",
  "Edinburgh": "br06",
  "Newcastle": "br07",
  "Orkney": "br08",
  "Leeds VR": "br09",
  "New London Atmosphere": "br10",
  "Inverness": "br13",
  "???": "ca01",
  "Poole": "br16",
  "Omega-3": "bw01",
  "Omega-5": "bw02",
  "Omega-7": "bw03",
  "Omega-11": "bw04",
  "Sigma-13": "bw05",
  "Sigma-17": "bw06",
  "Sigma-19": "bw07",
  "Tau-23": "bw08",
  "Tau-29": "bw09",
  "Tau-31": "bw10",
  "Omega-55": "bw12",
  "Uncharted Tau": "bw13",
  "Roussillon": "bw15",
  "Tau-44": "bw16",
  "Drake": "bw17",
  "Uncharted Sigma": "bw21",
  "Omega-54": "bw46",
  "Sigma-59": "bw69",
  "Omicron Rho": "bw71",
  "Tau-37": "ew01",
  "Omicron Beta": "ew02",
  "Omega-41": "ew03",
  "Omicron Theta": "ew04",
  "Uncharted I": "ew05",
  "Omicron Kappa": "ew06",
  "Omega-48": "ew07",
  "Omega-49": "ew08",
  "Omega-52": "ew09",
  "Uncharted IV": "ew11",
  "Languedoc": "ew13",
  "Uncharted Gallia": "ew14",
  "Burgundy": "ew15",
  "Champagne": "ew16",
  "Uncharted III": "ew19",
  "Uncharted II": "ew37",
  "Uncharted Omega": "ew63",
  "Uncharted Omicron": "ew85",
  "Omicron Lost": "fp7_system",
  "Ile-de-France": "ga01",
  "Orleanais": "ga02",
  "Picardy": "ga03",
  "Lorraine": "ga04",
  "Tau-61": "ga05",
  "Zurich": "ga07",
  "Provence": "ga08",
  "Omicron Alpha": "hi01",
  "Omicron Gamma": "hi02",
  "Omicron Tau": "hi05",
  "Omicron Nu": "hi10",
  "Planet Knossos": "hi19",
  "Omicron Xi": "hi20",
  "Bering": "iw01",
  "Hudson": "iw02",
  "Magellan": "iw03",
  "Cortez": "iw04",
  "Kepler": "iw05",
  "Galileo": "iw06",
  "Texas VR": "iw07",
  "Vespucci": "iw08",
  "Bastille": "iw09",
  "Coronado": "iw11",
  "Baffin": "iw12",
  "New Tokyo": "ku01",
  "Shikoku": "ku02",
  "Kyushu": "ku03",
  "Honshu": "ku04",
  "Hokkaido": "ku05",
  "Chugoku": "ku06",
  "Tohoku": "ku07",
  "Nagano": "ku08",
  "Tottori": "ku09",
  "Tau-53": "ku10",
  "Okinawa": "ku13",
  "Uncharted Kusari": "ku17",
  "New York": "li01",
  "California": "li02",
  "Colorado": "li03",
  "Texas": "li04",
  "Alaska": "li05",
  "Connecticut": "li06",
  "Uncharted Liberty": "li07",
  "Alberta": "li08",
  "Pennsylvania": "li09",
  "Unknown": "no01",
  "Ontario": "li12",
  "New Hampshire": "li14",
  "Virginia": "li15",
  "Sigma-21": "li16",
  "Kansas": "li17",
  "Puerto Rico": "li18",
  "New Berlin": "rh01",
  "Hamburg": "rh02",
  "Stuttgart": "rh03",
  "Frankfurt": "rh04",
  "Dresden": "rh05",
  "Munich": "rh06",
  "Cologne": "rh07",
  "Thuringia": "rh08",
  "Sigma-15": "rh09",
  "Uncharted Rheinland": "rh12",
  "Omicron Minor": "st01",
  "Omega-58": "st02",
  "Omicron Chi": "st02c",
  "Omicron Major": "st03b",
  "Omicron Delta": "st04",
  "Omicron Iota": "st05",
  "Omicron Psi": "st06",
  "Omicron Zeta": "st07",
  "Omicron Mu": "st08",
  "Omicron Epsilon": "st39",
  "Planet Tomioka": "ev01",
  "Atmosphere": "ev03",
  "HELP SYSTEM": "hlp2"
}

const players = [
  {
    error: null,
    players: [
      {
        time: "1h36",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h19",
        name: "Abstergo",
        system: "Omicron Beta",
        region: "North Edge Worlds"
      },
      {
        time: "1h14",
        name: "SEO|T-Legion",
        system: "Texas",
        region: "Liberty Space"
      },
      {
        time: "1h09",
        name: "GINTJ",
        system: "Omicron Beta",
        region: "North Edge Worlds"
      },
      {
        time: "56m",
        name: "Voidfox",
        system: "Okinawa",
        region: "Sigma Border Worlds"
      },
      {
        time: "56m",
        name: "T_R_N",
        system: "Picardy",
        region: "Gallia Space"
      },
      {
        time: "42m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "38m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "30m",
        name: "IMG|Meyers",
        system: "Ile-de-France",
        region: "Gallia Space"
      },
      {
        time: "29m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "29m",
        name: "Star.Hero",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "27m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "19m",
        name: "AWES-Independence",
        system: "New Tokyo",
        region: "Kusari Space"
      },
      {
        time: "18m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "18m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "15m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "14m",
        name: "Rainbird.Express",
        system: "Tau-44",
        region: "Tau Border Worlds"
      },
      {
        time: "11m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "11m",
        name: "1st|LNS-Bateley",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "7m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "6m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "6m",
        name: "Gunnarsson.Peri",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "4m",
        name: "Treasure.Hunt",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "1m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "1m",
        name: "TheMule",
        system: "Connecticut",
        region: "Uncharted Space"
      }
    ],
    timestamp: "2023-05-07T10:37:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h37",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h15",
        name: "SEO|T-Legion",
        system: "Texas",
        region: "Liberty Space"
      },
      {
        time: "1h10",
        name: "GINTJ",
        system: "Omicron Beta",
        region: "North Edge Worlds"
      },
      {
        time: "57m",
        name: "Voidfox",
        system: "Okinawa",
        region: "Sigma Border Worlds"
      },
      {
        time: "57m",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "43m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "39m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "31m",
        name: "IMG|Meyers",
        system: "Ile-de-France",
        region: "Gallia Space"
      },
      {
        time: "30m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "30m",
        name: "Star.Hero",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "28m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "20m",
        name: "AWES-Independence",
        system: "New Tokyo",
        region: "Kusari Space"
      },
      {
        time: "19m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "19m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "16m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "15m",
        name: "Rainbird.Express",
        system: "Tau-31",
        region: "Tau Border Worlds"
      },
      {
        time: "12m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "8m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "7m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "7m",
        name: "Gunnarsson.Peri",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "2m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "1m",
        name: "Trophy.Hunter",
        system: "Baffin",
        region: "Tau Border Worlds"
      },
      {
        time: "1m",
        name: "Soldier-7",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1m",
        name: "Recycle.please",
        system: "Coronado",
        region: "Independent Worlds"
      }
    ],
    timestamp: "2023-05-07T10:38:02"
  },
  {
    error: null,
    players: [
      {
        time: "1h38",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h16",
        name: "SEO|T-Legion",
        system: "Texas",
        region: "Liberty Space"
      },
      {
        time: "1h11",
        name: "GINTJ",
        system: "Omicron Beta",
        region: "North Edge Worlds"
      },
      {
        time: "58m",
        name: "Voidfox",
        system: "Okinawa",
        region: "Sigma Border Worlds"
      },
      {
        time: "58m",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "44m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "41m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "32m",
        name: "IMG|Meyers",
        system: "Ile-de-France",
        region: "Gallia Space"
      },
      {
        time: "31m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "31m",
        name: "Star.Hero",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "29m",
        name: "Lucinda",
        system: "Tau-31",
        region: "Tau Border Worlds"
      },
      {
        time: "21m",
        name: "AWES-Independence",
        system: "New Tokyo",
        region: "Kusari Space"
      },
      {
        time: "20m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "20m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "17m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "16m",
        name: "Rainbird.Express",
        system: "Tau-31",
        region: "Tau Border Worlds"
      },
      {
        time: "13m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "9m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "8m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "8m",
        name: "Gunnarsson.Peri",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "3m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "2m",
        name: "Soldier-7",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "2m",
        name: "Recycle.please",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "1m",
        name: "Treasure.Hunt",
        system: "Connecticut",
        region: "Uncharted Space"
      }
    ],
    timestamp: "2023-05-07T10:39:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h39",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h17",
        name: "SEO|T-Legion",
        system: "Texas",
        region: "Liberty Space"
      },
      {
        time: "1h12",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "59m",
        name: "Voidfox",
        system: "Okinawa",
        region: "Sigma Border Worlds"
      },
      {
        time: "59m",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "45m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "42m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "33m",
        name: "IMG|Meyers",
        system: "Ile-de-France",
        region: "Gallia Space"
      },
      {
        time: "32m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "32m",
        name: "Star.Hero",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "30m",
        name: "Lucinda",
        system: "Tau-31",
        region: "Tau Border Worlds"
      },
      {
        time: "22m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "21m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "21m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "18m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "17m",
        name: "Rainbird.Express",
        system: "Tau-31",
        region: "Tau Border Worlds"
      },
      {
        time: "14m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "10m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "9m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "9m",
        name: "Gunnarsson.Peri",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "4m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "3m",
        name: "Soldier-7",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "2m",
        name: "Treasure.Hunt",
        system: "Connecticut",
        region: "Uncharted Space"
      }
    ],
    timestamp: "2023-05-07T10:40:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h40",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h18",
        name: "SEO|T-Legion",
        system: "Texas",
        region: "Liberty Space"
      },
      {
        time: "1h13",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1h00",
        name: "Voidfox",
        system: "Okinawa",
        region: "Sigma Border Worlds"
      },
      {
        time: "1h00",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "46m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "43m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "34m",
        name: "IMG|Meyers",
        system: "Picardy",
        region: "Gallia Space"
      },
      {
        time: "33m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "33m",
        name: "Star.Hero",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "31m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "23m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "22m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "22m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "19m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "18m",
        name: "Rainbird.Express",
        system: "Tau-29",
        region: "Tau Border Worlds"
      },
      {
        time: "15m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "11m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "10m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "5m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "4m",
        name: "Soldier-7",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "3m",
        name: "Treasure.Hunt",
        system: "Connecticut",
        region: "Uncharted Space"
      },
      {
        time: "1m",
        name: "Cassio.Peia",
        system: "Planet Knossos",
        region: "Unknown"
      }
    ],
    timestamp: "2023-05-07T10:41:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h41",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h14",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1h01",
        name: "Voidfox",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "1h01",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "47m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "44m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "35m",
        name: "IMG|Meyers",
        system: "Picardy",
        region: "Gallia Space"
      },
      {
        time: "34m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "32m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "24m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "23m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "23m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "20m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "19m",
        name: "Rainbird.Express",
        system: "Tau-29",
        region: "Tau Border Worlds"
      },
      {
        time: "16m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "12m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "11m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "6m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "4m",
        name: "Treasure.Hunt",
        system: "Connecticut",
        region: "Uncharted Space"
      },
      {
        time: "2m",
        name: "Cassio.Peia",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1m",
        name: "Abstergo",
        system: "Omicron Beta",
        region: "North Edge Worlds"
      }
    ],
    timestamp: "2023-05-07T10:42:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h42",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h15",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1h02",
        name: "Voidfox",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "1h02",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "48m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "45m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "36m",
        name: "IMG|Meyers",
        system: "Connecticut",
        region: "Uncharted Space"
      },
      {
        time: "35m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "33m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "25m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "24m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "24m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "21m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "20m",
        name: "Rainbird.Express",
        system: "Baffin",
        region: "Tau Border Worlds"
      },
      {
        time: "17m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "13m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "12m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "7m",
        name: "Buntau0027Asuke",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "5m",
        name: "Treasure.Hunt",
        system: "Connecticut",
        region: "Uncharted Space"
      },
      {
        time: "3m",
        name: "Cassio.Peia",
        system: "Omicron Xi",
        region: "South Edge Worlds"
      },
      {
        time: "2m",
        name: "Abstergo",
        system: "Planet Knossos",
        region: "Unknown"
      }
    ],
    timestamp: "2023-05-07T10:43:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h43",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h16",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1h03",
        name: "Voidfox",
        system: "Tohoku",
        region: "Kusari Space"
      },
      {
        time: "1h03",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "49m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "46m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "37m",
        name: "IMG|Meyers",
        system: "Picardy",
        region: "Gallia Space"
      },
      {
        time: "36m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "34m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "26m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "25m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "25m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "22m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "21m",
        name: "Rainbird.Express",
        system: "Baffin",
        region: "Tau Border Worlds"
      },
      {
        time: "18m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "14m",
        name: "B-22",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "13m",
        name: "GreenMagicTrader",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "4m",
        name: "Cassio.Peia",
        system: "Omicron Xi",
        region: "South Edge Worlds"
      },
      {
        time: "3m",
        name: "Abstergo",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1m",
        name: "Generous.Cargo.Hold",
        system: "Connecticut",
        region: "Uncharted Space"
      },
      {
        time: "1m",
        name: "JackLazarus",
        system: "Bering",
        region: "Independent Worlds"
      },
      {
        time: "1m",
        name: "Axel_McArt",
        system: "New Tokyo",
        region: "Kusari Space"
      }
    ],
    timestamp: "2023-05-07T10:44:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h44",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h17",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1h04",
        name: "Voidfox",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "1h04",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "50m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "47m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "38m",
        name: "IMG|Meyers",
        system: "Picardy",
        region: "Gallia Space"
      },
      {
        time: "37m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "35m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "27m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "26m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "26m",
        name: "INS-Thunderdome",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "23m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "22m",
        name: "Rainbird.Express",
        system: "Baffin",
        region: "Tau Border Worlds"
      },
      {
        time: "19m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "14m",
        name: "GreenMagicTrader",
        system: "California",
        region: "Liberty Space"
      },
      {
        time: "5m",
        name: "Cassio.Peia",
        system: "Omicron Xi",
        region: "South Edge Worlds"
      },
      {
        time: "4m",
        name: "Abstergo",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "2m",
        name: "JackLazarus",
        system: "Bering",
        region: "Independent Worlds"
      },
      {
        time: "2m",
        name: "Axel_McArt",
        system: "New Tokyo",
        region: "Kusari Space"
      },
      {
        time: "0m",
        name: "Treasure.Hunt",
        system: "New London",
        region: "Bretonia Space"
      }
    ],
    timestamp: "2023-05-07T10:45:01"
  },
  {
    error: null,
    players: [
      {
        time: "1h45",
        name: "LNS-Ysaac.Loneshine",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "1h18",
        name: "GINTJ",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "1h05",
        name: "Voidfox",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "1h05",
        name: "T_R_N",
        system: "Orleanais",
        region: "Gallia Space"
      },
      {
        time: "51m",
        name: "Flymart",
        system: "New London",
        region: "Bretonia Space"
      },
      {
        time: "48m",
        name: "Dr.No.VocalCords",
        system: "Omega-11",
        region: "Omega Border Worlds"
      },
      {
        time: "39m",
        name: "IMG|Meyers",
        system: "Picardy",
        region: "Gallia Space"
      },
      {
        time: "38m",
        name: "Zoner|Nuance",
        system: "Omicron Gamma",
        region: "South Edge Worlds"
      },
      {
        time: "36m",
        name: "Lucinda",
        system: "Coronado",
        region: "Independent Worlds"
      },
      {
        time: "28m",
        name: "AWES-Independence",
        system: "Hokkaido",
        region: "Kusari Space"
      },
      {
        time: "27m",
        name: "INS-Storm.Fortress",
        system: "Vespucci",
        region: "Independent Worlds"
      },
      {
        time: "24m",
        name: "Fire.Dream.Trader",
        system: "New York",
        region: "Liberty Space"
      },
      {
        time: "23m",
        name: "Rainbird.Express",
        system: "Baffin",
        region: "Tau Border Worlds"
      },
      {
        time: "20m",
        name: "Wedge_II",
        system: "Pennsylvania",
        region: "Liberty Space"
      },
      {
        time: "15m",
        name: "GreenMagicTrader",
        system: "California",
        region: "Liberty Space"
      },
      {
        time: "6m",
        name: "Cassio.Peia",
        system: "Omicron Xi",
        region: "South Edge Worlds"
      },
      {
        time: "5m",
        name: "Abstergo",
        system: "Planet Knossos",
        region: "Unknown"
      },
      {
        time: "3m",
        name: "JackLazarus",
        system: "Bering",
        region: "Independent Worlds"
      },
      {
        time: "3m",
        name: "Axel_McArt",
        system: "New Tokyo",
        region: "Kusari Space"
      },
      {
        time: "2m",
        name: "Treasure.Hunt",
        system: "New London",
        region: "Bretonia Space"
      }
    ],
    timestamp: "2023-05-07T10:46:01"
  }
];

// const elem = document.querySelector(".grid");
// const panzoom = Panzoom(elem, {
//   maxScale: 5,
//   minScale: 1,
//   panOnlyWhenZoomed: false,
//   canvas: true,
//   contain: "outside"
// });

// elem.parentElement.addEventListener("wheel", panzoom.zoomWithWheel);

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
  // minimal heatmap instance configuration
  window.heatmapInstance = h337.create({
    // only container is required, the rest will be defaults
    container: document.querySelector(".heatmap")
  });
}

function getSystemPlayercount() {
  var playerlist = players[window.i]["players"];
  var timestamp = players[window.i]["timestamp"]
  var systemCounts = {};

  playerlist.forEach(player => {
    const system = player["system"];
    if (!systemCounts[sysNameToNickname[system]]) {
      systemCounts[sysNameToNickname[system]] = 0;
    }
    systemCounts[sysNameToNickname[system]]++;
  });

  window.i++;
  if (window.i > 9) {window.i = 0}
  return [systemCounts, timestamp];
  }

function updateHeatmap() {
  const amogus = getSystemPlayercount()
  const playercount = amogus[0];
  const timestamp = amogus[1];
  var datapoints = [];
  Object.keys(playercount).forEach(system => {
    const count = playercount[system];

    var x = parseFloat(getPos(document.getElementById(system)).left) +7;
    var y = parseFloat(getPos(document.getElementById(system)).top) +7;

    var datapoint = {
      x: x,
      y: y,
      value: count
    };
    datapoints.push(datapoint)
  })

  var data = {
    max: 3,
    min: 0,
    data: datapoints,
  }

  heatmapInstance.setData(data)
  document.getElementById("timestamp").innerHTML = timestamp
}

window.i = 0

populateSystems();
drawConnections();
//initzializeHeatmap();

var heatmapInstance = h337.create({
  // only container is required, the rest will be defaults
  container: document.querySelector(".heatmap")
});

updateHeatmap();
setInterval(updateHeatmap, 1000);

