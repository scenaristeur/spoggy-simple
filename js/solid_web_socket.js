/*implement Solid Websocket API https://github.com/solid/solid-spec/blob/master/api-websockets.md*/

function testWebSocket(){
var socket = new WebSocket('wss://spoggy.solid.community/');
  console.log ("socket",socket)
  socket.onopen = function() {
    const d = new Date();
    now = d.toLocaleTimeString('fr-FR') + `.${d.getMilliseconds()}`
    this.send('sub https://spoggy.solid.community/public/test/fichier.ttl');
    this.send('sub https://spoggy.solid.community/public/test/fichier2.ttl');
  /*  this.send('sub https://spoggy.solid.community/public/test');
    this.send('sub https://spoggy.solid.community/public/test/index.ttl');*/
    document.getElementById("notification").value = now+"[souscription] fichier.ttl\n"+document.getElementById("notification").value;
    document.getElementById("notification").value = now+"[souscription] fichier2.ttl\n"+document.getElementById("notification").value;

console.log("OPENED SOCKET",socket)
  };
  socket.onmessage = function(msg) {
    if (msg.data && msg.data.slice(0, 3) === 'pub') {
      // resource updated, refetch resource
      const d = new Date();
      now = d.toLocaleTimeString('fr-FR') + `.${d.getMilliseconds()}`
      console.log("msg",msg);
      console.log("data",msg.data)
      document.getElementById("notification").value = now+"[notification] "+msg.data+"\n"+document.getElementById("notification").value;

    }
  };

}
