

class ShexyApp extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shapeUrl: { type: String },
      schema: {type: String},
      jsonList: {type: String},
      loading: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shapeUrl = "";
    this.schema = {};
    this.fileClient = SolidFileClient;
    this.jsonList = "./data/shapesList.json"
    this.loading = false;
  }

  render() {
    return html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
    <!--
    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">simpleG</div>-->



    <nav class="teal lighten-2">
    <div class="nav-wrapper">
    <a href="#" class="brand-logo">Shexy</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">JavaScript</a></li>
    </ul>
    </div>
    </nav>

    <div class="container">

    <div class="section">
    <h5>Select shape to generate Form</h5>
    <a href="${this.jsonList}" target="blank"><i class="material-icons right">visibility</i></a>

    <shape-selector
    name="Selector"
    jsonShapeList="${this.jsonList}"
    @shape-selected="${(e) => { this.shapeChanged(e) }}"
    ></shape-selector>
    </div>


    ${this.loading
      ? html `
      <div class="progress">
      <div class="indeterminate"></div>
      </div>

      <!-- <div class="preloader-wrapper small active">
      <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
      <div class="circle"></div>
      </div><div class="gap-patch">
      <div class="circle"></div>
      </div><div class="circle-clipper right">
      <div class="circle"></div>
      </div>
      </div>
      </div>-->
      `
      : html  ``}



      <shexy-forms
      schema=${this.schema}
      ></shexy-forms>

      <shex-schema
      shapeUrl=${this.shapeUrl}
      @schema-loaded="${(e) => { this.schemaLoaded(e) }}"
      ></shex-schema>


      </div>


      <!--<div class="card-panel teal lighten-2">footer</div>-->

      <footer class="page-footer teal lighten-2">
      <div class="container">
      <div class="row">
      <div class="col l6 s12">
      <h5 class="white-text">Footer Content</h5>
      <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
      </div>
      <div class="col l4 offset-l2 s12">
      <h5 class="white-text">Links</h5>
      <ul>
      <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
      <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
      </ul>
      </div>
      </div>
      </div>
      <div class="footer-copyright">
      <div class="container">
      © 2014 Copyright Text
      <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
      </div>
      </footer>

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
      this.loading = true;
    }
    schemaLoaded(e){
      console.log(e)
      this.schema = JSON.stringify(e.detail.schema)
      this.loading = false;
    }





  }

  import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
  import './shape-selector.js'
  import './shex-schema.js'
  import './shexy-forms.js'

  customElements.define('shexy-app', ShexyApp);
