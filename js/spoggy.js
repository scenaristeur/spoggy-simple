var commandHistory = [];


function validInput(){
  var inputValue = document.getElementById('input').value.trim();
  if (inputValue.length > 0){
    var inputObject = getInputType(inputValue)
    //  console.log("inputObject",inputObject);
    traiteInput(inputObject);
    updateInput(inputObject.inputNew);
  }
}



function traiteInput(io){
  console.log(io)
  switch(io.type) {
    case "commande":
    //this.catchCommande(message, this.network, this);
    // code block
    break;
    case "triplet":
    // code block
    break;
    case "url":
    // code block
    var params = io;
    params.source = io.value;

    importer(params,updateGraph)
    break;
    default:
    // code block
  }
}

function getInputType(iv){
  var inputObject = {};

  // si commence par http --> type = url
  if (isValidUrl(iv)){
    inputObject.type = "url";
    inputObject.value = iv;
    inputObject.isFile = isFile(iv)
  }else{
    // selon le premier charactère, on detecte une commande
    let firstChar = iv.charAt(0);
    switch(firstChar){
      case '/':
      //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(message))
      //  this.catchCommande(message,this.network,this);

      inputObject.type = "commande";
      inputObject.value = iv;
      inputObject.inputNew = "";
      catchCommande(inputObject)
      break;

      case '.':
      var last = commandHistory[commandHistory.length-1];
      inputObject.inputNew = last.s+" "+last.p+" "+last.o;
      break;

      case ';':
      var last = commandHistory[commandHistory.length-1];
      inputObject.inputNew = last.s+" "+last.p+" ";
      break;

      case ',':
      var last = commandHistory[commandHistory.length-1];
      inputObject.inputNew = last.s+" ";
      break;

      default:
      // si le premier charactère n'indique pas une commande, on traite comme un triplet
      inputObject = traiteTriplet(iv);
      catchTriplet(inputObject)
    }
  }

  //si termine par virgule, point, point-virgule, tiret --> triplet

  return inputObject;
}


function traiteTriplet(message){
  var result = {}
  var inputNew = "";
  let lastChar = message.slice(-1);
  let messageCut = message.slice(0,-1).split(" ");
  let isTriplet = true;
  //  console.log(messageCut);

  let detectLiteral = "";
  let messageCutTemp = [];
  messageCut.forEach(function(part){
    part = part.trim();
    //  console.log(part);
    if (part.startsWith('"')){
      detectLiteral ="debut";
      //  console.log(detectLiteral);
      messageCutTemp.push(part.substr(1));
    }else if (part.endsWith('"')){
      detectLiteral = "fin";
      //console.log(detectLiteral);
      messageCutTemp.push(messageCutTemp.pop()+" "+part.slice(0,-1));
    }else if (detectLiteral == "debut"){
      //  console.log("recupere le dernier et lui ajoute part" )
      messageCutTemp.push(messageCutTemp.pop()+" "+part)
    }else {
      messageCutTemp.push(part);
    }
  });
  if (messageCutTemp.length > 0){
    messageCut = messageCutTemp;
  }
  switch(lastChar){
    case '.':
    inputNew = "";
    break;
    case ';':
    if (messageCut[0].indexOf(" ") > -1){
      inputNew = '"'+messageCut[0]+'"'+' ';
    }else{
      inputNew = messageCut[0]+' ';
    }
    break;
    case ',':
    if (messageCut[0].indexOf(" ") > -1){
      inputNew = '"'+messageCut[0]+'" ';
    }else{
      inputNew = messageCut[0]+' ';
    }
    if (messageCut[1].indexOf(" ") > -1){
      inputNew += '"'+messageCut[1]+'" ';
    }else{
      inputNew += messageCut[1]+' ';
    }
    break;
    case '-':
    if (messageCut[2].indexOf(" ") > -1){
      inputNew = '"'+messageCut[2]+'"'+' ';
    }else{
      inputNew = messageCut[2]+' ';
    }
    break;
    default:
    console.log("message to chat "+message)
    //this.sendMessage(message);
    //  this.agentInput.send('agentSocket', {type: "sendMessage", message:message});
    //  this.catchTriplet(message.slice(0,-1), this.network); // A REMPLACER PAR CATCHTRIPLETS V2
    inputNew = "";
    isTriplet = false;
  }
  if (isTriplet){
    //  console.log("est Triplet",messageCut)
    result.type = "triplet";
    var tripletvalue = {};
    tripletvalue.subject = messageCut[0];
    tripletvalue.predicate = messageCut[1];
    tripletvalue.object = messageCut[2];
    result.value = tripletvalue;
    result.inputNew = inputNew;
  }else {
    //  console.log("n'est pas triplet")
    result.type = "message";
    result.value = message;
    result.inputNew = inputNew;
  }

  return result;
}

function catchTriplet(triplet){
  //  console.log(triplet)
  var subject = triplet.value.subject;
  var predicate = triplet.value.predicate;
  var object = triplet.value.object;
  // console.log(message.length);
  //message=message.trim();
  //var tripletString = message.substring(2).trim().split(" ");
  // les noeuds existent-ils ?
  var sujetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == subject );
    }
  });
  var objetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == object);
    }
  });
  //  console.log(sujetNode);
  //  console.log(objetNode);
  // sinon, on les créé
  if (sujetNode.length == 0){
    var sub_n = {label: subject, color:{
      border : document.getElementById("bordercolorpicker").value ,
      background : document.getElementById("bodycolorpicker").value }
    };
    this.network.body.data.nodes.add(sub_n);
  }
  if (objetNode.length == 0){
    var obj_n = {label: object, color:{
      border : document.getElementById("bordercolorpicker").value ,
      background : document.getElementById("bodycolorpicker").value }
    };
    this.network.body.data.nodes.add(obj_n);
  }
  // maintenant ils doivent exister, pas très po=ropre comme méthode , à revoir
  sujetNode = this.network.body.data.nodes.get({
    filter: function(node){
      return (node.label == subject );
    }
  });
  objetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //  console.log(node);
      return (node.label == object);
    }
  });
  this.network.body.data.edges.add({
    label: predicate,
    from : sujetNode[0].id,
    to : objetNode[0].id,
    color: {inherit:'both'}

  });
  //on récupère ce edge pour l'envoyer au serveur
  var edge = this.network.body.data.edges.get({
    filter: function(edge) {
      return (edge.from == sujetNode[0].id && edge.to == objetNode[0].id && edge.label == predicate);
    }
  });
  //  console.log("OK",autofit,autofocus)
  //this.network.fit();
  fitAndFocus(sujetNode[0].id);

}

function catchCommande(commande){
  console.log(commande)
  switch(commande.value) {
    case "/h":
    case "/help":
    case "/aide":
    //console.log(this.$.dialogs)
    console.log("help")
    //  this.$.dialogs.$.helpPopUp.toggle();
    //  this.agentInput.send('agentDialogs', {type:'toggle', popup: 'helpPopUp'})
    break;
    case "/e":
    case "/export":
    case "/exportJson":
    console.log("exportjson")
    exportJson(this.network)
    //this.exportJson();
    //  this.agentInput.send('agentGraph', {type: 'exportJson'})
    //this.agentInput.send("agentVis", {type: 'exportJson'});
    break;
    case "/t":
    console.log("exportTtl")
    exportTtl(this.network)
    //  this.exportTtl(this.network,this);
    //  this.agentInput.send('agentGraph', {type:'exportTtl'}); // , what: 'network', to: 'agentDialogs', where: 'inputTextToSave'
    //    this.agentInput.send('agentDialogs', {type:'toggle', popup: 'popupTtl'})
    //  this.agentInput.send("agentVis", {type: 'exportTtl'});
    break;
    case "/i":
    case "/import":
    case "/importJson":
    console.log("import");
    document.getElementById('import-popUp').style.display = 'block';
    break;
    case "/n":
    console.log("new graph");

    newGraph();
    level < 6? increaseLevel() : "";
    break;
    case "/b":
    console.log("clean graph");
    cleanGraph();
    level < 6? increaseLevel() : "";
    //  this.connectBase(this.network,this);
    break;
    case "/l":
    console.log("connection a la base levelgraph");
    break;
    case "/s":
    console.log("capture_graphe");
    break;
    case "/s":
    console.log("capture_page");
    break;
    default:
    console.log("non traite"+ commande);
    //  return afficheCommandes();
  }
}


function   updateInput(inputNew){
  document.getElementById('input').value = inputNew || "";
}


function isFile(pathname) {
  return pathname.split('/').pop().indexOf('.') > -1;
}

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function inputChanged(ele) {
  if(event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("valider").click();
  }
}

function resetColors(){
  document.getElementById("bodycolorpicker").value = "#D2E5FF";
  document.getElementById("bordercolorpicker").value = "#2B7CE9";
}
function importFromUrl(){
  var params={source : document.getElementById('importUrl').value };
  console.log(params)
  importer(params,updateGraph);
}

function initSpoggy(){
  var params = recupParams();
  console.log(params)
  if (params.source!= undefined && params.source.length > 0){
    importer(params,updateGraph);
  }
  initLevel();

file1 = window.location.protocol+"//"+window.location.host+"/data/pizza.ttl";
file2 = window.location.protocol+"//"+window.location.host+"/data/DavidProjets.ttl";
file3 = "http://dig.csail.mit.edu/2008/webdav/timbl/foaf.rdf";
document.getElementById("url-remote").value = file3;
}




function updateCurrent(folder){
  console.log(folder)
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


function cleanGraph(){
  network.body.data.nodes.clear();
  network.body.data.edges.clear();
}


function updateEditorFromNetwork(event, properties, senderId){
  //  console.log(event, properties, senderId)
  var data = { nodes: network.body.data.nodes.get(), edges: network.body.data.edges.get() };
  var text = JSON.stringify(data, null, 2)
  editor.session.setValue(text)
}
function updateEditorFromNetworkTtl(text){
  //  console.log(event, properties, senderId)
  //var text = JSON.stringify(network.body.data, null, 2)
  editor.session.setValue(text)
}
