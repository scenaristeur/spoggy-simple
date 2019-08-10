import { initUI,   clearUI } from './modules/ui.js';
import { initDoc } from './modules/doc.js'
import { ShapeSelector } from './modules/shape-selector.js'
import { Story, log } from './modules/story.js'
import { Schema} from './modules/schema.js'



init()

function init(){
  console.log("init")
  initUI("shexy-app")

  initDoc()
  load_libs()
  ShapeSelector(loadShex)
  Story();

  mocha.run();

}

function load_libs(){
  shex = ShEx;
  fileClient = SolidFileClient;
}

function loadShex(shapeUrl){
  log(shapeUrl, "Please Wait, Connection to ")
  if (shapeUrl.endsWith(".shex")){
    shex.Loader.load([shapeUrl], [], [], []).then(loaded => {
      if (loaded.schema){
        console.log("LOADED",loaded.schema)
        log(shapeUrl, "schema loaded")
        clearUI();
        Schema(loaded.schema)
        log("DONE", "schema loaded")
      }
    }, err => {
      log(err, "ERROR loadShex")
    }
  );
}else{
  log("Choose a .shex file in the selector", "CONSEIL")
}
}
