//##############################################################################
function handleFileSelected(evt, callback){
  //Parcourir pour importer
  console.log(evt," https://www.html5rocks.com/en/tutorials/file/dndfiles/")
  var files = evt.files;
  var output = [];

  var params = {}
  params.files = files;
  params.remplaceNetwork = remplaceNetwork.checked;
  //params.partageImport = partageImport.checked;
  if (params.files != undefined){
    var data = {};
    for (var i = 0; i < params.files.length; i++) {
      var fichier = params.files[i];
      var extension = fichier.name.split('.').pop();
      var reader = new FileReader(); //https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file
      reader.addEventListener('load', function () {
        var result = reader.result;
        console.log(typeof result, result);
        switch (extension) {
          case 'json':
          var res = JSON.parse(result)
          var nodes = res.nodes;
          var edges = res.edges;
          data ={nodes: nodes, edges: edges}
          callback({data:data,params:params})
          break;
          case 'rdf':
          case 'ttl':
          case 'n3':
          case 'n3t':
          case 'owl':
          let base = 'https://www.wikidata.org/wiki/Special:EntityData/Q2005.ttl'
          let mimeType = 'text/turtle'
          let store = $rdf.graph()
          console.log(store)
          $rdf.parse(result, store,base, mimeType)
          console.log("STORE",store)
          data = app.statements2vis(store.statements);
          callback({data:data,params:params})
          console.log("OK")
          break;

          default:
          console.log('Sorry, je ne peux pas traiter ',fichier);
        }
      });
      reader.readAsText(fichier);
    }
  }
}

function importer(params,callback){
  var url = params.source;
  if(isFile(url)){
  var extension = url.split('.').pop();
  switch (extension) {
    case 'json':
    fetchJson(params,callback)
    break;
    case 'rdf':
    case 'ttl':
    console.log("fichier TTl ou RDF")
    fileAgent.fetchAndParse(params.source,"application/json");
    break;
    default:
    console.log('Sorry, je ne peux pas traiter ',params);
  }
}else{
  console.log("FOLDER ou WEBID")
  if (params.source.endsWith("card")){
    console.log("WEBID")
    fileAgent.fetchAndParse(params.source+"#me","application/json");
  }else{
    fileAgent.readFolder(params.source)
  }

}
}

function fetchJson(params, callback){
  let url = params.source;
  fetch(url)
  .then(res => res.json())
  .then((out) => {
    console.log('Checkout this JSON! ', out);
    callback({data:out,params:params})
  })
  .catch(err => { throw err });
}







//###############################################################################
//Sous cette ligne, review de code a faire



































function exportJson(network) {
  //var network = this.network;
  console.log(network)
  var filename = prompt("Sous quel nom sauvegarder ce graphe ?", "Spoggy");
  //  app.$.inputMessage.value = '';
  if (filename == null || filename == "") {
    txt = "User cancelled the prompt.";
    return;
  }
  var textToWrite = "";
  var fileNameToSaveAs = filename+"_spoggy_nodes_edges_" + Date.now() + ".json";
  var textFileAsBlob = "";

  console.log("export Json");
  console.log(network.body.data);
  var nodes_edges = { nodes: network.body.data.nodes.get(), edges: network.body.data.edges.get() };
  console.log(nodes_edges);
  var nodes_edgesJSON = JSON.stringify(nodes_edges);
  console.log(nodes_edgesJSON);
  textFileAsBlob = new Blob([nodes_edgesJSON], {
    type:
    'application/json'
  }
);
var downloadLink = document.createElement("a");
downloadLink.download = fileNameToSaveAs;
downloadLink.innerHTML = "Download File";
if(navigator.userAgent.indexOf("Chrome") != -1)
{
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  console.log("CHROME");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else
{
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  console.log("FF");
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.target="_blank";
  //downloadLink.onclick = destroyClickedElement;
  //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  //  console.log(app.$.popupTtl);
}
console.log(downloadLink);
/*downloadLink.click();*/
/* creation d'un event car download.click() ne fonctionne pas sous Firefox */
var event = document.createEvent("MouseEvents");
event.initMouseEvent(
  "click", true, false, window, 0, 0, 0, 0, 0
  , false, false, false, false, 0, null
);
downloadLink.dispatchEvent(event);
var app = this;
setTimeout(function(){
  //  console.log(downloadLink.parentNode);
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadLink);
}, 1000);
/*if (window.URL != null) {
// Chrome allows the link to be clicked
// without actually adding it to the DOM.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
} else {
// Firefox requires the link to be added to the DOM
// before it can be clicked.
downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
downloadLink.onclick = destroyClickedElement;
downloadLink.style.display = "none";
document.body.appendChild(downloadLink);
}
downloadLink.click();*/
}

function exportTtl(network) {
  /* source https://github.com/scenaristeur/dreamcatcherAutonome/blob/master/autonome/public/agents/ExportAgent.js */
  //  let network = this.network;
  var nodes = network.body.data.nodes.get();
  var edges = network.body.data.edges.get();
  console.log("exportation");
  console.log(nodes);
  console.log(edges);
  //creation des statements (triplets)
  /*var statements = [];
  for (var j = 0; j < edges.length; j++){
  var edge = edges[j];
  console.log(edge);
  statements.push({sujet: node.id, propriete: "rdfs:label", objet: node.label});
}
console.log(statements);*/

var output = "@prefix : <http://smag0.blogspot.fr/spoggy#> . \n";
output += "@prefix owl: <http://www.w3.org/2002/07/owl#> . \n";
output += "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> . \n";
output += "@prefix xml: <http://www.w3.org/XML/1998/namespace> . \n";
output += "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n";
output += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . \n";
output += "@prefix smag: <http://smag0.blogspot.fr/spoggy#> . \n";
output += "@base <http://smag0.blogspot.fr/spoggy> . \n";
output += "<http://smag0.blogspot.fr/spoggy> rdf:type owl:Ontology ;  \n";
output += "                    owl:versionIRI <http://smag0.blogspot.fr/spoggy/1.0.0> . \n";
output += " \n";
output += "owl:Class rdfs:subClassOf owl:Thing .  \n";

var listeInfos = new Array();
var listeComplementaire = new Array();

for (var i = 0; i < edges.length; i++) {
  var edge = edges[i];

  var sujet = edge.from;
  var propriete = edge.label.replace(/\s/g, "_");
  var objet = edge.to;


  //string.indexOf(substring) > -1
  //console.log(sujet);
  //console.log(propriete);
  //  console.log(objet);

  // AJOUTER EVENTUELLEMENT LA RECUPERATION DE SHAPE, COLOR, pour l'export RDF
  var sujetLabel = network.body.data.nodes.get(sujet).label;
  var objetLabel = network.body.data.nodes.get(objet).label;
  //console.log("#########################");
  //console.log(sujetLabel);
  //console.log(objetLabel)
  //console.log("#########################");

  var sujetWithPrefix = validRdf(network, sujet);
  var proprieteWithPrefix = validRdf(network, propriete);
  var objetWithPrefix = validRdf(network, objet);

  if (sujetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
  sujetWithPrefix = '_:' + sujetWithPrefix; // blanknode
}

if (proprieteWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
proprieteWithPrefix = ':' + proprieteWithPrefix; // propriete utilisant "@base <http://smag0.blogspot.fr/spoggy>"

}

if (objetWithPrefix.indexOf(':') == -1) { // ne contient pas de ':'
objetWithPrefix = '_:' + objetWithPrefix;  // blanknode
}


var typedeProp = ["owl:AnnotationProperty", "owl:ObjectProperty", "owl:DatatypeProperty"];
var indiceTypeDeProp = 1; // -1 pour ne pas ajouter la prop, sinon par defaut en annotationProperty, 1 pour Object, 2 pour Datatype --> revoir pour les datatypes

if (
  (proprieteWithPrefix == "type") ||
  (proprieteWithPrefix == ":type") ||
  (proprieteWithPrefix == "rdf:type") ||
  (proprieteWithPrefix == ":a") ||
  (proprieteWithPrefix == ":est_un") ||
  (proprieteWithPrefix == ":est_une") ||
  (proprieteWithPrefix == ":is_a")
) {
  proprieteWithPrefix = "rdf:type";
  listeComplementaire.push(objetWithPrefix + " rdf:type owl:Class . \n");
  indiceTypeDeProp = 1;
} else if ((proprieteWithPrefix == "subClassOf") || (proprieteWithPrefix == ":subClassOf") || (proprieteWithPrefix == "rdfs:subClassOf")) {
  proprieteWithPrefix = "rdfs:subClassOf";
}
else if ((proprieteWithPrefix == "sameAs") || (proprieteWithPrefix == ":sameAs")) {
  proprieteWithPrefix = "owl:sameAs";
  indiceTypeDeProp = -1;
}
else if (
  (proprieteWithPrefix.toLowerCase() == "ispartof") ||
  (proprieteWithPrefix.toLowerCase() == "partof") ||
  (proprieteWithPrefix.toLowerCase() == ":partof") ||
  (proprieteWithPrefix.toLowerCase() == ":ispartof")) {
    proprieteWithPrefix = "smag:partOf";
    indiceTypeDeProp = 1;
  } else if (
    (proprieteWithPrefix.toLowerCase() == "comment") ||
    (proprieteWithPrefix.toLowerCase() == "commentaire") ||
    (proprieteWithPrefix.toLowerCase() == "//") ||
    (proprieteWithPrefix.toLowerCase() == "#")
  ) {
    proprieteWithPrefix = "rdfs:comment";
    indiceTypeDeProp = -1;
  }
  if (indiceTypeDeProp >= 0) {
    listeComplementaire.push(proprieteWithPrefix + " rdf:type " + typedeProp[indiceTypeDeProp] + " . \n");
  }
  var data = sujetWithPrefix + " " + proprieteWithPrefix + " " + objetWithPrefix + " . \n";
  data += sujetWithPrefix + " " + "rdfs:label \"" + sujetLabel + "\" . \n";
  data += objetWithPrefix + " " + "rdfs:label \"" + objetLabel + "\" . \n";
  listeInfos[i] = data;
  console.log(data);
  console.log("||||||||||||||||||||||--");
}
//console.log(listeInfos);
//console.log(listeComplementaire);
//suppression des doublons
listeInfos = uniq_fast(listeInfos.sort());
listeComplementaire = uniq_fast(listeComplementaire.sort());
// console.log (listeInfos);
for (var k = 0; k < listeInfos.length; k++) {
  output = output + listeInfos[k];
  //  console.log(output);
}

for (var l = 0; l < listeComplementaire.length; l++) {
  output = output + listeComplementaire[l];
  //  console.log(output);
}

//this.$.dialogs.$.inputTextToSave.value = output; //     document.getElementById("inputTextToSave").value =output;
/*this.$.dialogs.$.popupTtl.fitInto = this.$.dialogs.$.menu;*/
//this.$.dialogs.$.popupTtl.toggle();
console.log(output)

//this.agentGraph.send('agentDialogs', {type:'exportTtl', ttlData : output});
}

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
    var item = a[i];
    if(seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

function validRdf(network, string){
  // A REVOIR
  console.log(network.body.data.nodes.get(string));
  console.log("nettoyage "+ string);
  // transformer le noeud en noeud rdf (resource ou literal)
  // ajouter la construction du noeud, son uri, prefix, localname, type...
  var valid = {};
  valid.type = "uri";
  if (string.indexOf(" ") !== -1){
    valid.type = "literal";
  }else{
    /*
    replaceAll(string, " ","_");
    replaceAll(string, "","_");
    replaceAll(string, ",","_");
    replaceAll(string, ";","_");
    replaceAll(string, " ","_");*/
  }

  return string;
}



/*function parseJSON(fichier,callback){
console.log("fich",fichier)
var reader = new FileReader(); //https://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/l-api-file
reader.addEventListener('load', function () {
var result = reader.result;
console.log(typeof result, result);
//  sketch.data2Xml(reader.result); //if srdf
//rdf2Xml(reader.result, network, remplaceNetwork);
//  network.dispatch('addTriplets', network.triplets);
var res = JSON.parse(result)
var nodes = res.nodes;
var edges = res.edges;
data ={nodes: nodes, edges: edges}
console.log(data)
//app.agentImport.send('agentGraph', {type: 'updateGraph', data: data, params: params});
callback({data:data,params:params})
console.log("JSON\n\n")
});

reader.readAsText(fichier);
}*/

function importer1(params,callback){
  var app = this;
  console.log("IMPORT")
  console.log(params)
  if (params.source != undefined){
    var url = params.source;
    var extension = url.split('.').pop();
    console.log(extension)

    // a revoir , tout passer en this.parseUrl ?
    if ((extension == "ttl") || (extension == "json") || (extension == "n3") || (extension == "n3t")) {
      this.parseUrl(url, params,callback);
    }
    else if ((extension == "rdf") || (extension == "owl")) {
      //  sketch.data2Xml(reader.result); //if srdf
      //rdf2Xml(reader.result, network, remplaceNetwork);
      //  network.dispatch('addTriplets', network.triplets);
      console.log("rdf\n\n")
    }
    else {
      //ttl2Xml(reader.result, network, remplaceNetwork);
      console.log("DEFAULT INCONNU\n\n")
      this.parseUrl(url, params,callback);
      //  data2Xml(reader.result, network);
    }
    console.log("fichier lu");
  }
}

function parseUrl(url, params,callback){
  console.log("PARSE\n\n")
  var data = {};
  console.log(url, params)
  console.log("PARSE URL Fileclient",fileClient)
  console.log("fetch & parse")
  fileClient.fetchAndParse(url).then( response => {
    console.log("RESPONSE",response)
    console.log("parsing")
    if(!response)
    {
      console.log(fileClient.err);
      alert("HOuston We've got a problem :",fileClient.err)
    }
    else {
      console.log( "Response is :",response)
      if (response.statements != undefined){
        console.log(response.statements)
        data = this.statements2vis(response.statements);

      }else if (response.nodes != undefined || response.edges != undefined){
        //  app.network.body.data.nodes.update(response.nodes)
        //  app.network.body.data.edges.update(response.edges)
        /*var data = JSON.parse(response.value);
        console.log(data)*/
        data ={nodes: response.nodes, edges: response.edges}
      }else{
        console.log("Houston We've got a problem : no statements & no node/edges")
      }
      console.log(data)
      //  this.agentImport.send('agentGraph', {type: 'decortiqueFile', fichier: data, remplaceNetwork: remplaceNetwork});
      //this.agentImport.send('agentGraph', {type: 'updateGraph', data: data, params: params});
      callback({data:data,params:params})
    }
  });
  console.log("fin fetch & parse")
  /*console.log("readfile")
  fileClient.readFile(url).then(  body => {
  console.log(`File content is : ${body}.`);
}, err => console.log(err) );
console.log("fin readfile")*/


console.log("readfolder")
fileClient.readFolder(url).then(folder => {
  console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
  //console.log(folder)
  console.log(" TODO : voir folder2vis de graph-behavior.html")
}, err => console.log(err) );
console.log(" fin readfolder")

console.log("parsé")

}

function statements2vis(statements){
  console.log("statements2vis")
  var app = this;
  var data = {nodes:[], edges:[]};
  //  var i = 0;
  statements.forEach(function (statement){
    console.log(statement)
    //  i++;
    //  app.agentImport.send('agentApp', {type: 'message', data: statements.length-i});
    //  console.log("STATEMENT2VIS", statement)
    var edges = [];
    var s = statement.subject;
    var p = statement.predicate;
    var o = statement.object;
    var w = statement.why;

    switch(p.value) {
      case "http://www.w3.org/2000/01/rdf-schema#label":
      case "http://xmlns.com/foaf/0.1/label":
      console.log("LABEL")
      console.log(s.value)
      console.log(o.value)
      var nodeAndLabel = {
        id: s.value,
        title: o.value,
        label: o.value,
        why: w.value,
        y:2*Math.random(),
        type: "node"
      };
      console.log(nodeAndLabel)
      //app.addNodeIfNotExist(app.network, nodeAndLabel)
      data.nodes.push(nodeAndLabel)
      break;
      default:
      console.log("NON LABEL ",p.value);
      var edges = [];
      var nodeSujetTemp;
      console.log("objet",o)
      if (s.termType != "BlankNode"){
        var ls = app.localname(s);
        console.log(ls)
        nodeSujetTemp = {
          id: s.value,
          title: s.value,
          label: ls,
          why: w.value,
          y:2*Math.random(),
          type: "node"
        };
        console.log(nodeSujetTemp)
        //app.addNodeIfNotExist(app.network, nodeSujetTemp)
        data.nodes.push(nodeSujetTemp)
      }/*else{
        nodeSujetTemp = {
        id: s.value,
        type: "node"
      };
    }*/


    console.log("objet",o)
    if (o.termType != "BlankNode"){
      var lo = app.localname(o);
      console.log(lo)
      var nodeObjetTemp = {
        id:  o.value,
        title: o.value,
        label: lo,
        why: w.value,
        type: "node"
      };
      console.log(nodeObjetTemp)
      //app.addNodeIfNotExist(app.network, nodeObjetTemp)
      data.edges.push(nodeObjetTemp)
    }

    /*  let pArray = p.split("#");
    //  console.log(conceptCut);
    let labelP = pArray[pArray.length-1];
    if (labelP == p){
    pArray = p.split("/");
    //console.log(conceptCut);
    labelP = pArray[pArray.length-1];
  }*/

  data.edges.push({from:s.value, to: o.value, arrows: 'to', label: app.localname(p), uri: p.value});
  //  app.addEdgeIfNotExist(app.network,{from:s.subject.value, to: s.object.value, arrows: 'to', label:s.predicate.value});

  //app.network.body.data.edges.update(edges)
}
});
console.log(data)
return data;
}

function localname(node){
  console.log("LOCALNAME OF ",node)
  var value = node.value;
  if (value.endsWith('/') || value.endsWith('#')){
    value = value.substring(0,value.length-1);
  }
  var labelU = value;

  if (node.termType == "NamedNode"){
    console.log("namenode")
    var uLabel = value.split("#");
    var labelU = uLabel[uLabel.length-1];
    if (labelU == uLabel){
      uLabel = value.split("/");
      labelU = uLabel[uLabel.length-1];
    }
  }else{
    console.log("literal or blanknode ???")
  }
  console.log(labelU)
  return labelU;
}

function recupParams(){
  var params = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {        var p=a[i].split('=', 2);
    if (p.length == 1)
    b[p[0]] = "";
    else
    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
  }
  return b;
})(window.location.search.substr(1).split('&'));
return params;
}
