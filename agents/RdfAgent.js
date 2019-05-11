/**
 * Custom agent prototype
 * @param {String} id
 * @constructor
 * @extend eve.Agent
 */
function RdfAgent(id) {
  // execute super constructor
  eve.Agent.call(this, id);
  // connect to all transports configured by the system
  this.connect(eve.system.transports.getAll());
    console.log("RDF",$rdf)
    this.store = $rdf.graph();
    this.fetcher = new $rdf.Fetcher(this.store);
}
// extend the eve.Agent prototype
RdfAgent.prototype = Object.create(eve.Agent.prototype);
RdfAgent.prototype.constructor = RdfAgent;
/**
 * Send a greeting to an agent
 * @param {String} to
 */
RdfAgent.prototype.sayHello = function(to) {
  this.send(to, 'Hello ' + to + '!');
};
/**
 * Handle incoming greetings. This overloads the default receive,
 * so we can't use RdfAgent.on(pattern, listener) anymore
 * @param {String} from     Id of the sender
 * @param {*} message       Received message, a JSON object (often a string)
 */
RdfAgent.prototype.receive = function(from, message) {
  console.log(message,"from",from)
  document.write(from + ' said: ' + JSON.stringify(message) + '<br>');
  if (message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
  }
};


RdfAgent.prototype.friends = function() {
  this.fileClient.logout().then( () =>{
    localStorage.removeItem('solid-auth-client');
    updateSession({})
    console.log( `Bye now!` )
  }
);
}

RdfAgent.prototype.profile = function(webId) {

  const me = this.store.sym(webId);
  const profile = me.doc() //    i.e. store.sym(''https://example.com/alice/card#me');
  const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
  this.fetcher.load(profile).then(response => {
    console.log(response)
    console.log(this.store)
   let name = this.store.any(me, VCARD('fn'));
  console.log("Loaded ",name);
}, err => {
   console.log("Load failed ",  err);
});
}
