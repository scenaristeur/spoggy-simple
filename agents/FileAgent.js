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

  const fileClient = SolidFileClient;
  console.log("FC",fileClient)
}
// extend the eve.Agent prototype
FileAgent.prototype = Object.create(eve.Agent.prototype);
FileAgent.prototype.constructor = FileAgent;
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
