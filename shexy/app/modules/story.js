function Story(){
  var s = document.createElement("TEXTAREA");
  s.setAttribute("id", "story")
  s.style.width = "100%"   //s.cols = "80";
  s.rows = "5";
  var t = document.createTextNode("Use the shape-selector below to select a shape.");
  s.appendChild(t);
  var sc = document.getElementById("story-console")
  sc.appendChild(s);
}

function log(what="\n", why = "", logConsoletoo = false){
  //  console.log(why)
  if(logConsoletoo == true){
    console.log(what, why)
    //  console.log(typeof what, what, "info from ",why, Object.keys(what).length)
  }
  if ((what ==undefined) || (typeof what =="object") && (Object.keys(what).length > 0)){
    what = JSON.stringify(what, null, 2)
  }
  const d = new Date();
  var now = d.toLocaleTimeString('fr-FR') //+ `.${d.getMilliseconds()}`
  document.getElementById("story").value = now+" ["+why+"] \t"+what+"\n"+document.getElementById("story").value;
}

export { Story, log };
