
function formateData(id){
  var anonyme = false;

  console.log("formate Data from ",id, data)
  var ttlString = "@prefix : <https://holacratie.solid.community/public/> .\n"
  +  "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n"
  +  "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n"
  +  "@prefix xml: <http://www.w3.org/XML/1998/namespace> .\n"
  +  "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n"
  +  "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n"
  +  "@base <https://holacratie.solid.community/public/> .\n\n\n"



  var enregistrements = data[id];
  console.log(enregistrements)
  var randomName = '_' + Math.random().toString(36).substr(2, 9);
  var filename = randomName
  enregistrements.forEach(function(enreg){
    for (let [predicate, object] of Object.entries(enreg)) {
      if ((predicate == "http://schema.org/name") &&  (object.value.length > 0)){
        var underName  = object.value.split(' ').join('_');
        filename = underName;
      }
      //  console.log(predicate, object.value, object.type);
      ttlString += '<>  <'+predicate+'>  "'+object.value+'".  # Format :'+object.type+ " "+object.format+ "\n";
    }
  })

  ttlString += "\n\n\n# shexy string for "+ id+ "\n";

  if (!anonyme == true){
    ttlString += "# submitted by "+document.getElementById("solid-session").innerText+" .\n"
    ttlString += "# using "+window.location.href+"\n\n"
  }



  console.log(ttlString)
  /*  var x = document.createElement("PRE");
  var t = document.createTextNode(ttlString);
  x.appendChild(t);

  document.getElementById("result").appendChild(x);*/
  return { filename: filename , content: ttlString};
}


export { formateData };
