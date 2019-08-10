console.log(" #SHEXY ")

import { initUI } from './modules/ui.js';
import { initDoc } from './modules/doc.js'


init()

function init(){
  console.log("init")
  initUI("shexy-app")
  initDoc()
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
