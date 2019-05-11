/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function FileAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());

  this.fileClient = SolidFileClient;
  console.log("FC",this.fileClient)
  this.checkSession();
  this.session;
}
// extend the eve.Agent prototype
FileAgent.prototype = Object.create(eve.Agent.prototype);
FileAgent.prototype.constructor = FileAgent;



FileAgent.prototype.checkSession = function() {
  this.fileClient.checkSession().then( session => {
    console.log("Logged in as "+session.webId);
    this.session = session;
    this.send(historiqueAgent, "L'utilisateur connecté est "+session.webId);
  }, err =>
  {
    console.log(err)
    console.log("No user logged")
    this.send("historiqueAgent",'Aucun utilisateur connecté');
    this.session = {webId:"blop"}
  }
);
}

FileAgent.prototype.login = async function() {
  if (window.location.hostname.length > 0 && window.location.hostname != "localhost" && window.location.hostname != "127.0.0.1"){
    this.fileClient.popupLogin().then( webId => {
      console.log( `Logged in as ${webId}.`)
    }, err => console.log(err) );

      }else{
        //You can find a popup in dist-popup/popup.html.
        let session = await solid.auth.currentSession();
        //let popupUri = 'https://solid.community/common/popup.html';
        let popupUri = './dist/popup.html';
        if (!session)
          session = await solid.auth.popupLogin({ popupUri });
        alert(`Logged in as ${session.webId}`);
      }
}

FileAgent.prototype.logout = function() {
  this.fileClient.logout().then( console.log( `Bye now!` ));
}

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
FileAgent.prototype.receive = function(from, message) {
  console.log(message,"from",from)
  document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  if (message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
  }
};
