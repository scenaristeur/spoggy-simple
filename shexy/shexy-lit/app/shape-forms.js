import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShapeForms extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      schemaString: { type: String },
      schema: {type: Object }
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.schemaString = '';
    this.schema = {};
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">shape forms</div>
    `;
  }


  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    //  console.log(this.schema)
    });
    if(changedProperties.has('schemaString')){
      this.update(JSON.parse(this.schemaString))
    }
    return changedProperties.has('schemaString');
  }

  update(schema){

    var shapes = schema.shapes;
    var start = schema.start;
    console.log("start",start)
  }

  /*schema(){
  //log(shapeUrl, "schema loaded")
  //  clearUI();
  //  Schema(loaded.schema)
  //  log("DONE", "schema loaded")
  var schema = loaded.schema;
  var shapes = schema.shapes;
  var start = schema.start;
  for (let [url, constraint] of Object.entries(shapes)) {
  console.log(url)
  Shape(url,constraint)
}
}*/



}

customElements.define('shape-forms', ShapeForms);
