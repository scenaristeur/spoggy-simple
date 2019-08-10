import { log } from './story.js'
import { displayForm } from './ui.js'

function Shape(url, constraint){
  console.log(url)
  //log(url,"Shape$url", true)
  //log(constraint,"Shape$constraint", true)
  var shapeName =  localName(url)
  log(shapeName,"Shape$shapeName", true)

  if (!shapeName.endsWith("_Footprint")){
    dernierForm = url
    //  console.log("dernierForm ",dernierForm)
    regularShape(url,constraint)
  }else{

    regularShape(url,constraint, "footprint")
    footprintShape(url,constraint)
  }
}

function localName(uri){
  var ln = uri;
  if (uri.lastIndexOf("#") != -1) {
    ln = uri.substr(uri.lastIndexOf("#")).substr(1)
  }else{
    ln = uri.substr(uri.lastIndexOf("/")).substr(1)
  }
  return ln
}

function footprintShape(url,constraint){
  log(localName(url),"footprintShape")
}
function regularShape(url,constraint, type = "formulaire"){
  makeMenuItem(url, type)
  makeForm(url,type)
}

function makeMenuItem(url,type){
  var shapeName =localName(url)
  log(shapeName,"makeMenuItem regularShape")

  var menu = document.getElementById(type+"-menu");
  var menuitem = document.createElement("BUTTON")
  menuitem.innerHTML = shapeName
  menuitem.title = url;
  menuitem.onclick = function(){
    displayForm(url);
    return false;
  };
  menu.appendChild(menuitem)





}

function makeForm(url,type){
  var form = document.getElementById(type);
}








export { Shape };