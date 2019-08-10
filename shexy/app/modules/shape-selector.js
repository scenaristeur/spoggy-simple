import { log } from './story.js'

const options = [
  {value: " CHOOSE AN HOLACRATIE SHEX "},
  {value: "https://holacratie.solid.community/public/Schema/role.shex"},
  {value: "https://holacratie.solid.community/public/Schema/tension.shex"},
  {value: "https://holacratie.solid.community/public/Schema/ratifier.shex"},
  {value: "https://holacratie.solid.community/public/Schema/accountability.shex"},
  {value: "https://holacratie.solid.community/public/Schema/capacity.shex"},
  {value: "https://holacratie.solid.community/public/Schema/circle.shex"},
  {value: "https://holacratie.solid.community/public/Schema/governance.shex"},
  {value: "  OTHER SHEX "},
  {value: "https://holacratie.solid.community/public/Schema/post_simple.shex"},
  {value: "https://holacratie.solid.community/public/Schema/post.shex"},
  {value: "https://holacratie.solid.community/public/Schema/issue.shex"},
  {value: "https://holacratie.solid.community/public/Schema/example1.shex"},
  {value: "https://jmartin.inrupt.net/public/shapes/book.shex"},
  {value: "https://jmartin.inrupt.net/public/shapes/movie.shex"},
  {value: "https://jmartin.inrupt.net/public/shapes/data-browser.shex"},
  {value: "https://jmartin.inrupt.net/public/shapes/employee.shex"},
  {value: "SHEX WITH PROBLEMS"},
  {value: "https://holacratie.solid.community/public/Schema/purpose.shex"},
  {value: "https://holacratie.solid.community/public/Schema/domain.shex"},
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
    var value = o.value;
    var status = o.status;
    var newopt = document.createElement("OPTION")
    destination.appendChild(newopt)
    var t = document.createTextNode(value);
    newopt.appendChild(t);
    //  newopt.setAttribute("id", name)
    //  newdiv.setAttribute("name", name)

    if (o.status == "selected"){
      newopt.selected = true;
    }

  })
}



export { ShapeSelector };
