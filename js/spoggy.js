var commandHistory = [];


function validInput(){
  var inputValue = document.getElementById('input').value.trim();
  if (inputValue.length > 0){
    var inputObject = getInputType(inputValue)
    //  console.log("inputObject",inputObject);
    traiteInput(inputObject);
    updateInput(inputObject.inputNew);
  }
}



function traiteInput(io){
  console.log(io)
  switch(io.type) {
    case "commande":
    //this.catchCommande(message, this.network, this);
    // code block
    break;
    case "triplet":
    // code block
    break;
    case "url":
    // code block
    var params = io;
    params.source = io.value;

    importer(params,updateGraph)
    break;
    default:
    // code block
  }
}

function getInputType(iv){
  var inputObject = {};

  // si commence par http --> type = url
  if (isValidUrl(iv)){
    inputObject.type = "url";
    inputObject.value = iv;
    inputObject.isFile = isFile(iv)
  }else{
    // selon le premier charactère, on detecte une commande
    let firstChar = iv.charAt(0);
    switch(firstChar){
      case '/':
      //    let commande = rdf.quad(rdf.blankNode(), rdf.namedNode('commande'),rdf.literal(message))
      //  this.catchCommande(message,this.network,this);

      inputObject.type = "commande";
      inputObject.value = iv;
      inputObject.inputNew = "";
      catchCommande(inputObject)
      break;

      case '.':
      var last = commandHistory[commandHistory.length-1];
      inputObject.inputNew = last.s+" "+last.p+" "+last.o;
      break;

      case ';':
      var last = commandHistory[commandHistory.length-1];
      inputObject.inputNew = last.s+" "+last.p+" ";
      break;

      case ',':
      var last = commandHistory[commandHistory.length-1];
      inputObject.inputNew = last.s+" ";
      break;


      default:
      // si le premier charactère n'indique pas une commande, on traite comme un triplet
      inputObject = traiteTriplet(iv);
      catchTriplet(inputObject)
    }
  }

  //si termine par virgule, point, point-virgule, tiret --> triplet

  return inputObject;
}


function traiteTriplet(message){
  var result = {}
  var inputNew = "";
  let lastChar = message.slice(-1);
  let messageCut = message.slice(0,-1).split(" ");
  let isTriplet = true;
  //  console.log(messageCut);

  let detectLiteral = "";
  let messageCutTemp = [];
  messageCut.forEach(function(part){
    part = part.trim();
    //  console.log(part);
    if (part.startsWith('"')){
      detectLiteral ="debut";
      //  console.log(detectLiteral);
      messageCutTemp.push(part.substr(1));
    }else if (part.endsWith('"')){
      detectLiteral = "fin";
      //console.log(detectLiteral);
      messageCutTemp.push(messageCutTemp.pop()+" "+part.slice(0,-1));
    }else if (detectLiteral == "debut"){
      //  console.log("recupere le dernier et lui ajoute part" )
      messageCutTemp.push(messageCutTemp.pop()+" "+part)
    }else {
      messageCutTemp.push(part);
    }
  });
  if (messageCutTemp.length > 0){
    messageCut = messageCutTemp;
  }
  switch(lastChar){
    case '.':
    inputNew = "";
    break;
    case ';':
    if (messageCut[0].indexOf(" ") > -1){
      inputNew = '"'+messageCut[0]+'"'+' ';
    }else{
      inputNew = messageCut[0]+' ';
    }
    break;
    case ',':
    if (messageCut[0].indexOf(" ") > -1){
      inputNew = '"'+messageCut[0]+'" ';
    }else{
      inputNew = messageCut[0]+' ';
    }
    if (messageCut[1].indexOf(" ") > -1){
      inputNew += '"'+messageCut[1]+'" ';
    }else{
      inputNew += messageCut[1]+' ';
    }
    break;
    case '-':
    if (messageCut[2].indexOf(" ") > -1){
      inputNew = '"'+messageCut[2]+'"'+' ';
    }else{
      inputNew = messageCut[2]+' ';
    }
    break;
    default:
    console.log("message to chat "+message)
    //this.sendMessage(message);
    //  this.agentInput.send('agentSocket', {type: "sendMessage", message:message});
    //  this.catchTriplet(message.slice(0,-1), this.network); // A REMPLACER PAR CATCHTRIPLETS V2
    inputNew = "";
    isTriplet = false;
  }
  if (isTriplet){
    //  console.log("est Triplet",messageCut)
    result.type = "triplet";
    var tripletvalue = {};
    tripletvalue.subject = messageCut[0];
    tripletvalue.predicate = messageCut[1];
    tripletvalue.object = messageCut[2];
    result.value = tripletvalue;
    result.inputNew = inputNew;
  }else {
    //  console.log("n'est pas triplet")
    result.type = "message";
    result.value = message;
    result.inputNew = inputNew;
  }

  return result;
}

function catchTriplet(triplet){
  //  console.log(triplet)
  var subject = triplet.value.subject;
  var predicate = triplet.value.predicate;
  var object = triplet.value.object;
  // console.log(message.length);
  //message=message.trim();
  //var tripletString = message.substring(2).trim().split(" ");
  // les noeuds existent-ils ?
  var sujetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == subject );
    }
  });
  var objetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //    console.log(node);
      return (node.label == object);
    }
  });
  //  console.log(sujetNode);
  //  console.log(objetNode);
  // sinon, on les créé
  if (sujetNode.length == 0){
    var sub_n = {label: subject, color:{
      border : document.getElementById("bordercolorpicker").value ,
      background : document.getElementById("bodycolorpicker").value }
    };
    this.network.body.data.nodes.add(sub_n);
  }
  if (objetNode.length == 0){
    var obj_n = {label: object, color:{
      border : document.getElementById("bordercolorpicker").value ,
      background : document.getElementById("bodycolorpicker").value }
    };
    this.network.body.data.nodes.add(obj_n);
  }
  // maintenant ils doivent exister, pas très po=ropre comme méthode , à revoir
  sujetNode = this.network.body.data.nodes.get({
    filter: function(node){
      return (node.label == subject );
    }
  });
  objetNode = this.network.body.data.nodes.get({
    filter: function(node){
      //  console.log(node);
      return (node.label == object);
    }
  });
  this.network.body.data.edges.add({
    label: predicate,
    from : sujetNode[0].id,
    to : objetNode[0].id,
    color: {inherit:'both'}

  });
  //on récupère ce edge pour l'envoyer au serveur
  var edge = this.network.body.data.edges.get({
    filter: function(edge) {
      return (edge.from == sujetNode[0].id && edge.to == objetNode[0].id && edge.label == predicate);
    }
  });
  //  console.log("OK",autofit,autofocus)
  //this.network.fit();
  fitAndFocus(sujetNode[0].id);

}

function catchCommande(commande){
  console.log(commande)
  switch(commande.value) {
    case "/h":
    case "/help":
    case "/aide":
    //console.log(this.$.dialogs)
    console.log("help")
    //  this.$.dialogs.$.helpPopUp.toggle();
    //  this.agentInput.send('agentDialogs', {type:'toggle', popup: 'helpPopUp'})
    break;
    case "/e":
    case "/export":
    case "/exportJson":
    console.log("exportjson")
    exportJson(this.network)
    //this.exportJson();
    //  this.agentInput.send('agentGraph', {type: 'exportJson'})
    //this.agentInput.send("agentVis", {type: 'exportJson'});
    break;
    case "/t":
    console.log("exportTtl")
    exportTtl(this.network)
    //  this.exportTtl(this.network,this);
    //  this.agentInput.send('agentGraph', {type:'exportTtl'}); // , what: 'network', to: 'agentDialogs', where: 'inputTextToSave'
    //    this.agentInput.send('agentDialogs', {type:'toggle', popup: 'popupTtl'})
    //  this.agentInput.send("agentVis", {type: 'exportTtl'});
    break;
    case "/i":
    case "/import":
    case "/importJson":
    console.log("import");
    document.getElementById('import-popUp').style.display = 'block';
    break;
    case "/p":
    console.log("save_to_pod");
    document.getElementById('select-pod-popUp').style.display = 'block';
    break;
    case "/a":
    console.log("open editor");
    document.getElementById('editeur-popUp').style.display = 'block';
    /*  const editorDialog = new mdc.dialog.MDCDialog(document.getElementById('editor_dialog'));
    editorDialog.open();*/
    //  document.getElementById('select-pod-popUp').style.display = 'block';
    break;
    case "/r":
    console.log("reglages editor");
    const reglagesDialog = new mdc.dialog.MDCDialog(document.getElementById('reglages_dialog'));
    reglagesDialog.open();
    //  document.getElementById('select-pod-popUp').style.display = 'block';
    break;
    case "/n":
    console.log("new graph");
    newGraph();
    level < 6? increaseLevel() : "";
    break;
    case "/l":
    console.log("connection a la base levelgraph");
    break;
    case "/c":
    //  console.log("capture_graphe");
    downloadCanvas()
    break;
    default:
    console.log("non traite"+ commande);
    //  return afficheCommandes();
  }
}


function   updateInput(inputNew){
  document.getElementById('input').value = inputNew || "";
}


function isFile(pathname) {
  return pathname.split('/').pop().indexOf('.') > -1;
}

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function inputChanged(ele) {
  if(event.key === 'Enter') {
    event.preventDefault();
    //  document.getElementById("valider").click();
    validInput()
  }
}

function resetColors(){
  document.getElementById("bodycolorpicker").value = "#D2E5FF";
  document.getElementById("bordercolorpicker").value = "#2B7CE9";
}
function importFromUrl(){
  var params={source : document.getElementById('importUrl').value };
  console.log(params)
  importer(params,updateGraph);
}

function initSpoggy(){
  var params = recupParams();
  console.log(params)
  if (params.source!= undefined && params.source.length > 0){
    importer(params,updateGraph);
  }
  initLevel();

  file1 = window.location.protocol+"//"+window.location.host+"/data/pizza.ttl";
  file2 = window.location.protocol+"//"+window.location.host+"/data/DavidProjets.ttl";
  file3 = "http://dig.csail.mit.edu/2008/webdav/timbl/foaf.rdf";
  document.getElementById("url-remote").value = file2;
  initMaterialDesign();

}

function initMaterialDesign(){
  mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
  console.log("MDC",mdc)
  //MDCFormField.attachTo()
  const formField = new mdc.formField.MDCFormField(document.querySelector('.mdc-form-field'));
  const checkbox = new mdc.checkbox.MDCCheckbox(document.querySelector('.mdc-checkbox'));
  formField.input = checkbox;
  console.log("ff",formField)

  const textField = new mdc.textField.MDCTextField(document.getElementById("mdc-node-input"));
  const tripletTextField = new mdc.textField.MDCTextField(document.getElementById("triplet-input"));


  const dialog = new mdc.dialog.MDCDialog(document.getElementById('last_pub'));

  //const inputPopUp = new mdc.dialog.MDCDialog(document.getElementById('input-pupUp'));
  const tripletPopup = document.getElementById("triplet-popUp")

  document.querySelector('.mdc-checkbox').addEventListener("click", function(e){
    //console.log("event",e)
    console.log(checkbox.checked)
    checkbox.checked? dialog.open() : dialog.close() ;
  });

  drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
  console.log(drawer)
  const listEl = document.querySelector('.mdc-drawer .mdc-list');
  const mainContentEl = document.querySelector('.main-content');

  listEl.addEventListener('click', (event) => {
    console.log("click in listel")
    drawer.open =false;
    //  mainContentEl.querySelector('input, button').focus();
  });

  document.body.addEventListener('MDCDrawer:closed', () => {
    console.log("click drawer close")
    drawer.open =false;
    //  mainContentEl.querySelector('input, button').focus();
  });
  /*const list = new mdc.list.MDCList(document.querySelector('.mdc-dialog .mdc-list'));

  dialog.listen('MDCDialog:opened', () => {
  list.layout();
});*/

//https://material-ui.com/fr/api/fab/
//import {MDCRipple} from '@material/ripple';
// MATERIAL FAB
const fabRipple = new mdc.ripple.MDCRipple(document.getElementById('fabkeyb'));
document.getElementById('fabkeyb').addEventListener("click", function(e){
  console.log("click")
  tripletPopup.style.display == 'block'? tripletPopup.style.display = 'none' : tripletPopup.style.display = 'block' ;
  document.getElementById("input").focus();
});

}

function closeTripletPopup(){
  document.getElementById("triplet-popUp").style.display = 'none'
}
function toggleToolbar(elem){
  elem.classList.toggle("mdc-top-app-bar--short-collapsed");
}

function toggleDrawer(){
  //var drawerF = new mdc.drawer.MDCDismissibleDrawerFoundation(document.querySelector('.mdc-drawer'));
  //console.log("av",drawer.isOpen())
  drawer.open? drawer.open = false : drawer.open = true;
  //  console.log("ap",drawer.isOpen())
}




function updateCurrent(folder){
  console.log(folder)
}



function newGraph(){
  network.body.data.nodes.clear();
  network.body.data.edges.clear();
}


function updateEditorFromNetwork(event, properties, senderId){

  var data = {
    nodes: network.body.data.nodes.get({
      filter: function (n) {
        return (n.cid != 1);
      }
    }),
    edges: network.body.data.edges.get({
      filter: function (e) {
        return (e.cid != 1);
      }
    }) };
    var text = JSON.stringify(data, null, 2)
    editor.session.setValue(text)
    editor.format  = "json";
    document.getElementById('editeur-popUp').style.display = 'block';
  }
  function updateEditorFromNetworkTtl(text){
    //  console.log(event, properties, senderId)
    //var text = JSON.stringify(network.body.data, null, 2)
    editor.session.setValue(text)
    editor.format = "ttl"
  document.getElementById('editeur-popUp').style.display = 'block';
 }

  function downloadFile(){
    editor.session.setValue(text)
    editor.format  = "json";
    
    textFileAsBlob = new Blob([nodes_edgesJSON], {
      type:
      'application/json'
    }
  );
  var downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if(navigator.userAgent.indexOf("Chrome") != -1)
  {
    // Chrome allows the link to be clicked
    // without actually adding it to the DOM.
    console.log("CHROME");
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  } else
  {
    // Firefox requires the link to be added to the DOM
    // before it can be clicked.
    console.log("FF");
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.target="_blank";
    //downloadLink.onclick = destroyClickedElement;
    //downloadLink.onclick = window.URL.revokeObjectURL(downloadLink);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    //  console.log(app.$.popupTtl);
  }
  console.log(downloadLink);
  /*downloadLink.click();*/
  /* creation d'un event car download.click() ne fonctionne pas sous Firefox */
  var event = document.createEvent("MouseEvents");
  event.initMouseEvent(
    "click", true, false, window, 0, 0, 0, 0, 0
    , false, false, false, false, 0, null
  );
  downloadLink.dispatchEvent(event);
  var app = this;
  setTimeout(function(){
    //  console.log(downloadLink.parentNode);
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink);
  }, 1000);
  /*if (window.URL != null) {
  // Chrome allows the link to be clicked
  // without actually adding it to the DOM.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  } else {
  // Firefox requires the link to be added to the DOM
  // before it can be clicked.
  downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
  downloadLink.onclick = destroyClickedElement;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  }
  downloadLink.click();*/
  }

  function downloadCanvas(){
    // get canvas data
    var srcCanvas = document.getElementById( 'mynetwork' ).childNodes[0].canvas;
    console.log(srcCanvas)
    destinationCanvas = document.createElement("canvas");
    destinationCanvas.width = srcCanvas.width;
    destinationCanvas.height = srcCanvas.height;

    destCtx = destinationCanvas.getContext('2d');

    //create a rectangle with the desired color
    destCtx.fillStyle = "#FFFFFF";
    destCtx.fillRect(0,0,srcCanvas.width,srcCanvas.height);

    //draw the original canvas onto the destination canvas
    destCtx.drawImage(srcCanvas, 0, 0);

    //finally use the destinationCanvas.toDataURL() method to get the desired output;

    var image =   destinationCanvas.toDataURL(); //canvas.toDataURL("image/png");

    // create temporary link
    var tmpLink = document.createElement( 'a' );
    tmpLink.download = 'image.png'; // set the name of the download file
    tmpLink.href = image;

    // temporarily add link to body and initiate the download
    document.body.appendChild( tmpLink );
    tmpLink.click();
    document.body.removeChild( tmpLink );
  }

  function toggleFullScreen() {
    //https://developers.google.com/web/fundamentals/native-hardware/fullscreen/
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    var changeFullScreen = doc.fullscreenchange || doc.mozfullscreenchange || doc.webkitfullscreenchange || doc.msfullscreenchange;




    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      //requestFullScreen.call(docEl);
      // document.getElementById("main-content").innerHTML = "";

      var canvas = document.getElementById("mynetwork");
      canvas.requestFullscreen();

      /*   document.getElementById("main-content").appendChild(document.getElementById("mynetwork"))*/
      document.getElementById("mynetwork").prepend(document.getElementById("rtl-menu"));
      /*canvas.addEventListener("cancelFullScreen", function(e) {
      console.log("change",e)
    });*/
  }
  else {
    console.log("cancelFullscreen")
    //  document.getElementById("main-content").innerHTML = "";
    //  document.getElementById("main-content").appendChild(document.getElementById("principal"))
    cancelFullScreen.call(doc);
    /*  document.getElementById("network-container").appendChild(document.getElementById("mynetwork"))*/
    // document.getElementById("attachGlobal").prepend(document.getElementById("global"));

  }
}
