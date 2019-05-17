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

function public(){
  // a fusionner avec browsePOD ??
  var currentWebId = document.getElementById("current-webId").innerHTML;
  var wedIdSpilt = currentWebId.split("/");
  webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
  console.log(webIdRoot);
  publicFolder = webIdRoot+"public/";
  newFolder = fileAgent.readFolder(publicFolder)
  folder2vis(newFolder)
  updateCurrentFolder(newFolder)
}
function browsePOD(){
  // A fusionner avec public ?
  var currentWebId = document.getElementById("PODurlInput").innerHTML;
  var wedIdSpilt = currentWebId.split("/");
  webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
  console.log(webIdRoot);
  publicFolder = webIdRoot+"public/";
  newFolder = fileAgent.readFolder(publicFolder)
  folder2vis(newFolder)
  updateCurrentFolder(newFolder)
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
  console.log(folder)
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

function reset_Public_POD(){
  document.getElementById('PODurlInput').value = agora_POD;
}

function restoreCurrentSession(){
  document.getElementById('PODurlInput').value = sessionCourante.webId;
}

function podBrowser(){
  document.getElementById("pod-browser-popUp").style.display = "block";
  document.getElementById("select-pod-popUp").style.display = "none";
}
