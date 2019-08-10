const divs = [
  {name : "messages-console", status :"todo"},
  {name : "shape-selector", status :"todo"},
  {name : "shape-loader", status :"todo"},
  {name : "shape-adder", status :"todo"},
  {name : "shape-menu", status :"todo"},
  {name : "footprint-menu", status :"todo"},
  {name : "shape-populator", status :"todo"},
  {name : "solid-login", status :"todo"},
  {name : "solid-logout", status :"todo"},
  {name : "formulaire", status :"todo"},
  {name : "footprint", status :"todo"},
  {name :"docs", status :"done"}
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
}


export { initUI, divs };
