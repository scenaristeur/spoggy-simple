import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import './shape-selector.js'
import './shex-schema.js'
import './shexy-forms.js'

class SimpleGreeting extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shapeUrl: { type: String },
      schema: {type: String}
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shapeUrl = "";
    this.schema = {};
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
    @shape-selected="${(e) => { this.shapeChanged(e) }}"
    ></shape-selector>

    <shex-schema
    shapeUrl=${this.shapeUrl}
    @schema-loaded="${(e) => { this.schemaLoaded(e) }}"
    ></shex-schema>

    <shexy-forms
    schema=${this.schema}
    ></shexy-forms>



    `;
  }

  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    return changedProperties.has('shapeUrl') || changedProperties.has('schema') ;
  }

  shapeChanged(e){
    this.shapeUrl = e.detail.shapeUrl
    console.log("shapeChanged",this.shapeUrl)
    //  this.loadSchema(this.shapeUrl)
  }
  schemaLoaded(e){
    console.log(e)
    this.schema = JSON.stringify(e.detail.schema)  
  }





}

customElements.define('simple-greeting', SimpleGreeting);
