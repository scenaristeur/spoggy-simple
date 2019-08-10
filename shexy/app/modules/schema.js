import { log } from './story.js'
import { Shape } from './shape.js'

function Schema (schema){
  var shapes = schema.shapes;
  var start = schema.start;
  for (let [url, constraint] of Object.entries(shapes)) {
    console.log(url)
    Shape(url,constraint)
  }
}


export { Schema };
