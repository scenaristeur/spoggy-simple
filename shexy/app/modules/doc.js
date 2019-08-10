var links = ["https://github.com/scenaristeur/spoggy-simple/blob/master/shexy/README_SHEX_FORMS.md"]
console.log("DOC : ",links)


function initDoc(){
  var docs = document.getElementById("docs")
  docs.appendChild(document.createTextNode("DOC "+ JSON.stringify(links, null, 2)));

}


export { initDoc };
