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
          var data = JSON.parse(result)
          /*  var nodes = res.nodes;
          var edges = res.edges;
          data ={nodes: nodes, edges: edges}*/
          callback({data:data,params:params})
          //editor.insert("testJK")
          var text = JSON.stringify(data, null, 2)
          editor.session.setValue(text)
          //  editor.insert(JSON.stringify(data, null, 2))
          break;
          case 'rdf':
          case 'ttl':
          case 'n3':
          case 'n3t':
          case 'owl':
          /*  let base = 'https://www.wikidata.org/wiki/Special:EntityData/Q2005.ttl'
          let mimeType = 'text/turtle'*/
          let doc = $rdf.sym("http://smag0.blogspot.fr/spoggy");
          let store = $rdf.graph()
          console.log(store)
          try {
            $rdf.parse(result, store, doc.uri, 'text/turtle');
          }
          catch(error) {
            alert(error);
          }

          /*  $rdf.parse(result, store,base, mimeType)
          console.log("STORE",store)*/
          data = statements2vis(store.statements);
          callback({data:data,params:params})
          console.log("OK")
          break;
          default:
          alert('Sorry, je ne peux pas traiter ',fichier);
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
      case 'html':
      case 'jpg':
      case 'png':
      //  console.log('ouverture ',params.source);
      var win = window.open(params.source, '_blank');
      win.focus();
      break;
      default:
      console.log('Sorry, je ne peux pas traiter ',params);
      console.log('tentative ouverture ',params.source);
      var win = window.open(params.source, '_blank');
      win.focus();
    }
  }else{
    console.log("FOLDER ou WEBID")
    if (params.source.endsWith("card#me")){
      console.log("WEBID")
      rdfAgent.profile(params.source);
    }else{
      fileAgent.readFolder(params.source,callbackAfterRead)
    }

  }
}

function fetchJson(params, callback){
  let url = params.source;
  fetch(url)
  .then(res => res.json())
  .then((out) => {
    console.log('Checkout this JSON! ', out);
    var text = JSON.stringify(out, null, 2)
    editor.session.setValue(text)
    callback({data:out,params:params})
  })
  .catch(err => { throw err });
}



//###############################################################################
//Sous cette ligne, review de code a faire
//###############################################################################


function exportJson(network) {

  var nodes_edges = { nodes: network.body.data.nodes.get(), edges: network.body.data.edges.get() };
//  console.log(nodes_edges);
  var nodes_edgesJSON = JSON.stringify(nodes_edges);
  updateEditorFromNetwork(nodes_edgesJSON)

}

function exportTtl(network) {
  /* source https://github.com/scenaristeur/dreamcatcherAutonome/blob/master/autonome/public/agents/ExportAgent.js */
  //  let network = this.network;
  //  var nodes = network.body.data.nodes.get();
  //var edges = network.body.data.edges.get();
  // on ne prend pas le cluster cid=1 correspondant à la navigation pour l'export
  var nodes = network.body.data.nodes.get({
    filter: function (n) {
      return (n.cid != 1);
    }
  });
  var edges = network.body.data.edges.get({
    filter: function (e) {
      return (e.cid != 1);
    }
  });
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
//output += "<http://smag0.blogspot.fr/spoggy> rdf:type owl:Ontology ;  \n";
//output += "                    owl:versionIRI <http://smag0.blogspot.fr/spoggy/1.0.0> . \n";
output += " \n";
//output += "owl:Class rdfs:subClassOf owl:Thing .  \n";

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
  console.log(objet);

  // AJOUTER EVENTUELLEMENT LA RECUPERATION DE SHAPE, COLOR, pour l'export RDF
  var sujetLabel = network.body.data.nodes.get(sujet).label.replace(/\n/g, "");
  try{
    var objetLabel = network.body.data.nodes.get(objet).label.replace(/\n/g, "");
  }catch(error)
  {
    console.error("ERREUR NONTRAITEE")
    console.error(error)

  }

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
//console.log(output)
updateEditorFromNetworkTtl(output)
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
    //console.log(statement)
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
      var nodeAndLabel = {
        id: s.value,
        title: o.value,
        label: o.value,
        why: w.value,
        y:2*Math.random(),
        type: "node"
      };
      console.log("push",s.value,"label",o.value)
      //app.addNodeIfNotExist(app.network, nodeAndLabel)
      data.nodes.push(nodeAndLabel)
      break;
      default:
      //console.log("NON LABEL ",p.value);
      console.log("###\n",s.value,"\n",p.value,"\n",o.value)
      var edges = [];
      var nodeSujetTemp = detailNoeud(s,w);
      var nodeObjetTemp = detailNoeud(o,w);
      data.nodes.push(nodeSujetTemp)
      data.nodes.push(nodeObjetTemp)




      data.edges.push({from:s.value, to: o.value, arrows: 'to', label: app.localname(p), uri: p.value});
      //  app.addEdgeIfNotExist(app.network,{from:s.subject.value, to: s.object.value, arrows: 'to', label:s.predicate.value});

      //app.network.body.data.edges.update(edges)
    }
  });
  console.log(data)

  return data;
}


function detailNoeud(n,w){
  var node = {}
  console.log(n)
  switch (n.termType) {

    case 'BlankNode':
    var l = localname(n);
    node = {
      id: n.value,
      why: w.value,
      //  y:2*Math.random(),
      type: "node"
    };
    if (n.value != l){
      node.title= l;
      node.label = l;
    }
    break;
    case 'Collection':
    n.elements.forEach(function(elem){
      console.log("elem",elem)
      detailNoeud(elem,w)
    })
    break;
    case 'Literal':
    var l = localname(n).length>37? localname(n).substring(0,40)+"..." : localname(n);
    node = {
      id: n.value,
      title: n.value,
      label: l,
      why: w.value,
      //  y:2*Math.random(),
      type: "node",
      shape: "box",
      color: "rgb(240,220,110)"
    };
    break;
    case 'NamedNode':
    var l = localname(n);
    node = {
      id: n.value,
      title: n.value,
      label: l,
      why: w.value,
      //  y:2*Math.random(),
      type: "node"
    };
    if(l == "me"){
      node.label =  node.title;
      node.shape = "image";
      node.image = "./assets/profile.svg";
      node.type = "webId";
    }
    break;
    default:
    console.log('Sorry, je ne traite pas encore ' + n.termType + '.');
    node = {
      id: n.value,
      title: n.value,
      label: n.value,
      why: w.value,
      //  y:2*Math.random(),
      type: "node"
    };

  }
  console.log(node)
  //
  return node;
}


function localname(node){
  //  console.log("LOCALNAME OF ",node)
  if (node.value != undefined){
    var value = node.value;
    //  console.log(value)
    if (value.endsWith('/') || value.endsWith('#')){
      value = value.substring(0,value.length-1);
    }
    var labelU = value;
    if (node.termType == "NamedNode"){
      //  console.log("namenode")
      var uLabel = value.split("#");
      var labelU = uLabel[uLabel.length-1];
      if (labelU == uLabel){
        uLabel = value.split("/");
        labelU = uLabel[uLabel.length-1];
      }
    }else{
      console.log("TODO : literal or blanknode ???", node)
    }
    //  console.log(labelU)
    return labelU;
  }else{
    console.log("TODO node.value = undefined, il faut maintenant traiter le tableau",node.elements)
  }

}

function recupParams(){
  //console.log(window.location)
  var url = window.location.search+window.location.hash;  // pour catcher les /card#me
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
})(url.substr(1).split('&'));
return params;
}


function folder2vis(sfolder){
  var app = this;
  //  this.clear()
  console.log('sfolder')
  //  console.log(sfolder)
  var name = sfolder.name;
  var url = sfolder.url;
  var parent = sfolder.parent;
  //  var folders = sfolder.folders||"Folders";
  //  var files = sfolder.files|| "Files";
  var nodes = [];
  var edges = [];
  nodes.push({id: url, label: name, type: "folder", cid:1, shape: "image", image: "./assets/folder.png" });
  //nodes.push({id:'folders', label:"Folder"});
  //edges.push({from:url, to: 'folders', arrows: 'to', label:"type"});
  //console.log("PAREnT", parent)
  if (parent != undefined){
    //  console.log("undef")
    nodes.push({id: parent, label: parent, type: "folder", cid:1, shape: "image", image: "./assets/parentfolder.png" });
    edges.push({from: url, to: parent, cid:1, arrows:'to', label: "parent"});
  }
  //  {id: "urlNode"+url, label: url},
  /*,
  {id: "folderCluster", label: folders},
  {id: "fileCluster", label: files}*/
  // create an array with edges
  //{from: url, to: "urlNode"+url, arrows:'to', label: "url"},
  /*,
  {from: url, to: "folderCluster", arrows:'to', label: "folders"},
  {from: url, to: "fileCluster", arrows:'to', label: "files"},*/
  if (sfolder.folders && sfolder.folders.length >0){
    sfolder.folders.forEach(function(fo){
      if(fo.name != ".."){
        app.folder2vis(fo)
        var node = {id:fo.url, label:fo.name, type: 'folder',cid:1, shape: "image", image: "./assets/folder.png" }
        //  console.log(node)
        nodes.push(node);
        edges.push({from:url, to: fo.url, cid:1, arrows: 'to', label:"folder"});
        edges.push({from:fo.url, to: 'folders', cid:1, arrows: 'to', label:"type"});
      }
    })
  }
  if (sfolder.files && sfolder.files.length > 0){
    //  nodes.push({id:'files', label:"File"});
    sfolder.files.forEach(function(fi){
      //  console.log(fi)
      //  app.file2vis(fi)
      var node = {id:fi.url, label:fi.label, type: 'file' , cid:1, shape: "image", image: "./assets/document.png" };
      //  console.log(node)
      nodes.push(node);
      edges.push({from:url, to: fi.url, cid:1, arrows: 'to', label:"file"});
      //  edges.push({from:fi.url, to: 'files', arrows: 'to', label:"type"});
    })
  }
  var  data = {
    nodes: nodes,
    edges: edges
  };

  //console.log("DATA",data)
  updateGraph({data:data})
  //  console.log(data)
  /*this.network.body.data.nodes.clear();
  this.network.body.data.edges.clear();
  this.addSolidToGraph(data);
  this.network.fit();
  this.network.redraw();*/
}
