
function Story(){
console.log("LOG ok")

var s = document.createElement("TEXTAREA");
  s.setAttribute("id", "story")
s.cols = "80";
s.rows = "5";
 var t = document.createTextNode("Use the shape-selector below to select a shape.");
 s.appendChild(t);
 var sc = document.getElementById("story-console")
 sc.appendChild(s);
}

function log(what="\n", why = ""){
  console.log(typeof what, what, "info from ",why, Object.keys(what).length)
  if ((typeof what =="object") && (Object.keys(what).length > 0)){

    what = JSON.stringify(what, null, 2)

  }

  const d = new Date();
  var now = d.toLocaleTimeString('fr-FR') + `.${d.getMilliseconds()}`

document.getElementById("story").value = why+" ["+now+"] "+what+"\n"+document.getElementById("story").value;

}



export { Story, log };
