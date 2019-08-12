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




    <div class="card-panel teal lighten-2">head</div>


    <div class="container">




    <div class="section">
    <h5>Shape Selector</h5>
    <shape-selector
    name="Selector"
    jsonShapeList="./data/shapesList.json"
    @shape-selected="${(e) => { this.shapeChanged(e) }}"
    ></shape-selector>
    </div>

    <shexy-forms
    schema=${this.schema}
    ></shexy-forms>

    <shex-schema
    shapeUrl=${this.shapeUrl}
    @schema-loaded="${(e) => { this.schemaLoaded(e) }}"
    ></shex-schema>


<!--



    <div class="row">
    <div class="col s12"><p>s12</p></div>
    <div class="col s12 m4 l2"><p>s12 m4</p></div>
    <div class="col s12 m4 l8"><p>s12 m4</p></div>
    <div class="col s12 m4 l2"><p>s12 m4</p></div>
    </div>
    <div class="row">
    <div class="col s12 m6 l3"><p>s12 m6 l3</p></div>
    <div class="col s12 m6 l3"><p>s12 m6 l3</p></div>
    <div class="col s12 m6 l3"><p>s12 m6 l3</p></div>
    <div class="col s12 m6 l3"><p>s12 m6 l3</p></div>
    </div>
-->

    </div>


    <div class="card-panel teal lighten-2">footer</div>
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
