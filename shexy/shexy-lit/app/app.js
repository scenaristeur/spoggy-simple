import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import './shape-selector.js'
import './shape-forms.js'

class SimpleGreeting extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shapeUrl: { type: String },
      schema: { type: String}
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shapeUrl = "";
    this.schema = "";
    this.shex = ShEx;
    this.fileClient = SolidFileClient;
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
    <!--
    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">simpleG</div>-->

    <a href="${this.shapeUrl}" target="blank">${this.shapeUrl}</a>

    <shape-selector
    name="Selector"
    jsonShapeList="./data/shapesList.json"
    onClick="(e) => console.log(e.target)"
    @my-event="${(e) => { console.log(e.detail.message) }}"
    @shape-selected="${(e) => { this.shapeChanged(e) }}"
    ></shape-selector>

    <shape-forms schemaString=${this.schema}></shape-forms>
    `;
  }

  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    return changedProperties.has('shapeUrl') || changedProperties.has('schema');
  }

  shapeChanged(e){
    this.shapeUrl = e.detail.shapeUrl
    console.log("shapeChanged",this.shapeUrl)
    this.loadSchema(this.shapeUrl)
  }

  loadSchema(shapeUrl){
    var app = this
    this.shex.Loader.load([shapeUrl], [], [], []).then(loaded => {
      if (loaded.schema){
        console.log("LOADED",loaded.schema)
        app.schema = JSON.stringify(loaded.schema);
      }
    }, err => {
      //  log(err, "ERROR loadShex")
      console.log("erreur ",err)
    }
  );
}



}

customElements.define('simple-greeting', SimpleGreeting);
