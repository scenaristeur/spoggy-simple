import { log } from './story.js'

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
    footprintShape(url,constraint)
    regularShape(url,constraint, "footprint-menu")
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
function regularShape(url,constraint, whereMenu = "shape-menu"){
  log(localName(url),"regularShape")
}










export { Shape };
