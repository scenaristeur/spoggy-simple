/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function AuthAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());

  this.trackSession();

}
// extend the eve.Agent prototype
AuthAgent.prototype = Object.create(eve.Agent.prototype);
AuthAgent.prototype.constructor = AuthAgent;
/**
* Send a greeting to an agent
* @param {String} to
*/
AuthAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};
/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use AuthAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
AuthAgent.prototype.receive = function(from, message) {
  console.log(message,"from",from)
  document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  if (message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
  }
};

AuthAgent.prototype.trackSession = function() {
  solid.auth.trackSession(session => {
    if (!session){
      console.log('The user is not logged in')
      this.send("historiqueAgent",'Aucun utilisateur connecté');
    }else{
      console.log(`The user is ${session.webId}`)
      this.send(historiqueAgent, "L'utilisateur connecté est "+session.webId);
    }
  })
};
