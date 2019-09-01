import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexSchema extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shapeUrl: { type: String },
      schema: {type: Object }
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shapeUrl = '';
    this.schema = {};
    this.shex = ShEx;
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
    if(changedProperties.has('shapeUrl') && this.shapeUrl.length > 0){
      this.loadSchema(this.shapeUrl)
    }
    return changedProperties.has('shapeUrl');
  }

  update(schema){

    var shapes = schema.shapes;
    var start = schema.start;
    console.log("start",start)
  }



  loadSchema(shapeUrl){
    var app = this
    this.shex.Loader.load([shapeUrl], [], [], []).then(loaded => {
      if (loaded.schema){
        console.log("LOADED",loaded.schema)
      //  app.schema = JSON.stringify(loaded.schema);
        let   loadedSchema = new CustomEvent('schema-loaded', {
          detail: {
            schema: loaded.schema
          }
        });
        this.dispatchEvent(loadedSchema);
      }
    }, err => {
      //  log(err, "ERROR loadShex")
      console.log("erreur ",err)
      alert(err.message)
    }
  );
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

customElements.define('shex-schema', ShexSchema);
