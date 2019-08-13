import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
//import 'https://unpkg.com/@polymer/paper-input/paper-input.js?module'; NOT SUPPORTED
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
    currentShape: {type: String},
    counter: {type: Number}
  };
}

constructor() {
  super();
  this.currentShape = 'World';
  this.shapes = [];
  this.footprint_shapes = [];
  this.counter = 0
}

render() {

  const getShape = (shape) => html `
  ${this.incremente()} -------------------SHAPE ${this.localName(shape.url)}; <br>
  <!--  ${this.toText(shape)}-->
  </br>
  ${getConstraint(shape.constraint)}
  _______________________<br>
  `

  const getConstraint = (constraint) => html`
  ${this.incremente()} =================CONSTRAINT<br>
  ${this.counter} Constraint Type :${constraint.type}
  <br>
  ${this.toText(constraint)}
  <br>

  ${constraint.expression
    ? html`
    ${this.counter} ~~~~~~~Expression : <br>
    ${this.counter} ${this.toText(constraint.expression)}<br>
    ${this.counter} ${getConstraint(constraint.expression)}
    <br>
    `
    : html``
  }
  ${constraint.expressions
    ? html`${this.counter} ~~~~~~~Expressions : <br>
    ${this.counter} ${this.toText(constraint.expressions)}
    <br>
    ${constraint.expressions.map(i => html`
      <br>${this.counter} *********DEBUT LISTE<br>
      ${this.counter} ${getConstraint(i)}<br>
      ${this.counter} +++++++++++++Fin liste
      <br>`)}
      `
      : html``
    }


    ${constraint.predicate
      ? html`${this.counter} ${constraint.predicate} :
      <br>
      `
      : html``
    }


    ${constraint.valueExpr
      ? html`${this.counter} ~~~~~~~valueExpr :
      ${this.toText(constraint.expression)}<br>
      ${this.counter} ${getConstraint(constraint.valueExpr)}
      <br>
      `
      : html``
    }

    ${constraint.datatype
      ? html`${this.counter}
      <input placeholder="${constraint.datatype}"></input>

      ${this.toText(constraint.datatype)}<br>
      ${this.counter} ${getConstraint(constraint.datatype)}
      <br>
      `
      : html``
    }


    ${constraint.shapeExprs
      ? html`${this.counter} ~~~~~~~shapeExprs :
      ${this.toText(constraint.shapeExprs)}<br>
      ${this.counter} ${getConstraint(constraint.shapeExprs)}
      <br>
      `
      : html``
    }


    ${constraint.nodeKind
      ? html`${this.counter} ~~~~~~~nodeKind :
      ${this.toText(constraint.nodeKind)}<br>
      ${this.counter} ${getConstraint(constraint.nodeKind)}
      <br>
      `
      : html``
    }

    ${constraint.reference
      ? html`${this.counter} ~~~~~~~reference :
      ${this.toText(constraint.reference)}
      <paper-button raised>${constraint.reference}</paper-button><br>
      ${this.counter} ${getConstraint(constraint.reference)}
      <br>
      `
      : html``
    }

    ${constraint.min
      ? html`${this.counter} ~~~~~~~min :
      ${this.toText(constraint.min)}<br>

      `
      : html``
    }

    ${constraint.max
      ? html`${this.counter} ~~~~~~~max :
      ${this.toText(constraint.max)}<br>
      ${getConstraint(constraint.max)}
      <br>
      `
      : html``
    }
  <br>
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
          incremente(){
            console.log(this.counter)
            this.counter = this.counter+1

            return this.counter
          }

        }

        customElements.define('shexy-forms', ShexyForms);
