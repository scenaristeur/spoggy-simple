import { log } from './story.js'


const divs = [
  {name : "story-console", status :"done", clearable : false},
  {name : "shape-selector", status :"done", clearable : false},
  //  {name : "shape-loader", status :"todo", clearable : false},
  {name : "shape-adder", status :"todo", clearable : false},
  {name : "shape-menu", status :"todo", clearable : true},
  {name : "footprint-menu", status :"todo", clearable : true},
  {name : "shape-populator", status :"todo", clearable : false},
  {name : "solid-login", status :"todo", clearable : false},
  {name : "solid-logout", status :"todo", clearable : false},
  {name : "formulaire", status :"todo", clearable : true},
  {name : "footprint", status :"todo", clearable : true},
  {name :"docs", status :"done", clearable : false}
]

function initUI(container){
  var root = document.getElementById(container)
  var d = document.createElement("DIV")
  d.setAttribute("id", "shexydiv")
  root.appendChild(d)
  appendDivsTo(d)
}

function appendDivsTo(destination){
  divs.forEach(function(div){
    var name = div.name;
    var status = div.status;
    var newdiv = document.createElement("DIV")
    destination.appendChild(newdiv)
    newdiv.setAttribute("id", name)
    newdiv.setAttribute("name", name)
    var text = ""
    div.status == "done"? text = "" : text = name;
    if (text.length > 0){
      var t = document.createTextNode(text);
      newdiv.appendChild(t);
    }
  })
  //  log(divs.length+ "divs générés", "initUI")
}


function clearUI(){
  log("","clearUI")
  divs.forEach(function(div){
    if (div.clearable == true){
      document.getElementById(div.name).innerHTML = ""
    }
  });
}

function toggleFullScreen(id) {
  //https://developers.google.com/web/fundamentals/native-hardware/fullscreen/
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
  var changeFullScreen = doc.fullscreenchange || doc.mozfullscreenchange || doc.webkitfullscreenchange || doc.msfullscreenchange;




  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    //requestFullScreen.call(docEl);
    // document.getElementById("main-content").innerHTML = "";

    var canvas = document.getElementById(id);
    canvas.requestFullscreen();

    /*   document.getElementById("main-content").appendChild(document.getElementById("mynetwork"))*/
    //  document.getElementById("mynetwork").prepend(document.getElementById("rtl-menu"));
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




export { initUI, divs, clearUI, toggleFullScreen };
