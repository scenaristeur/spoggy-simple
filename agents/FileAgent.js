/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function FileAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);
  // extend the agent with support for requests
  //this.extend('request');
  //this.extend('request');
  //this.request = this.loadModule('request', this.request);
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());

  this.fileClient = SolidFileClient;
  console.log("FC",this.fileClient)
  this.checkSession();

}
// extend the eve.Agent prototype
FileAgent.prototype = Object.create(eve.Agent.prototype);
FileAgent.prototype.constructor = FileAgent;



FileAgent.prototype.checkSession = function() {
  this.fileClient.checkSession().then( session => {
    console.log("Logged in as "+session.webId);
    this.session = session;
    updateSession(session)
    this.send(historiqueAgent, "L'utilisateur connecté est "+session.webId);
  }, err =>
  {
    console.log(err)
    console.log("No user logged")
    this.send("historiqueAgent",'Aucun utilisateur connecté');
  }
);
}

FileAgent.prototype.login = async function() {

  //  if (window.location.hostname.length > 0 && window.location.hostname != "localhost" && window.location.hostname != "127.0.0.1"){
  this.fileClient.popupLogin().then( webId => {
    console.log( `Logged in as ${webId}.`)
    this.checkSession();
  }, err => {
    console.log(err);
    this.checkSession();
  }
);

/*  }else{
alert("connexion impossible en local, essayez la version en ligne https://scenaristeur.github.io/spoggy-simple/");
//You can find a popup in dist-popup/popup.html.
let session = await solid.auth.currentSession();
//let popupUri = 'https://solid.community/common/popup.html';
let popupUri = './dist/popup.html';
if (!session)
session = await solid.auth.popupLogin({ popupUri });
alert(`Logged in as ${session.webId}`);
}*/
}

FileAgent.prototype.logout = function() {
  this.fileClient.logout().then( () =>{
    //  localStorage.removeItem('solid-auth-client');
    updateSession({})
    console.log( `Bye now!` )
  }
);
}

FileAgent.prototype.checkSession = function() {
  this.fileClient.checkSession().then( session => {
    console.log("Logged in as "+session.webId)
    //  localStorage.setItem('solid-auth-client',JSON.stringify(session));
    updateSession(session)
  }, err => {
    console.log(err)
    updateSession({})
  }
);
}



FileAgent.prototype.createFile = function(url, content) {
  //var contentType = 'text/turtle'; // 'application/json'
  this.fileClient.createFile(url, content).then( fileCreated => {
    console.log(`Created file ${fileCreated}.`);
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.readFile = function(url, callback) {
  this.fileClient.readFile(url).then(  body => {
    console.log(`File content is : ${body}.`);
    callback? callback(body) : defaultCallBack(body)
  }, err => { console.log(err); alert(err);} );
}


FileAgent.prototype.updateFile = function(url, newContent, contentType) {
  this.fileClient.updateFile( url, newContent, contentType ).then( success => {
    console.log( `Updated ${url}.`)
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.deleteFile = function(url) {
  this.fileClient.deleteFile(url).then(success => {
    console.log(`Deleted ${url}.`);
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.copyFile = function(old,newFile) {
  this.fileClient.copyFile(old,newFile).then(success => {
    console.log(`Copied ${old} to ${newFile}.`);
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.download = function(localPath, url) {
  //only in console
  this.fileClient.downloadFile(localPath,url).then(success => {
    console.log(`Downloaded ${url} to ${localPath}.`);
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.updateFile = function(localPath,url) {
  //only in console
  this.fileClient.uploadFile(localPath,url).then(success => {
    console.log(`Uploaded ${localPath} to ${url}.`);
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.fetchAndParse = function(url,contentType) {
  this.fileClient.fetchAndParse(url, 'text/turtle').then(graph => {
    console.log(graph)
    var data = statements2vis(graph.statements)
    updateGraph({data:data})
    //let something = graph.any(someSubject, somePredicate);
  }, err => { console.log(err); alert(err);} );
}

// FOLDERS

FileAgent.prototype.createFolder = function(url) {
  this.fileClient.createFolder(url).then(success => {
    console.log(`Created folder ${url}.`);
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.deleteFolder = function(url) {
  this.fileClient.deleteFolder(url).then(success => {
    console.log(`Deleted ${url}.`);
  }, err => { console.log(err); alert(err);} );
}


FileAgent.prototype.readFolder = function(url,callback) {
  this.fileClient.readFolder(url).then(folder => {
    //  console.log(`Read ${folder.name}, it has ${folder.files.length} files & ${folder.folders.length} folders .`,folder);
    //return folder;
    callback? callback(folder) : defaultCallBack(folder)
  }, err => { console.log(err); alert(err);} );
}

FileAgent.prototype.copy = function(old,newFolder) {
  this.fileClient.copy(old,newFolder).then(success => {
    console.log(`Copied ${old} to ${newFolder}.`);
  }, err => { console.log(err); alert(err);} );
}


FileAgent.prototype.fetch = function(url, request) {
  this.fileClient.fetch( url, request ).then( results => {
    // do something with results
    console.log(results)
  }, err => { console.log(err); alert(err);} );;
}

/*function defaultCallBack(folder){
console.log("Default callback after read")
folder2vis(folder)
updateCurrentFolder(folder)
folder2browser(folder)
}*/

/* FileAgent.prototype.saveOldUserData = function(profile)  {
if (!localStorage.getItem('oldProfileData')) {
localStorage.setItem('oldProfileData', JSON.stringify(profile));
}
}*/

/*FileAgent.prototype.getOldUserData = function() {
return JSON.parse(localStorage.getItem('oldProfileData'));
}*/


/**
* Send a greeting to an agent
* @param {String} to
*/
FileAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};
/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use FileAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
FileAgent.prototype.receive =  function(from, message) {
  console.log("MESS from",from, message)
  //  document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  switch (message.type) {
    case 'form':
    this.loadForm(message, from);
  /*  var promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        //this.loadForm(message, from);
        resolve('foo');
      }, 300);
    });

    promise1.then(function(value) {
      console.log(value);
      // expected output: "foo"
      return value;
    });*/

       //}, 50);

    break;

    default:
    console.log('Desolé, type de message inconnu : ' + message.type + '.');


  }
};

FileAgent.prototype.loadForm = function(message, sender){
  var agent = this;
  console.log("message",message)
  var fields = [];
  this.fileClient.fetchAndParse(message.uri, 'text/turtle').then(
    graph => {
      console.log(graph)
      console.log(graph.statements)
      //recherche du module définit dans ce fichier
      root = graph.any(null, RDF('type'), OWL('Ontology'));
      console.log("root ", root)
      moduleSubject = graph.any(root, RDFS('isDefinedBy'));
      console.log("moduleSubject ", moduleSubject)
      let moduleFields = graph.match(moduleSubject,null,null);
      return moduleFields;
    },
    err => console.log(err)
  ).then(
    moduleFields =>{
      console.log(moduleFields)
      var ordre = []
      while (moduleFields.length >0){
        var f = moduleFields.pop();
        console.log(f)
        console.log(localname(f.subject),localname(f.predicate),localname(f.object))
        var field = {}
        console.log(field)
        field.statement = f;
        if (localname(f.predicate) == "has"){
          console.log("has")
          field.name = localname(f.object)
          field.type = "input"
        }else{
          var localPred = localname(f.predicate);
          var localObj = localname(f.object);
          console.log("else", localPred )

          if (localPred.startsWith('_')){
            var o = localPred.slice(1);
            ordre[localObj] = o;


          }else{
            console.log("todo",f)
            console.log("todo localObj",localPred)
            console.log("todo localObj",localObj)
            field.type = localPred || f.predicate.value
            field.name = localObj || f.object.value

          }


        }
        console.log(field)
        fields.push(field)
      }
      console.log("ordre",ordre)
      console.log(fields)
      fields.forEach(function(fi){
        if((fi.name != undefined) && (ordre[fi.name] != undefined)){
          console.log("update ordre de ",fi.name)
          console.log(ordre[fi.name])
          fi.ordre = ordre[fi.name];
        }

      })

      //console.log(sender, fields)
      message.callback (fields);
    }
    ,err => {console.log(err)}
  ).then(fields =>
    {console.log("termine");
    return fields
  })

}
