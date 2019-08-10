import { displayForm } from './ui.js'
import { log } from './story.js'
import { localName } from './shape.js'

function Submit (id){
console.log(id)
var currentFormFields = document.getElementById(id).elements
var currentFormLength = document.getElementById(id).elements.length;
  console.log( "Found " + currentFormFields.length + " elements in the form "+id);

var params = {};
for( var i=0; i<currentFormFields.length; i++ )
{
  var field = currentFormFields[i]

  var field = currentFormFields[i]
  var valid = true;
  if (
    (field.nodeName == "FIELDSET")  ||
    (field.nodeName == "BUTTON")    ||
    ((field.type == "radio") && (field.checked == false))
  )
  {
    valid = false
  }

  console.log(valid)

  if (valid == true){      //  console.log(field, field.nodeName)
    console.log(field, field.nodeName, field.type)
    var fieldData = {}
    var fieldName = field.name;
    fieldData.value = field.value;
      fieldData.type = field.type;
    fieldData.format = field.placeholder || "unknown";
    params[fieldName] = fieldData;

  }
}
//  console.log("params ",params)
if (!(id in data)){
  data[id] = [];
}
data[id].push(params)
console.log(data)
var id_footprint = id+"_Footprint"
console.log("idfootprint",id_footprint)
populateDataFromFootprintForm(id_footprint)
log(data)
//document.getElementById("result").innerHTML = JSON.stringify(data, null, 2)
var ttlData =  formateData(id)
log(ttlData)
sendData(id,ttlData)

//displayForm(dernierForm)
dernierForm = id;
}

function populateDataFromFootprintForm(id){
  var currentFormFields = document.getElementById(id).elements
  var currentFormLength = document.getElementById(id).elements.length;
    console.log( "Found " + currentFormFields.length + " elements in the form "+id);

  var params = {};
  for( var i=0; i<currentFormFields.length; i++ )
  {
    var field = currentFormFields[i]
    var valid = true;
    if (
      (field.nodeName == "FIELDSET")  ||
      (field.nodeName == "BUTTON")    ||
      ((field.type == "radio") && (field.checked == false))
    )
    {
      valid = false
    }

    console.log(valid)

    if (valid == true){
      console.log(field, field.nodeName, field.type)
      var fieldData = {}
      var fieldName = field.name;
      fieldData.value = field.value;
      fieldData.type = field.type;
      params[fieldName] = fieldData;
    }


  //var checkedButtons = document.querySelectorAll('input[type="radio"]:checked')
  //  console.log("CHECKEDS",checkedButtons)
  //  var checkedButtons = document.querySelectorAll('input[type="radio"]')
//    console.log("CHECKEDS all",checkedButtons)


  }
  console.log(params)
  //  console.log("params ",params)
  if (!(id in data)){
    data[id] = [];
  }
  data[id] = params;

}


function formateData(id){
  console.log("formate Data from ",id, data)
  var ttlString = "# ttlString for "+ id+ "\n\n\n"
  //  "@prefix : <https://holacratie.solid.community/public/> ."
  //  "@prefix owl: <http://www.w3.org/2002/07/owl#> ."
  //  "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ."
  //  "@prefix xml: <http://www.w3.org/XML/1998/namespace> ."
  //  "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> ."
  //  "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> ."
  //  "@base <https://holacratie.solid.community/public/> ."
  var enregistrements = data[id];
  console.log(enregistrements)
  var randomName = '_' + Math.random().toString(36).substr(2, 9);
  var filename = randomName+".ttl"
  enregistrements.forEach(function(enreg){
    for (let [predicate, object] of Object.entries(enreg)) {
      if ((predicate == "http://schema.org/name") &&  (object.value.length > 0)){
        var underName  = object.value.split(' ').join('_');
        filename = underName+".ttl";
      }
      //  console.log(predicate, object.value, object.type);
      ttlString += '<>  <'+predicate+'>  "'+object.value+'".  # Format :'+object.type+ " "+object.format+ "\n";
    }
  })



    console.log(ttlString)
/*  var x = document.createElement("PRE");
  var t = document.createTextNode(ttlString);
  x.appendChild(t);

  document.getElementById("result").appendChild(x);*/
  return { filename: filename , content: ttlString};
}

function sendData(id, ttlData){
  console.log("Send Data from ",id, ttlData)
  fileClient.checkSession().then(
    session => {
      console.log("Logged in as "+session.webId)
      var logged = "Logged in as "+session.webId
      log(logged)
    },
    err => { console.log(err)
      alert(err)}
    );

    //document.getElementById("result").innerHTML += "**** RESULTAT ************"
    //var url = "https://holacratie.solid.community/public/Post/post.ttl"
    //var url = "https://agora.solid.community/public/post.ttl"

    console.log(ttlData)
    console.log(data)
    var footprints = data.footprints;
    console.log("footprints",footprints)
    var footprintUrl = footprints[id]
    console.log("footprintUrl",footprintUrl)
    var footprint = data[footprintUrl]
    console.log("footprint", footprint)
    var shapeName =  localName(id)
   console.log(shapeName)
    var root = footprint["https://footprint.solid.community/public/root"].value || "https://holacratie.solid.community/public/";
    var path = footprint["https://footprint.solid.community/public/path"].value ||  shapeName
    console.log("PATH",path)


    var url = root+path+"/"+ttlData.filename;
    log(url, "Create file")
    //  var url = id+"/"+ttlData.filename;
    console.log(url)
    fileClient.createFile(url,ttlData.content).then( fileCreated => {
      console.log(`Created file ${fileCreated}.`);
      log (fileCreated, "Created file")
    },
    err => {console.log(err);
log(err, "ERROR : file create")
    }
  );



}

export { Submit };
