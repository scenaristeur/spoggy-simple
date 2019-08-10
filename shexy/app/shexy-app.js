console.log(" #SHEXY ")

import { cube, machin, initUI } from './modules/ui.js';

console.log(cube(3)); // 27
console.log(machin);



var divs = [
  "messages-console",
  "shape-selector",
  "shape-loader",
  "shape-adder",
  "shape-menu",
  "footprint-menu",
  "shape-populator",
  "solid-login",
  "solid-logout",
  "formulaire",
  "footprint",
  "docs"
]

init()

function init(){
  console.log("init")
  initUI("shexy-app", "shexydiv",divs)
  load_libs()
//  console.log(cube(3)); // 27
mocha.run();
}

function load_libs(){
  shex = ShEx;
  fileClient = SolidFileClient;
  console.log(shex)
  console.log(fileClient)
}
