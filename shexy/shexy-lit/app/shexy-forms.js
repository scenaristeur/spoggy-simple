import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
import './shexy-formulaire.js'

class ShexyForms extends LitElement {
  static get properties() {
    return {
      schema: { type: String   /*   ,
        hasChanged(newVal, oldVal) {
        console.log(newVal, oldVal)
      }*/
    },
    shapes: { type: Array},
    footprint_shapes: { type: Array},
    currentShape: {type: String}
  };
}

constructor() {
  super();
  this.currentShape = 'World';
  this.shapes = [];
  this.footprint_shapes = [];
}

render() {
  return html`
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
  <div class="section">
  <h5>Forms</h5>
  <div class="row center-align">

  ${this.shapes.map(i => html`
    <div   class="card-panel hoverable col s12 m6 l3 teal lighten-2">
    <p title=${i.url} @click="${(e) =>this.panelClicked(i)}">
    ${this.localName(i.url)}</p>

    <!--  <paper-button
    class="waves-effect waves-light btn modal-trigger"
    raised @click=${(e) =>this.panelClicked(i)}
    title=${i.url}
    >${this.localName(i.url)}</paper-button>-->
    </div>
    `)}

    </div>
    </div>

    <div class="divider"></div>
    <div id="currentShape">
    ${this.currentShape.url}
    </div>
    <div class="divider"></div>

    ${this.shapes.map(shape => html`
      <shexy-formulaire
      .url=${shape.url}
      .constraint = ${shape.constraint}
      .currentUrl = ${this.currentShape.url}
      ?hidden=${this.isNotCurrent(shape)}
      ></shexy-formulaire>
      `)}
      </ul>


      <div class="section">
      <h5>Footprints</h5>
      <div class="row center-align">

      ${this.footprint_shapes.map(i => html`
        <div  class="card-panel hoverable col s12 m6 l3 teal lighten-4">
        <p title=${i.url}>
        ${this.localName(i.url)}</p>

        </div>
        `)}
        </div>
        </div>



        `;
      }

      shouldUpdate(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
          console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
        if (changedProperties.has('schema')){
          this.processShapes()
        }
        return changedProperties.has('schema') || changedProperties.has('currentShape');
      }

      processShapes(){
        var app = this;
        var schema = JSON.parse(this.schema)
        console.log(schema)
        console.log(schema.start)
        var shapes = schema.shapes
        this.shapes = []
        this.footprint_shapes = []
        console.log(this.shapes)

        for (let [url, constraint] of Object.entries(shapes)) {
          console.log(url)
          var shap = {}
          shap.url = url;
          shap.constraint = constraint
          if(url.endsWith("_Footprint")){
            app.footprint_shapes = [...app.footprint_shapes, shap]
          }else{
            app.shapes = [...app.shapes, shap]
          }
          this.currentForm = app.shapes[0]
        }
        console.log("SHSHSHSHS",app.shapes)
      }


      localName(uri){
        var ln = uri;
        if (uri.lastIndexOf("#") != -1) {
          ln = uri.substr(uri.lastIndexOf("#")).substr(1)
        }else{
          ln = uri.substr(uri.lastIndexOf("/")).substr(1)
        }
        return ln
      }

      panelClicked(shape){
        console.log(shape)
        this.currentShape = shape
      }

      isNotCurrent(shape){
        if (shape.url == this.currentShape.url){
          return false
        }else{
          return true
        }
      }

    }

    customElements.define('shexy-forms', ShexyForms);
