var nodes = null;
var edges = null;
var network = null;


var centralGravityValueDefault = 0.0001,
springLengthValueDefault = 127,
springConstantValueDefault = 0.04, // 0.05
nodeDistanceValueDefault = 170, //120
dampingValueDefault = 0.08 // 0,08;



// randomly create some nodes and edges
var nodes = new vis.DataSet([
  {id: "Spoggy", label: 'Spoggy'},
  {id: "Solo", label: 'Solo'},
  {id: "Collaboratif", label: 'Collaboratif'},
  {id: "Explore", label: 'Explore'},
  {id: "Solid", label: 'Solid'},
  {id: "Holacratie", label: 'Holacratie'}
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: "Spoggy", to: "Solo", arrows:'to', label: "niveau 1"},
  {from: "Spoggy", to: "Collaboratif", arrows:'to', label: "niveau 2"},
  {from: "Spoggy", to: "Explore", arrows:'to', label: "niveau 3"},
  {from: "Spoggy", to: "Solid", arrows:'to', label: "niveau 4"},
  {from: "Spoggy", to: "Holacratie", arrows:'to', label: "niveau 5"},
  {from: "Solo", to: "Collaboratif", arrows:'to', label: "suivant"},
  {from: "Collaboratif", to: "Explore", arrows:'to', label: "suivant"},
  {from: "Explore", to: "Solid", arrows:'to', label: "suivant"},
  {from: "Solid", to: "Holacratie", arrows:'to', label: "suivant"},
]);


var data = {
  nodes: nodes,
  edges: edges
};
var seed = 2;

function setDefaultLocale() {
  var defaultLocal = navigator.language;
  var select = document.getElementById('locale');
  select.selectedIndex = 0; // set fallback value
  for (var i = 0, j = select.options.length; i < j; ++i) {
    if (select.options[i].getAttribute('value') === defaultLocal) {
      select.selectedIndex = i;
      break;
    }
  }
}

function destroy() {
  if (network !== null) {
    network.destroy();
    network = null;
  }
}

function draw() {
  destroy();
  nodes = [];
  edges = [];

  // create a network
  var container = document.getElementById('mynetwork');
  var options = {
    layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
    locale: document.getElementById('locale').value,
    interaction: {
      navigationButtons: true,
      keyboard: true,
      multiselect: true
    },
    edges:{
      arrows: {
        to:     {enabled: true, scaleFactor:1, type:'arrow'}
      }
    },
    manipulation: {
      addNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('node-operation').innerHTML = "Add Node";
        editNode(data, clearNodePopUp, callback);
      },
      editNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('node-operation').innerHTML = "Edit Node";
        editNode(data, cancelNodeEdit, callback);
      },
      addEdge: function (data, callback) {
        if (data.from == data.to) {
          var r = confirm("Do you want to connect the node to itself?");
          if (r != true) {
            callback(null);
            return;
          }
        }
        document.getElementById('edge-operation').innerHTML = "Add Edge";
        editEdgeWithoutDrag(data, callback);
      },
      editEdge: {
        editWithoutDrag: function(data, callback) {
          document.getElementById('edge-operation').innerHTML = "Edit Edge";
          editEdgeWithoutDrag(data,callback);
        }
      }
    }
    ,
    physics:{
      enabled: true,
      barnesHut: {
        gravitationalConstant: -1,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 1
      },
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0
      },
      repulsion: {
        centralGravity: centralGravityValueDefault,  //0.001, //0.001 ? A quoi sert cette valeur ?
        springLength: springLengthValueDefault,   // 220, //220 (//200 //300)
        springConstant: springConstantValueDefault, //0.01, //0.01
        nodeDistance:  nodeDistanceValueDefault, //150, //100 //350
        damping: dampingValueDefault, ///0.08
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09
      },
      maxVelocity: 500, //50
      minVelocity: 1, //0.1
      solver: 'repulsion',
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true
      },
      timestep: 0.5,
      adaptiveTimestep: true
    }
  };
  network = new vis.Network(container, data, options);

  network.on("selectNode", function (params) {
    console.log('selectNode Event:', params);
    if (params.nodes.length == 1) {
      let id = params.nodes[0];
      var node = network.body.data.nodes.get(id);
      console.log(node);
      document.getElementById("input").value = node.label+" ";
    }
  });
}

function editNode(data, cancelAction, callback) {
  document.getElementById('node-label').value = data.label;
  document.getElementById('node-saveButton').onclick = saveNodeData.bind(this, data, callback);
  document.getElementById('node-cancelButton').onclick = cancelAction.bind(this, callback);
  document.getElementById('node-popUp').style.display = 'block';
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
  document.getElementById('node-saveButton').onclick = null;
  document.getElementById('node-cancelButton').onclick = null;
  document.getElementById('node-popUp').style.display = 'none';
}

function cancelNodeEdit(callback) {
  clearNodePopUp();
  callback(null);
}

function saveNodeData(data, callback) {
  data.label = document.getElementById('node-label').value;
  clearNodePopUp();
  callback(data);
}

function editEdgeWithoutDrag(data, callback) {
  // filling in the popup DOM elements
  document.getElementById('edge-label').value = data.label;
  document.getElementById('edge-saveButton').onclick = saveEdgeData.bind(this, data, callback);
  document.getElementById('edge-cancelButton').onclick = cancelEdgeEdit.bind(this,callback);
  document.getElementById('edge-popUp').style.display = 'block';
}

function clearEdgePopUp() {
  document.getElementById('edge-saveButton').onclick = null;
  document.getElementById('edge-cancelButton').onclick = null;
  document.getElementById('edge-popUp').style.display = 'none';
}

function cancelEdgeEdit(callback) {
  clearEdgePopUp();
  callback(null);
}

function saveEdgeData(data, callback) {
  if (typeof data.to === 'object')
  data.to = data.to.id
  if (typeof data.from === 'object')
  data.from = data.from.id
  data.label = document.getElementById('edge-label').value;
  clearEdgePopUp();
  callback(data);
}

function init() {
  setDefaultLocale();
  draw();
}
