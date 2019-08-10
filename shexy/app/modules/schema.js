import { log } from './story.js'
import { Shape } from './shape.js'

function Schema (schema){
  log(schema,"schemaToForm", true)
  var shapes = schema.shapes;
  var start = schema.start;
  log(shapes.length, "schemaToForm", true)
  log (start, "schemaToForm$start")
  for (let [url, constraint] of Object.entries(shapes)) {
    Shape(url,constraint)
  }
}


export { Schema };
