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
