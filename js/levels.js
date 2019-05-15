var level;

var levels = {
  0: {nom: "Créer un nouveau graphe", lien: "https://youtu.be/bkedKb34USI",video: "https://youtu.be/bkedKb34USI"},
  1: {nom: "Vider un graphe", lien: "https://youtu.be/YqatYoxz5VU",video: "https://youtu.be/YqatYoxz5VU"},
  2: {nom: "Créer un nouveau noeud dans le graphe", lien: "https://youtu.be/XkI6cJPUTuk",video: "https://youtu.be/XkI6cJPUTuk"},
  3: {nom: "Créer un deuxième noeud dans le graphe",lien: "https://youtu.be/AmDwlkLk7f8",video: "https://youtu.be/AmDwlkLk7f8"},
  4: {nom: "Créer un lien entre deux noeuds", lien: "https://youtu.be/ND8fK2liSdE",video: "https://youtu.be/ND8fK2liSdE"},
  5: {nom: "Créer un triplet", lien: "https://youtu.be/tXfX8vgfdiQ",video: "https://youtu.be/tXfX8vgfdiQ"},
  6: {nom: "Créer un graphe avec au moins cinq noeuds et 7 liens", lien: "https://github.com/scenaristeur/spoggy-simple/blob/master/README.md",video: "https://github.com/scenaristeur/spoggy-simple/blob/master/README.md"},

};


function increaseLevel(){
  level = 6 // temporaire affiche tous les tutos tant que ce n'est pas ok
  //level++;
  //console.log(level)
  localStorage.setItem('level',level)
  initLevel();
}

function initLevel(){
  localStorage.getItem('level') == null? localStorage.setItem('level',0) : "" ;
  level = Number(localStorage.getItem('level'))
  document.getElementById("level").textContent  = level;
  var x=document.getElementById("tutos-levels");
  x.innerHTML = "";

  for (var i  = 0; i <= level && i <= Object.keys(levels).length; i++)
  {
    var nom = levels[i].nom;
    //  var lien = levels[i].lien;
    var video = levels[i].video;
    space = document.createTextNode(' ')
    space1 = document.createTextNode(' ')

    newLI = document.createElement("li");
    newText = document.createTextNode(nom);
    /*  link = document.createElement('a');
    link.setAttribute('href', lien);
    link.setAttribute('target', '_blank');
    link.appendChild(document.createTextNode("lien"));*/
    vid = document.createElement('a');
    vid.setAttribute('href', video);
    vid.setAttribute('target', '_blank');
    vid.appendChild(document.createTextNode("video"));
    newLI.appendChild(newText);
    newLI.appendChild(space);
    //  newLI.appendChild(link);
    newLI.appendChild(space1);
    newLI.appendChild(vid);
    x.appendChild(newLI);
  }
}
