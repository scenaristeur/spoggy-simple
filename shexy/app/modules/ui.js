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


export { initUI, divs, clearUI };
