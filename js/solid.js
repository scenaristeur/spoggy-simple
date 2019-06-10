var agora_POD = "https://agora.solid.community/profile/card#me"
var sessionCourante = {};
function login(){
  console.log("login");
  fileAgent.login();
}

function logout(){
  console.log("logout");
  fileAgent.logout();
}

function friends(){
  console.log("friends");
}

//
//;

function fetchRemote(url){
  console.log("fetchRemote");
  var url = document.getElementById("url-remote").value || "https://raw.githubusercontent.com/scenaristeur/heroku-spoggy/master/public/exemple_files/DavidProjets.ttl";
  rdfAgent.fetchRemote(url);
}

function parseLocal(){
  console.log("parseLocal");
  rdfAgent.parse()
}


function profile(){
  console.log("profile");
  var currentWebId = document.getElementById("current-webId").innerHTML;
  console.log(currentWebId)
  rdfAgent.profile(currentWebId);
}


function browsePublicFromWebId(webId){
  var pf = getPublicFromWebId(webId)
  fileAgent.readFolder(pf,callbackAfterRead)
}

function getPublicFromWebId(webId){
  var wedIdSpilt = webId.split("/");
  webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
  console.log(webIdRoot);
  publicFolder = webIdRoot+"public/";
  return publicFolder
}


function openPodBrowser(){
  document.getElementById('editeur-popUp').style.display = 'none'
  document.getElementById("pod-browser-popUp").style.display = "block";
}


function podBrowser(whichPOD){
console.log(whichPOD)
  switch (whichPOD) {
    case 'public':
    document.getElementById('PODurlInput').value = agora_POD;
    document.getElementById('importUrl').value = agora_POD;
    break;
    case 'connecte':
    document.getElementById('PODurlInput').value = sessionCourante.webId;
    document.getElementById('importUrl').value = sessionCourante.webId;
    // expected output: "Mangoes and papayas are $2.79 a pound."
    break;
    default:
    alert('Erreur, je ne comprends pas quel POD vous avez choisi',whichPOD);
  }
  var webId = document.getElementById('PODurlInput').value;
  browsePublicFromWebId(webId)
  document.getElementById('editeur-popUp').style.display = 'none'
  document.getElementById("pod-browser-popUp").style.display = "block";
  //  document.getElementById("select-pod-popUp").style.display = "none";
}


function changePod(whichPOD){
console.log(whichPOD)
  switch (whichPOD) {
    case 'public':
    document.getElementById('pod2browse').value = agora_POD;

    break;
    case 'connecte':
    document.getElementById('pod2browse').value = sessionCourante.webId;

    // expected output: "Mangoes and papayas are $2.79 a pound."
    break;
    default:
    alert('Erreur, je ne comprends pas quel POD vous avez choisi',whichPOD);
  }
  var webId = document.getElementById('pod2browse').value;
  console.log(webId)
  var public_POD = getPublicFromWebId(document.getElementById('pod2browse').value)
/*  newGraph();
  var fileList=document.getElementById("last-public");
  fileList.innerHTML = "";*/
  fileAgent.readFolder(public_POD,callbackUniversalBrowser)
//  browsePublicFromWebId(webId)
//  document.getElementById('editeur-popUp').style.display = 'none'
//  document.getElementById("pod-browser-popUp").style.display = "block";
  //  document.getElementById("select-pod-popUp").style.display = "none";
}


function callbackAfterRead(folder){
  console.log("callback after read")
  folder2vis(folder)
  updateCurrentFolder(folder)
  updateBrowser(folder)
}

function callbackAfterBrowse(contenu){
  console.log("callback after browse")
  console.log(contenu)
//  folder2vis(folder)
//  updateCurrentFolder(folder)
//  updateBrowser(folder)
}


function updateBrowser(folder){
  //  console.log("updateBrowser",folder)
  console.log("updateBrowser")
  var folderList=document.getElementById("folderslist");
  folderList.innerHTML = "";
  var fileList=document.getElementById("fileslist");
  fileList.innerHTML = "";

  newLI = document.createElement("li");
  newText = document.createTextNode("..(parent)");
  newLI.appendChild(newText);
  newLI.style.padding="15px";
  newLI.addEventListener('click', function () {
    //  console.log(folder.parent)
    fileAgent.readFolder(folder.parent,callbackAfterRead)
  })
  folderList.appendChild(newLI);



  folder.folders.forEach(function(fo){
    //  console.log("fo",fo)
    var name = fo.name;
    var url = fo.url;
    newLI = document.createElement("li");
    newText = document.createTextNode(name);
    newLI.appendChild(newText);
    newLI.style.padding="15px";
    newLI.addEventListener('click', function () {
      //console.log(url)
      fileAgent.readFolder(url,callbackAfterRead)
    })
    folderList.appendChild(newLI);
  })
  folder.files.forEach(function(fi){
    //  console.log("fi",fi)
    var name = fi.name;
    var url = fi.url;
    newLI = document.createElement("li");
    newText = document.createTextNode(name);
    newLI.appendChild(newText);
    newLI.style.padding="15px";
    newLI.addEventListener('click', function () {
      //  console.log(url)
      fileAgent.readFile(url,callbackAfterRead)
    })
    fileList.appendChild(newLI);
  })
}


function updateSession(session){
  //  console.log(session)
  sessionCourante = session;
  document.getElementById("webId").innerHTML = session.webId || "";
  document.getElementById("current-webId").innerHTML = session.webId || "";
  document.getElementById("PODurlInput").value = session.webId || agora_POD;
  if (session != undefined && session.webId != undefined){
    document.querySelectorAll("button.logout").forEach(function(o){o.style.display = "block";})
    document.querySelectorAll("button.login").forEach(function(i){i.style.display = "none";})
  }else{
    document.querySelectorAll("button.logout").forEach(function(o){o.style.display = "none";})
    document.querySelectorAll("button.login").forEach(function(i){i.style.display = "block";})
  }
}

function updateCurrentWebId(webId){
  document.getElementById("current-webId").innerHTML = webId;
}

function updateCurrentFolder(folder){
  console.log("update current folder")
  document.getElementById("current-folder-parent").innerHTML = folder.parent;
  document.getElementById("current-folder-url").innerHTML = folder.url;
}

function createFolder(){
  var url = document.getElementById("current-folder-url").innerHTML+document.getElementById("new-folder-input").value;
  fileAgent.createFolder(url);
}

function removeFolder(){

}

function renameFolder(){

}
function jsonSave(){
  updateEditorFromNetwork();
  saveEditorToPod("json")
}
function turtleSave(){
  exportTtl(network)
  saveEditorToPod("ttl")
}

function saveEditorToPod(ext){
  fileAgent.checkSession();
  var url = document.getElementById("current-folder-url").innerHTML;
  var name = document.getElementById("new-file-input").value || "test" || new Date.now();
  var content = editor.getValue();
  url+=name+"."+ext;
  console.log(url, content)
  fileAgent.createFile(url, content)
}



function last_public(){
  document.getElementById('import-popUp').style.display = "none"
  const dialog = new mdc.dialog.MDCDialog(document.getElementById('last_pub'));
  dialog.open()
  console.log("last_public", agora_POD)
  newGraph();
  var public_POD = getPublicFromWebId(document.getElementById('PODurlInput').value)
  var fileList=document.getElementById("last-public");
  fileList.innerHTML = "";
  fileAgent.readFolder(public_POD,callbackLastPublic)
}


function open_ub(){
  document.getElementById('import-popUp').style.display = "none"
  const dialog = new mdc.dialog.MDCDialog(document.getElementById('universal-browser'));
  dialog.open()
  var public_POD = getPublicFromWebId(document.getElementById('PODurlInput').value)
/*  newGraph();
  var fileList=document.getElementById("last-public");
  fileList.innerHTML = "";*/
  fileAgent.readFolder(public_POD,callbackUniversalBrowser)
}

/*function close_ub(){
  const dialog = new mdc.dialog.MDCDialog(document.getElementById('universal-browser'));
  dialog.close()
}*/



function callbackUniversalBrowser(folder){
  // material colo https://material.io/tools/color/#!/?view.left=0&view.right=1&primary.color=81D4FA
  console.log("update universal Browser",folder)
  var liste=document.getElementById("ub-liste");
  liste.innerHTML = "";
/*  var fileList=document.getElementById("fileslist");
  fileList.innerHTML = ""*/

  parentDiv = document.createElement("div");
  newText = document.createTextNode("..(parent)");
  parentDiv.appendChild(newText);
  parentDiv.style.padding="15px";
  parentDiv.addEventListener('click', function () {
    //  console.log(folder.parent)
    fileAgent.readFolder(folder.parent,callbackUniversalBrowser)
  })

// nouveaux


  var ubParent=document.getElementById("ub-parent");
  ubParent.innerHTML = "";
  ubParent.appendChild(parentDiv);

  var ubUrl=document.getElementById("ub-url");
  ubUrl.value = folder.url;
/*document.getElementById("arrow-upward").addEventListener('click', function () {
      console.log(folder.parent)
    fileAgent.readFolder(folder.parent,callbackUniversalBrowser)
  })*/



  folder.folders.forEach(function(fo){
    //  console.log("fo",fo)
    var name = fo.name;
    var url = fo.url;
    newLI = document.createElement("li");
    newText = document.createTextNode(name);
    newLI.appendChild(newText);
    newLI.style.padding="16px";
  //  newLI.style.color="#fff";
    newLI.style.background="#81d4fa";
    newLI.addEventListener('click', function () {
      //console.log(url)
    //  fileAgent.readFolder(url,callbackAfterRead)
    fileAgent.readFolder(url,callbackUniversalBrowser)
    })
    liste.appendChild(newLI);
  })
  folder.files.forEach(function(fi){
    //  console.log("fi",fi)
    var name = fi.name;
    var url = fi.url;
    newLI = document.createElement("li");
    newText = document.createTextNode(name);
    newLI.appendChild(newText);
    newLI.style.padding="16px";
    //newLI.style.color="#ddd";
    newLI.style.background="#b6ffff";
    newLI.addEventListener('click', function () {
      //  console.log(url)
      //  fileAgent.readFile(url,callbackAfterBrowse)
      var params = {}
      params.source = fi.url;
      //importer(params,after)
//close_ub();
      importer(params,updateGraph)
    })
    liste.appendChild(newLI);
  })
}


function after(d){
  console.log("after",d)
  //updateGraph
  var  data = {
    nodes: d.data.nodes,
    edges: d.data.edges
  };

  //console.log("DATA",data)
  updateGraph({data:data})
}


function recursiveExplore(folder,level){
  console.log("Explore ",level,folder.name)
  for (var i=0; i < folder.folders.length; i++){
    var f = folder.folders[i];
    console.log("f: ", f.name, f.url)
    fileAgent.readFolder(f.url,callbackLastPublic)
  }
}

function callbackLastPublic(folder){
  console.log("callback last_public")
  if(folder.folders){
    recursiveExplore(folder,10)
  }
  folder2vis(folder)
  updateCurrentFolder(folder)
  updateBrowser(folder)
  updateLastPublicList(folder)
}

function updateLastPublicList(folder){
  console.log("updateLastPublicList")
  var fileList=document.getElementById("last-public");
  folder.files.forEach(function(fi){
    //  console.log("fi",fi)
    var name = fi.name;
    var url = fi.url;
    newLI = document.createElement("li");
    newText = document.createTextNode(folder.url+name);
    newLI.appendChild(newText);
    newLI.style.padding="15px";
    newLI.addEventListener('click', function () {
      //  console.log(url)
      //  fileAgent.readFile(url,callbackAfterRead)
      var params = {};
      params.source = url
      importer(params,updateGraph)


    })
    fileList.appendChild(newLI);
  })
}
