console.log(" #SHEXY ")
var modules = [
  "messages-console",
  "shape-selector",
  "shape-loader",
  "shape-adder",
  "shape-menu",
  "footprint-menu",
  "shape-populator",
  "solid-login",
  "solid-logout",
  "formulaire",
  "footprint",
  "docs"
]



init()
load_libs()


function load_libs(){
  shex = ShEx;
  fileClient = SolidFileClient;

}

function init(){
  console.log("init")

  var root = document.getElementById("shexy-app")
  var shexydiv = document.createElement("DIV")
  shexydiv.setAttribute("id", "shexydiv")
  root.appendChild(shexydiv)
  appendDivsTo(shexydiv,modules)
}

function appendDivsTo(destination, arrayOfIds){
  arrayOfIds.forEach(function(id){
    console.log(id)
    var newdiv = document.createElement("DIV")
    destination.appendChild(newdiv)
    newdiv.setAttribute("id", id)
    var t = document.createTextNode(id);
    newdiv.appendChild(t);

  })
}
