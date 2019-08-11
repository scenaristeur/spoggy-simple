import { log } from './story.js'
import { updateResult } from './ui.js'


function login(){
  fileClient.popupLogin().then( webId => {
    console.log( `Logged in as ${webId}.`)
    solidCheckSession()
  }, err => {
    console.log(err)
    alert("erreur : ",err)
  }
);
}

function logout(){
  fileClient.logout().then( out =>
    {
      console.log("OUT",out)
      console.log( `Bye now!` )
      solidCheckSession()
    }
  );
}

function solidCheckSession(){
  // todo move display of elements in ui.js !!
  var not_loggedElements = document.querySelectorAll(".not_logged")
  var loggedElements =  document.querySelectorAll(".logged")
  var sessionDiv =  document.getElementById("solid-session")

  fileClient.checkSession().then(
    session => {
      console.log("Logged in as "+session.webId)
      var logged = "Logged in as "+session.webId
      log(logged)
      //  console.log(loginElements)
      not_loggedElements.forEach(function(e){
        e.style.display = "none"
      })
      loggedElements.forEach(function(e){
        e.style.display = "block"
      })
      sessionDiv.innerHTML = session.webId
        },
    err => {
      //  console.log(err)
      console.log( "Aucune session Solid")
      not_loggedElements.forEach(function(e){
        e.style.display = "block"
      })
      loggedElements.forEach(function(e){
        e.style.display = "none"
      })
      sessionDiv.innerHTML = "Login to send data to a Solid POD"
      //  alert("")
      return false;
    }
  );
}

function solidCreateFile(url, ttlData){
  var result = {status: "init", file: url}
  console.log(result)
  updateResult(result)
  fileClient.createFile(url, ttlData.content, "text/turtle").then( fileCreated => {
    result.status = "created"
    result.file = fileCreated
    updateResult(result)
    console.log(`Created file ${fileCreated}.`);
    log (fileCreated, "Created file")
  },
  err => {
    //  result.status = "erreur"
    updateResult(result)
    console.log(err);
    //  alert("erreur ")
    log(err, "ERROR : file create")
  }
);
}

function solidAuth(){
  var loginDiv = document.getElementById("solid-login");
  loginDiv.classList.add("not_logged");
  var loginBtn = document.createElement("BUTTON")
  loginBtn.innerHTML = "LOGIN"
  loginBtn.title = "Connexion"
  loginBtn.onclick = function(){
    login();
    return false;
  };
  loginDiv.appendChild(loginBtn)

  var logoutDiv = document.getElementById("solid-logout");
  logoutDiv.classList.add("logged");
  var logoutBtn = document.createElement("BUTTON")
  logoutBtn.innerHTML = "LOGOUT"
  logoutBtn.title = "Deconnexion";
  logoutBtn.onclick = function(){
    logout();
    return false;
  };
  logoutDiv.appendChild(logoutBtn)

  solidCheckSession()
}





export { solidAuth, solidCheckSession, solidCreateFile }
