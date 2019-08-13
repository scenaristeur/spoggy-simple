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
  <fieldset>
  <legend>  ${this.incremente()} -------------------SHAPE ${this.localName(shape.url)}; <br></legend>
  <!--  ${this.toText(shape)}-->
  </br>
  ${getConstraint(shape.constraint)}
  </fieldset>
  `

  const getConstraint = (constraint) => html`
  <fieldset>
  <legend>${this.incremente()} Constraint Type :${constraint.type} <span title="${this.toText(constraint)}">?</span></legend>
  <br>

  <br>

  ${constraint.expression
    ? html`
    ${this.counter} ~~~~~~~Expression : <span title="${this.toText(constraint.expression)}"> ? </span><br>
    ${getConstraint(constraint.expression)}
    <br>
    `
    : html``
  }
  ${constraint.expressions
    ? html`${this.counter} ~~~~~~~Expressions :  <span title="${this.toText(constraint.expressions)}"> ? </span><br>

    ${constraint.expressions.map(i => html`
      <br>${this.counter} *********DEBUT LISTE<br>
      ${getConstraint(i)}<br>
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
      ? html`${this.counter} ~~~~~~~valueExpr : <span title="${this.toText(constraint.valueExpr)}"> ? </span><br>
      ${getConstraint(constraint.valueExpr)}
      <br>
      `
      : html``
    }

    ${constraint.datatype
      ? html`${this.counter}
      <div class="input-field col s6">
      <input
      type="text" class="validate"
      placeholder="${constraint.datatype}"
      ></input>
      <span title="${this.toText(constraint.datatype)}"> ? </span>
      </div>
      <br>
      `
      : html``
    }


    ${constraint.shapeExprs
      ? html`${this.counter} ~~~~~~~shapeExprs : <span title="${this.toText(constraint.shapeExprs)}"> ? </span><br>
      ${getConstraint(constraint.shapeExprs)}
      <br>
      `
      : html``
    }


    ${constraint.nodeKind
      ? html`${this.counter} ~~~~~~~nodeKind : <span title="${this.toText(constraint.nodeKind)}"> ? </span><br>
      ${getConstraint(constraint.nodeKind)}
      <br>
      `
      : html``
    }

    ${constraint.reference
      ? html` <paper-button   class="waves-effect waves-light btn modal-trigger"  @click="${(e) =>this.displayForm(constraint.reference)}" raised>${constraint.reference}</paper-button><br>
      `
      : html``
    }

    ${constraint.min
      ? html`${this.counter} ~~~~~~~min <span title="${this.toText(constraint.min)}"> ? </span> : ${constraint.min}
      `
      : html``
    }

    ${constraint.max
      ? html`${this.counter} ~~~~~~~max <span title="${this.toText(constraint.max)}"> ? </span> : ${constraint.max}
      <br>
      `
      : html``
    }

    ${constraint.values
      ? html`${this.counter} ~~~~~~~values <span title="${this.toText(constraint.values)}"> ? </span> : <br>
      ${constraint.values}
    ${this.toText(constraint.values)}
      ${getConstraint(constraint.values)}

      `
      : html``
    }




    <br>
    </fieldset>
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
          this.counter = 0;
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
          displayForm(id){
            console.log("displayForm",id)
          }
          domSelector(values){
            console.log(values);
            console.log(typeof values)
            var valeurs = JSON.parse(values)
            valeurs.forEach(function(v){
              console.log(v)
            })
          }

        }

        customElements.define('shexy-forms', ShexyForms);
