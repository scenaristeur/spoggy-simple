console.log(" #SHEXY ")

import { initUI } from './modules/ui.js';
import { initDoc } from './modules/doc.js'
import { ShapeSelector } from './modules/shape-selector.js'


init()

function init(){
  console.log("init")
  initUI("shexy-app")
  initDoc()
  load_libs()
  ShapeSelector()
//  console.log(cube(3)); // 27
mocha.run();
}

function load_libs(){
  shex = ShEx;
  fileClient = SolidFileClient;
  console.log(shex)
  console.log(fileClient)
}
