
function formateData(id){
  var anonyme = false;
  var newFiles = []
  console.log("formate Data from ",id, data)
  var ttlBase = "@prefix : <https://holacratie.solid.community/public/> .\n"
  +  "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n"
  +  "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n"
  +  "@prefix xml: <http://www.w3.org/XML/1998/namespace> .\n"
  +  "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n"
  +  "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n"
  +  "@base <https://holacratie.solid.community/public/> .\n\n\n"

  data[id].forEach(function(enreg){
    if (enreg.submitted == undefined) {
      console.log("newfile")
      var randomName = '_' + Math.random().toString(36).substr(2, 9);
      var filename = randomName
      var ttlString = ttlBase

      for (let [predicate, object] of Object.entries(enreg)) {
        if ((predicate == "http://schema.org/name") &&  (object.value.length > 0)){
          var underName  = object.value.split(' ').join('_');
          filename = underName;
        }
        //  console.log(predicate, object.value, object.type);
        ttlString += '<>  <'+predicate+'>  "'+object.value+'".  # Format :'+object.type+ " "+object.format+ "\n";
      }

      const d = new Date();
      var now = d.toUTCString()+"\n"; 

      ttlString  += "\n\n# shexy made with "+id+"\n";
      ttlString  += "# from "+location.protocol + '//' + location.host + location.pathname+"\n";
      ttlString += "# at "+now

      if (anonyme == false){
        ttlString  += "# by "+document.getElementById("solid-session").textContent+"\n";
      }
      console.log(ttlString)
      enreg.submitted = filename
      newFiles.push({ filename: filename , content: ttlString})
    }







  })
  console.log("new files ", newFiles)
  return newFiles;
}


export { formateData };
