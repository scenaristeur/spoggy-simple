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
      },
      color:{
        inherit:'both',
        highlight: '#000000',
        color: '#2B7CE9'
      }
    },
    nodes:{
      color: {
        highlight: {border: '#000000', background:'#FFFFFF'}
      }
    },
    manipulation: {
      addNode: function (data, callback) {
        // filling in the popup DOM elements
        document.getElementById('node-operation').innerHTML = "Add Node";
        data.label="";
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
        onlyDynamicEdges: false//,
      //  fit: true
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

  network.on("doubleClick", async function (params) {
     console.log('doubleClick ', params);
     var id = params.nodes[0];
     var existNode;
     try{
       existNode = network.body.data.nodes.get({
         filter: function(node){
           return (node.id == id );
         }
       });
       console.log(existNode);
       if (existNode.length != 0){
         console.log("existe", existNode[0])
         var params = existNode[0];
         params.source = existNode[0].id;
         importer(params,updateGraph)
         fitAndFocus(existNode[0].id)
         //app.nodeChanged(existNode[0]);
         //  app.agentVis.send('agentFileeditor', {type: "nodeChanged", node: existNode[0]});
         //  app.agentVis.send('agentFoldermenu', {type: "nodeChanged", node: existNode[0]});
         //  network.body.data.nodes.add(data);
         //  var thing = this.thing;
       }else{
         console.log("n'existe pas")
         //  delete data.x;
         //  delete data.y
         //  network.body.data.nodes.update(data);
       }
     }
     catch (err){
       console.log(err);
     }
   });

}

function editNode(data, cancelAction, callback) {
  // recup colorpickers
  var colpicbody = document.getElementById('bodycolorpicker').cloneNode(true);
  colpicbody.id="colpicbody";
  var colpicborder = document.getElementById('bordercolorpicker').cloneNode(true);
  colpicborder.id="colpicborder"
  document.getElementById('node-operation').appendChild(colpicbody)
  document.getElementById('node-operation').appendChild(colpicborder)

  document.getElementById('node-id').value = data.id || "";
  document.getElementById('node-label').value = data.label;
  document.getElementById('node-shape').value = data.shape || "ellipse";
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
  data.shape = document.getElementById('node-shape').value;
  data.color = {};
  data.color.background = document.getElementById('colpicbody').value;
  data.color.border =  document.getElementById('colpicborder').value;
  document.getElementById('bodycolorpicker').value = document.getElementById('colpicbody').value;
  document.getElementById('bordercolorpicker').value = document.getElementById('colpicborder').value;
  fitAndFocus(data.id)
  clearNodePopUp();
  callback(data);
}

function editEdgeWithoutDrag(data, callback) {
  // filling in the popup DOM elements
  document.getElementById('edge-label').value = data.label || "";
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
  data.color = {};
  data.color.inherit='both';
  clearEdgePopUp();
  callback(data);
}

function init() {
  setDefaultLocale();
  draw();
}

function fitAndFocus(node_id){
  var network = this.network;
  var oneStab = true;
  this.network.on("stabilized", function(params){
    //http://visjs.org/docs/network/index.html?keywords=fit
    //  console.log(params)
    if (oneStab){
      oneStab = false;
      autofit.checked? network.fit(): "";
      var options = {
        scale: 1,
        offset: {x:1, y:1},
        //  locked: true,
        animation: { // -------------------> can be a boolean too!
          duration: 1000,
          easingFunction: "easeInOutQuad"
        }
      };
      autofocus.checked? network.focus(node_id, options): "";

    }else{
      console.log("other stab")
    }
  });
}

function updateGraph(message){
  console.log(message);
  var app =this;
  if (message.params!= undefined && message.params.remplaceNetwork){
    this.network.body.data.nodes.clear();
    this.network.body.data.edges.clear();
  }
  //this.network.body.data.nodes.update(message.data.nodes)
  //this.network.body.data.edges.update(message.data.edges)
addResultsToGraph(this.network, message.data)
//  this.network.fit();
//  this.network.redraw();
  console.log(this.network)
}

function addResultsToGraph(network, results){
  var app = this;
  var nodes = results.nodes;
  var edges = results.edges;
  //DESACTIVATION STABIL POUR PLUS DE FLUIDITE
  var options = {
    physics:{
      stabilization: false
    },
    edges: {
      smooth: {
        type: "continuous",
        forceDirection: "none"
      }
    }
  }
  app.network.setOptions(options);

  nodes.forEach(function(n){
    app.addNodeIfNotExist(app.network, n);
  });
  app.network.body.data.edges.update(edges)
    //REACTIVATION STABIL POUR PLUS DE FLUIDITE
  options = {
  physics:{
  stabilization: true
}
}
app.network.setOptions(options);
}

function addNodeIfNotExist(network, data){
  var existNode = false;
  //console.log(data);
  var nodeId;
  try{
    existNode = network.body.data.nodes.get({
      filter: function(n){
        return (n.id == data.id || (n.label == data.label)); //  || n.title == data.label
      }
    });
    //console.log(existNode);
    if (existNode.length == 0){
      //  console.log("n'existe pas")
      nodeId =   network.body.data.nodes.add(data)[0];
    }else{
      //  console.log("existe")
      delete data.x;
      delete data.y
      nodeId =  network.body.data.nodes.update(data)[0];
    }
  }
  catch (err){
    console.log(err);
  }
}

function newGraph(){
  let network = this.network;

  var graphname = prompt("Comment nommer ce nouveau graphe ?", "Spoggy-Graph_"+Date.now());
  var nodeName = {
    label: graphname,
    shape: "star",
    color: "green",
    type: "node"
  };
  var nodeGraph = {
    label: "Graph",
    /*    shape: "star",
    color: "red",*/
    type: "node"
  };
  network.body.data.nodes.clear();
  network.body.data.edges.clear();
  var nodes = network.body.data.nodes.add([nodeName, nodeGraph]);

  var edge = {
    from: nodes[0],
    to: nodes[1],
    arrows: "to",
    label: "type"
  }
  network.body.data.edges.add(edge);
  fitAndFocus(nodes[0].id)
}
