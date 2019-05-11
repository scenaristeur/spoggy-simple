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
rdfAgent.friends();
}

function profile(){
console.log("profile");
var currentWebId = document.getElementById("current-webId").innerHTML;
console.log(currentWebId)
rdfAgent.profile(currentWebId);
}

function updateSession(session){
//  console.log(session)
  document.getElementById("webId").innerHTML = session.webId || "";
  document.getElementById("current-webId").innerHTML = session.webId || "";
  if (session != undefined && session.webId != undefined){
    document.getElementById("logout-btn").style.display = "block";
    document.getElementById("login-btn").style.display = "none";
  }else{
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("login-btn").style.display = "block";
  }

}
