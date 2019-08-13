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

  const getShape = (shape) => html `
  -------------------SHAPE ${this.localName(shape.url)}; <br>
  <!--  ${this.toText(shape)}-->
  </br>
  ${getConstraint(shape.constraint)}
  _______________________<br>
  `

  const getConstraint = (constraint) => html`
  =================CONSTRAINT<br>
  Constraint Type :${constraint.type}
  <br>
  <!--${this.toText(constraint)}-->
  <br>

  Constraint Expression (s) : <br>
  ${constraint.expression
    ? html`
    ~~~~~~~Expression : <br>
    ${this.toText(constraint.expression)}<br>
    ${getConstraint(constraint.expression)}
    <br>
    `
    : html`~~~~~~~Expression : None<br>`
  }
  ${constraint.expressions
    ? html`~~~~~~~Expressions : <br>
    ${this.toText(constraint.expressions)}
    <br>
    ${constraint.expressions.map(i => html`*********DEBUT LISTE<br> ${getConstraint(i)}<br>+++++++++++++Fin liste`)}
    `
    : html`~~~~~~~Expressions : None<br>`
  }


  ${constraint.predicate
    ? html`~~~~~~~Predicate :${constraint.predicate}
    <br>
    `
    : html`~~~~~~~Predicate : None<br>`
  }


  ${constraint.valueExpr
    ? html`~~~~~~~valueExpr :
    ${this.toText(constraint.expression)}<br>
    ${getConstraint(constraint.valueExpr)}
    <br>
    `
    : html`~~~~~~~valueExpr : None<br>`
  }

  ${constraint.datatype
    ? html`~~~~~~~datatype :
    ${this.toText(constraint.datatype)}<br>
    ${getConstraint(constraint.datatype)}
    <br>
    `
    : html`~~~~~~~datatype : None<br>`
  }

  ${constraint.nodeKind
    ? html`~~~~~~~nodeKind :
    ${this.toText(constraint.nodeKind)}<br>
    ${getConstraint(constraint.nodeKind)}
    <br>
    `
    : html`~~~~~~~nodeKind : None<br>`
  }

  ${constraint.reference
    ? html`~~~~~~~reference :
    ${this.toText(constraint.reference)}<br>
    ${getConstraint(constraint.reference)}
    <br>
    `
    : html`~~~~~~~reference : None<br>`
  }





  ________________________<br>
  `







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

    <div class="section">
    <h5>DATA</h5>
    <div class="row center-align">

    </div>
    </div>



    <div class="divider"></div>

    ${this.shapes.map(shape => html`

      ${getShape(shape)}
      <br>
      <shexy-formulaire
      .url=${shape.url}
      .constraint = ${shape.constraint}
      .currentUrl = ${this.currentShape.url}
      ?hidden=${this.isNotCurrent(shape)}
      ></shexy-formulaire>

      <paper-button
      class="waves-effect waves-light btn modal-trigger"
      raised

      >Submit</paper-button>
      <br>
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

      toText(json){
        if (json != undefined){
          console.log("ANALYSE DE TYPE ", json.type, "url :",json.url, "DATA :",json)
          return JSON.stringify(json, null, 2)
        }
        else {
          console.log("json undefined");
          return undefined}

      }

    }

    customElements.define('shexy-forms', ShexyForms);
