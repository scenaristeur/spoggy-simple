/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
function HistoriqueAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}
// extend the eve.Agent prototype
HistoriqueAgent.prototype = Object.create(eve.Agent.prototype);
HistoriqueAgent.prototype.constructor = HistoriqueAgent;
/**
* Send a greeting to an agent
* @param {String} to
*/
HistoriqueAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};
/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use HistoriqueAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/
HistoriqueAgent.prototype.receive = function(from, message) {
  //var now = new Date().toLocaleTimeString('fr-FR');
  const d = new Date();
  now = d.toLocaleTimeString('fr-FR') + `.${d.getMilliseconds()}`
/*  console.log(message,"from",from)
  var node = document.createElement("LI");                 // Create a <li> node
  var textnode = document.createTextNode(now+": "+message+" from "+from);         // Create a text node
  node.appendChild(textnode);                              // Append the text to <li>
  document.getElementById("historique").prepend(node);
*/
document.getElementById("story").value = now+": "+message+" from "+from+"\n"+document.getElementById("story").value;


  /*  document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  if (message.indexOf('Hello') === 0) {
  // reply to the greeting
  this.send(from, 'Hi ' + from + ', nice to meet you!');
}*/
};
