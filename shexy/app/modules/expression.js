import { localName } from './shape.js'
import { displayForm } from './ui.js'
import { solidPopulateSelectWithFolder } from './solid.js'

function Expression (exp, idParent){
  console.log("EXPRESSION",exp,idParent)
  console.log("---",exp.type)
  switch (exp.type) {
    case "Shape":
    processShape(exp,idParent)
    break;
    case "TripleConstraint":
    processTriple(exp,idParent)
    break;
    case "NodeConstraint":
    processNode(exp,idParent)
    break;
    case "EachOf":
    processEachOf(exp,idParent)
    break;
    case "OneOf":
    processOneOf(exp,idParent)
    break;
    case "ShapeRef":
    processShapeRef(exp,idParent)
    break;
    case "ShapeOr":
    processShapeOr(exp,idParent)
    break;
    case "ShapeAnd":
    processShapeAnd(exp,idParent)
    break;

    default:
    //  idParent.appendChild(document.createTextNode("TYPE INCONNU :"+JSON.stringify(exp, null, 2)));
    //  idParent.appendChild(br.cloneNode())
    console.log("TYPE INCONNU :"+JSON.stringify(exp, null, 2));
  }
  //  idParent.appendChild(br.cloneNode())
}



function processShape(exp,idParent){
  //  var br = document.createElement("br");
  //  parent.appendChild(document.createTextNode("SHAPE "+ JSON.stringify(exp, null, 2)));
  //  parent.appendChild(br.cloneNode())
  Expression(exp.expression,idParent)
}

function processTriple(exp,idParent){
  console.log(exp,idParent)
  //  var br = document.createElement("br");
  //  parent.appendChild(document.createTextNode("TRIPLE "+ JSON.stringify(exp, null, 2)));
  //  parent.appendChild(br.cloneNode())
  //  parent.appendChild(document.createTextNode("PREDICATE "+ exp.predicate));
  //  parent.appendChild(br.cloneNode())
  var parent = document.getElementById(idParent)
  var labelInput = document.createElement("LABEL")
  labelInput.innerHTML = localName(exp.predicate);
  labelInput.title = exp.predicate;
  parent.appendChild(labelInput);
  exp.valueExpr.elemName = exp.predicate;
  console.log("ADD ELEMNAME", exp.valueExpr)
  // transmission du predicate à filed concerné pour field.name

  Expression(exp.valueExpr,idParent)
}

function processEachOf(exp,idParent){
  //var br = document.createElement("hr");
  /*var br = document.createElement("br");
  parent.appendChild(document.createTextNode("EACHOF "));
  parent.appendChild(document.createTextNode( JSON.stringify(exp, null, 2)));
  parent.appendChild(br.cloneNode())*/
  //  parent.appendChild(document.createTextNode("EXPRESSIONS "+ JSON.stringify(exp.expressions, null, 2)));
  exp.expressions.forEach(function(e){
    Expression(e,idParent)
    var parent = document.getElementById(idParent)
    var br = document.createElement("br");
    parent.appendChild(br.cloneNode());
    parent.appendChild(br.cloneNode());
  });
}



function processOneOf(exp,idParent){
  //  var br = document.createElement("br");
  var group =  '_' + Math.random().toString(36).substr(2, 9);
  var parent = document.getElementById(idParent)

  //  parent.appendChild(document.createTextNode("one of "));
  //parent.appendChild(document.createTextNode( JSON.stringify(exp, null, 2)));
  //  parent.appendChild(br.cloneNode())
  var fieldsetNode = document.createElement("Fieldset")
  fieldsetNode.setAttribute("id",group)
  parent.appendChild(fieldsetNode);
  var x = document.createElement("LEGEND");
  var t = document.createTextNode("One of (different predicate)");
  x.appendChild(t);
  fieldsetNode.appendChild(x);

  console.log("ONEOF "+ JSON.stringify(exp, null, 2))
  var firstChoice = true;
  exp.expressions.forEach(function(e){
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    var uuid =  '_' + Math.random().toString(36).substr(2, 9);
    var radio = document.createElement("INPUT")
    //  radio.value = uuid
    radio.type = "radio"
    radio.name = group
    radio.value = uuid
    fieldsetNode.appendChild(radio);


    radio.onclick = function(e){
      console.log(e.target.value)
      var  name = e.target.name
      var fieldsets  = document.getElementsByName(name);
      fieldsets.forEach(function (fs){
        if (fs.nodeName == "FIELDSET"){
          if (fs.id == e.target.value){
            fs.style.borderColor = "green"
          }else{
            fs.style.borderColor = "red"
          }
        }
      })
    }



    var fieldsetChild = document.createElement("Fieldset")
    fieldsetChild.setAttribute("id",uuid)
    fieldsetChild.name = group
    fieldsetNode.appendChild(fieldsetChild);
    var x = document.createElement("LEGEND");
    if (firstChoice == true){ // pour ne pas l'afficher la premiere fois
    // fieldsetNode.appendChild(document.createTextNode("Default Choice"));
    radio.checked = true
    var t = document.createTextNode("Default Choice");
    firstChoice = false;

    fieldsetChild.style.borderColor = "green"
  }else{
    var t = document.createTextNode("or");
    fieldsetChild.style.borderColor = "red"
    //fieldsetChild.style.borderStyle ="solid";

    //fieldsetNode.appendChild(document.createTextNode("or"));
  }
  x.appendChild(t);
  fieldsetChild.appendChild(x);
  Expression(e,uuid)
});
}

function processNode(exp,idParent){
  var parent = document.getElementById(idParent)


  //  parent.appendChild(document.createTextNode("NODE "+ JSON.stringify(exp, null, 2)));
  //  console.log("NODE "+ JSON.stringify(exp, null, 2))
  console.log("NODE ", exp.elemName)
  console.log("datatype ", exp.datatype)
  console.log("values ", exp.values)

  var elem;
  if(exp.datatype != undefined) {
    console.log("HAS DATATYPE ",exp.datatype)
    switch(exp.datatype) {
      case "http://www.w3.org/2001/XMLSchema#dateTime":
      case "http://www.w3.org/2001/XMLSchema#date":
      elem = document.createElement("input")
      elem.setAttribute("type", "date")
      break;
      case "http://www.w3.org/2001/XMLSchema#string":
      elem = document.createElement("input")
      elem.setAttribute("placeholder", "xsd:string")
      break;
      case "http://www.w3.org/2001/XMLSchema#integer":
      elem = document.createElement("input")
      elem.setAttribute("placeholder", "xsd:integer")
      elem.setAttribute("type", "number")
      break;
      default:
      //  elem = document.createTextNode(" !!!! DATATYPE INCONNU"+ JSON.stringify(exp, null, 2));
      elem = document.createElement("input")
      elem.setAttribute("placeholder", exp.datatype)
    }
    //  parent.appendChild(br.cloneNode());
  }
  // gestion des contraintes autres proprietes

  //exemple  <input type="number" name="quantity" min="1" max="5">
  if (exp.hasOwnProperty("values")){
    console.log("HAS VALUES ",exp.values)
    //  parent.appendChild(br.cloneNode())
    elem = document.createElement("select")
    parent.appendChild(elem);
    exp.values.forEach(function(v){
      var optionSet = document.createElement("option");
      optionSet.text = v.value || v;
      elem.add(optionSet);
    });
  }
  if (exp.hasOwnProperty("minlength")){
    console.log("HAS minlength ",exp.minlength)
    elem.setAttribute("minlength", exp.minlength)
  }
  if (exp.hasOwnProperty("nodeKind")){
    console.log("HAS nodeKind ",exp.nodeKind)
    elem = document.createElement("input")
    elem.setAttribute("placeholder", exp.nodeKind)

  }
  if (exp.hasOwnProperty("elemName")){
    console.log("HAS elemName ",exp.elemName)
    elem.setAttribute("name", exp.elemName)
  }

  console.log("NEW NODE",elem)
  parent.appendChild(elem);
  /*var br = document.createElement("br");
  parent.appendChild(br.cloneNode());
  parent.appendChild(br.cloneNode());*/
  //  var expKeys =   Object.keys(exp)
  //  parent.appendChild(document.createTextNode("NODE KEYS"+ JSON.stringify(expKeys, null, 2)));
  //  console.log("NODE KEYS"+ JSON.stringify(expKeys, null, 2));
}

function processShapeRef(exp, idParent){
  var parent = document.getElementById(idParent)

  dernierForm = idParent


  var uuid =  '_' + Math.random().toString(36).substr(2, 9);

  var shapeRefSelect = document.createElement("select")
  parent.appendChild(shapeRefSelect);
  shapeRefSelect.setAttribute("name", exp.reference)
  parent.appendChild(shapeRefBtn);
  solidPopulateSelectWithFolder(exp.reference,uuid)



var shapeRefBtn = document.createElement("button")
shapeRefBtn.innerHTML = "Create new "+localName(exp.reference);
shapeRefBtn.title = exp.reference;
shapeRefBtn.onclick = function(){
  displayForm(exp.reference)
  return false;
};




}



function processShapeOr(exp, idParent){
  var parent = document.getElementById(idParent)

  // PRESQUE COMME processOneOf ??
  //  var group =  '_' + Math.random().toString(36).substr(2, 9);
  //  parent.appendChild(document.createTextNode("PROCESSSHAPEOR Non géré"+ JSON.stringify(exp, null, 2)));
  //  parent.appendChild(elem);
  /*  console.log("PROCESSSHAPEOR Non géré"+ JSON.stringify(exp, null, 2))
  var br = document.createElement("br");
  parent.appendChild(document.createTextNode(" TODO PROCESSSHAPE OR "));
  parent.appendChild(br.cloneNode());
  exp.shapeExprs.forEach(function(e){
  processExp(e,parent)
});*/
var group = exp.elemName
var fieldsetNode = document.createElement("Fieldset")
fieldsetNode.setAttribute("id",group)
parent.appendChild(fieldsetNode);
var x = document.createElement("LEGEND");
var t = document.createTextNode("Shape OR (same predicate)");
x.appendChild(t);
fieldsetNode.appendChild(x);

console.log("processShapeOr "+ JSON.stringify(exp, null, 2))
var firstChoice = true;
exp.shapeExprs.forEach(function(e){

  var uuid =  '_' + Math.random().toString(36).substr(2, 9);
  var radio = document.createElement("INPUT")
  //  radio.value = uuid
  radio.type = "radio"
  radio.name = group
  radio.value = uuid
  fieldsetNode.appendChild(radio);


  radio.onclick = function(e){
    console.log(e.target.value)
    var  name = e.target.name
    var fieldsets  = document.getElementsByName(name);
    fieldsets.forEach(function (fs){
      if (fs.nodeName == "FIELDSET"){
        if (fs.id == e.target.value){
          fs.style.borderColor = "green"
        }else{
          fs.style.borderColor = "red"
        }
      }
    })
  }



  var fieldsetChild = document.createElement("Fieldset")
  fieldsetChild.setAttribute("id",uuid)
  fieldsetChild.name = group
  fieldsetNode.appendChild(fieldsetChild);
  var x = document.createElement("LEGEND");
  if (firstChoice == true){ // pour ne pas l'afficher la premiere fois
  // fieldsetNode.appendChild(document.createTextNode("Default Choice"));
  radio.checked = true
  var t = document.createTextNode("Default Choice");
  firstChoice = false;
  fieldsetChild.style.borderColor = "green"
}else{
  var t = document.createTextNode("or");
  fieldsetChild.style.borderColor = "red"
  //fieldsetNode.appendChild(document.createTextNode("or"));
}
x.appendChild(t);
fieldsetChild.appendChild(x);
if (e.elemName == undefined){
  e.elemName = exp.elemName
}
Expression(e,uuid)
});



}

function processShapeAnd(exp, idParent){
  var parent = document.getElementById(idParent)

  //  parent.appendChild(document.createTextNode("PROCESSSHAPEAND Non géré"+ JSON.stringify(exp, null, 2)));
  //  parent.appendChild(elem);
  var br = document.createElement("br");
  parent.appendChild(document.createTextNode(" TODO PROCESSSHAPE AND (must satisfy all constraints)"));
  parent.appendChild(br.cloneNode());
  console.log("PROCESSSHAPEAND Non géré"+ JSON.stringify(exp, null, 2))
  exp.shapeExprs.forEach(function(e){
    Expression(e,idParent)
  });
}







export { Expression };
