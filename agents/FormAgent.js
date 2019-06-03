/**
 * Custom agent prototype
 * @param {String} id
 * @constructor
 * @extend eve.Agent
 */
function FormAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);
  // this.extend('request');

  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
}
// extend the eve.Agent prototype
FormAgent.prototype = Object.create(eve.Agent.prototype);
FormAgent.prototype.constructor = FormAgent;
/**
 * Send a greeting to an agent
 * @param {String} to
 */
FormAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};
/**
 * Handle incoming greetings. This overloads the default receive,
 * so we can't use FormAgent.on(pattern, listener) anymore
 * @param {String} from     Id of the sender
 * @param {*} message       Received message, a JSON object (often a string)
 */
FormAgent.prototype.receive = function(from, message) {
  console.log(message,"from",from)
  document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  switch (message.type) {
  /*  case 'updateForm':
    this.updateForm(message)
    break;*/

    default:
    console.log('Desolé, type de message inconnu : ' + message.type + '.');
  }
};
