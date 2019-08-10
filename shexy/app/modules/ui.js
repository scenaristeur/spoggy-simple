console.log("TEST UI IMPORT")

// module "mon-module.js"
function cube(x) {
  return x * x * x;
}
const machin = Math.PI + Math.SQRT2;

function initUI(container, main, divs){
  var root = document.getElementById(container)
  var d = document.createElement("DIV")
  d.setAttribute("id", main)
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


export { initUI, cube, machin };
