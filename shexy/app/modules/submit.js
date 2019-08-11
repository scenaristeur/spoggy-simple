import { displayForm } from './ui.js'
import { log } from './story.js'
import { localName } from './shape.js'
import { populateDataFromForm, populateDataFromFootprintForm } from './formulaire.js'
import { formateData } from './formatter.js'
import { solidCheckSession , solidCreateFile } from './solid.js'



function Submit (id){
  console.log(id)

  populateDataFromForm(id)

  console.log(data)
  var id_footprint = id+"_Footprint"
  console.log("idfootprint",id_footprint)
  populateDataFromFootprintForm(id_footprint)
  log(data)
  //document.getElementById("result").innerHTML = JSON.stringify(data, null, 2)
  var newFiles =  formateData(id)
  log(newFiles)

  newFiles.forEach(function (f){
    console.log(f)
    sendData(id, f)
  })


  //displayForm(dernierForm)
  dernierForm = id;
}




function sendData(id, ttlData){
  console.log("Send Data from ",id, ttlData)
  var session = solidCheckSession()
  console.log("SESSSSSS" , session)

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
  solidCreateFile(url, ttlData)



}

export { Submit };
