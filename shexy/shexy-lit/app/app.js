import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import './shape-selector.js'
import './shape-schema.js'

class SimpleGreeting extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shapeUrl: { type: String }
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shapeUrl = "";
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
    @shape-selected="${(e) => { this.shapeChanged(e) }}"
    ></shape-selector>

    <shape-schema
    shapeUrl=${this.shapeUrl}
    @schema-loaded="${(e) => { this.schemaLoaded(e) }}"
    ></shape-schema>
    `;
  }

  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    return changedProperties.has('shapeUrl') ;
  }

  shapeChanged(e){
    this.shapeUrl = e.detail.shapeUrl
    console.log("shapeChanged",this.shapeUrl)
    //  this.loadSchema(this.shapeUrl)
  }
  schemaLoaded(e){
    console.log(e)
    let schema = e.detail.schema
    var shapes = schema.shapes;
    var start = schema.start;
    for (let [url, constraint] of Object.entries(shapes)) {
      console.log(url)
      //  Shape(url,constraint)
    }
  }





}

customElements.define('simple-greeting', SimpleGreeting);
