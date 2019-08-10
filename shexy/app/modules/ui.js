const divs = [
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

function initUI(container){
  var root = document.getElementById(container)
  var d = document.createElement("DIV")
  d.setAttribute("id", "shexydiv")
  root.appendChild(d)
  appendDivsTo(shexydiv,divs)
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


export { initUI, divs };
