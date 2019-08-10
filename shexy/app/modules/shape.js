import { log } from './story.js'
import { displayForm } from './ui.js'
import { Expression } from './expression.js'
import { Submit } from './submit.js'

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


function footprintShape(url,constraint){
  log(localName(url),"footprintShape")
  var refersTo = url.substring(0, url.length - 10);
  console.log("FOOTPRINT SHAPE ", url, refersTo, constraint)
  //  var fp = {url:url, refersTo: refersTo, constraint:constraint}
  var fp = { }
  fp[refersTo] = url
  if (!("footprints" in data)){
    data["footprints"] = {};
  }
  console.log(fp)
  data["footprints"][refersTo] = url
  console.log(data)
}
function regularShape(url,constraint, type = "formulaire"){
  makeMenuItem(url, constraint, type)
  makeForm(url, constraint,type)
}

function makeMenuItem(url,constraint,type){
  console.log("makemenuitem",url)
  var shapeName =localName(url)
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

function makeForm(url,constraint,type){
  console.log("makeform",url)
  var shapeName =localName(url)
  var forms = document.getElementById(type);
  var formulaire = document.createElement("FORM")
  formulaire.setAttribute("id", url);
  forms.appendChild(formulaire)

  var group =  '_' + Math.random().toString(36).substr(2, 9);
  var fieldsetNode = document.createElement("Fieldset")
  //  var fieldsetNode = setAttribute("id",group)
  fieldsetNode.setAttribute("id",group)
  var x = document.createElement("LEGEND");
  var t = document.createTextNode(shapeName);
  x.appendChild(t);
  fieldsetNode.appendChild(x);
  formulaire.appendChild(fieldsetNode);

  Expression(constraint,group)

  var br = document.createElement("br");
  fieldsetNode.appendChild(br)
  fieldsetNode.appendChild(br)
  var submitBtn = document.createElement("BUTTON");
  fieldsetNode.appendChild(submitBtn)



  if (type == "footprint"){
    formulaire.style.display = "none";
    var refersTo = shapeName.replace('_Footprint', '');
    var btnText = "Back to "+refersTo;

    var url = url.replace('_Footprint', '');
    var t = document.createTextNode(btnText);
    submitBtn.onclick = function(){
      displayForm(url);
      return false;
    };
  }else{
    var btnText = "Submit "+shapeName;
    var t = document.createTextNode(btnText);
    submitBtn.onclick = function(){
      console.log("sumbit",url,data,Submit)

      submit(url)
      return false;
    };

  }
  submitBtn.appendChild(t);
}

function submit(url){
  console.log("submit",url)
  Submit(url)
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



export { Shape , localName};
