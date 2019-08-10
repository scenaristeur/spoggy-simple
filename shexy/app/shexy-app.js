console.log(" #SHEXY ")

import { initUI } from './modules/ui.js';
import { initDoc } from './modules/doc.js'
import { ShapeSelector } from './modules/shape-selector.js'
import { Story, log } from './modules/story.js'


init()

function init(){
  console.log("init")
  initUI("shexy-app")
  initDoc()
  load_libs()
  ShapeSelector(loadShex)
  Story();
  //  console.log(cube(3)); // 27
  mocha.run();
}

function load_libs(){
  shex = ShEx;
  fileClient = SolidFileClient;

}

function loadShex(shapeUrl){
  log(shapeUrl, "loadShex")

  if (shapeUrl.endsWith(".shex")){
    shex.Loader.load([shapeUrl], [], [], []).then(loaded => {
      console.log("LOADED",loaded)
      if (loaded.schema){
        log(shapeUrl, "schema loaded")
        //  schemaToForm(loaded.schema)
      }
    }
    , err => {
      log(err, "ERROR loadShex")
    }
  )

}else{
  log("Choose a .shex file in the selector", "CONSEIL")
}

}
