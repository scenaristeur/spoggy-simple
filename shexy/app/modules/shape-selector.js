import { log } from './story.js'

const options = [
  {value: " CHOOSE AN HOLACRATIE SHEX "},
  {name: "role.shex", value: "https://holacratie.solid.community/public/Schema/role.shex"},
  {name: "tension.shex", value: "https://holacratie.solid.community/public/Schema/tension.shex"},
  {name: "ratifier.shex", value: "https://holacratie.solid.community/public/Schema/ratifier.shex"},
  {name: "accountability.shex", value: "https://holacratie.solid.community/public/Schema/accountability.shex"},
  {name: "capacity.shex", value: "https://holacratie.solid.community/public/Schema/capacity.shex"},
  {name: "circle.shex", value: "https://holacratie.solid.community/public/Schema/circle.shex"},
  {name: "governance.shex", value: "https://holacratie.solid.community/public/Schema/governance.shex"},
  {value: "  OTHER SHEX "},
  {name: "post_simple.shex <-- basic example, start with this one", value: "https://holacratie.solid.community/public/Schema/post_simple.shex"},
  {name: "post.shex", value: "https://holacratie.solid.community/public/Schema/post.shex"},
  {name: "issue.shex", value: "https://holacratie.solid.community/public/Schema/issue.shex"},
  {name: "example1.shex", value: "https://holacratie.solid.community/public/Schema/example1.shex"},
  {name: "book.shex", value: "https://jmartin.inrupt.net/public/shapes/book.shex"},
  {name: "movie.shex", value: "https://jmartin.inrupt.net/public/shapes/movie.shex"},
  {name: "data-browser.shex", value: "https://jmartin.inrupt.net/public/shapes/data-browser.shex"},
  {name: "employee.shex", value: "https://jmartin.inrupt.net/public/shapes/employee.shex"},
  {value: "SHEX WITH PROBLEMS or PROBLEMS with SHEX"},
  {name: "purpose.shex", value: "https://holacratie.solid.community/public/Schema/purpose.shex"},
  {name: "domain.shex", value: "https://holacratie.solid.community/public/Schema/domain.shex"},
  {value: " USE YOUR SHEX"},
]

function ShapeSelector(callback){
  var root = document.getElementById("shape-selector")
  var d = document.createElement("SELECT")
  d.setAttribute("id", "shex-selector")
  d.setAttribute("name", "shex-selector")
  root.appendChild(d)
  appendOptionsTo(d, callback)
  d.onchange = function(){
    log()
    var selected = document.getElementById("shex-selector").value;
    log(selected, "ShapeSelector")
    callback(selected)
    return false;
  };
}

function appendOptionsTo(destination, callback){
  options.forEach(function(o){
    //  var name = o.name || o.value;
    //  var value = o.value;
    //  var status = o.status;
    var newopt = document.createElement("OPTION")

    var t = document.createTextNode(o.name || o.value);
    newopt.appendChild(t);
    newopt.value = o.value;
    newopt.title = o.value;
    destination.appendChild(newopt)
    //  newopt.setAttribute("id", name)
    //  newdiv.setAttribute("name", name)

    if (o.status == "selected"){
      newopt.selected = true;
    }

  })
}



export { ShapeSelector };
