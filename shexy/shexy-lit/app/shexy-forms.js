import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
//import 'https://unpkg.com/@polymer/paper-input/paper-input.js?module'; NOT SUPPORTED
//import './shexy-formulaire.js'

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

  const getMinMax = (constraint) => html `
  ${constraint.min
    ? html `min: ${constraint.min},`
    : html ``
  }
  ${constraint.max
    ? html ` max: ${constraint.max},`
    : html ``
  }
  <br>`


  const getShape = (shape) => html `
  <fieldset>
  <legend>  ${this.incremente()} -------------------SHAPE ${this.localName(shape.url)}; <br></legend>
  <!--  ${this.toText(shape)}-->
  </br>
  ${getConstraint(shape.constraint)}
  <paper-button
  class="waves-effect waves-light btn modal-trigger"
  raised

  >Submit</paper-button>
  </fieldset>
  `

  const getConstraint = (constraint) => html`

  ${constraint.type
    ? html ``:html`type non défini : ${this.toText(constraint)}<br>`}


    ${this.isFieldset(constraint.type)
      ? html `
      <fieldset>
      <legend>${this.incremente()} Constraint Type :${constraint.type} <span title="${this.toText(constraint)}">?</span></legend>
      `
      :html `
      <span title="${this.toText(constraint)}">?</span><br>
      `
    }

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

        ${getConstraint(i)}<br>

        <br>`)}
        `
        : html``
      }


      ${constraint.predicate
        ? html`${constraint.predicate} :
        `
        : html``
      }


      ${constraint.valueExpr
        ? html`
        ${getConstraint(constraint.valueExpr)}<span title="${this.toText(constraint.valueExpr)}"> ? </span>
        <br>
        `
        : html``
      }

      ${constraint.datatype
        ? html`

        ${constraint.datatype.endsWith("date")
        ? html `
        <input
        type="date" class="validate"
        placeholder="${constraint.datatype}"
        title="${constraint.datatype}"
        ></input>
        `
        : html `
        <input
        type="text" class="validate"
        placeholder="${constraint.datatype}"
        title="${constraint.datatype}"
        label="${constraint.datatype}"
        ></input>
        `
      }
      `
      : html``
    }


    ${constraint.shapeExprs
      ? html`${this.counter} ~~~~~~~shapeExprs : <span title="${this.toText(constraint.shapeExprs)}"> ? </span><br>
      ${constraint.shapeExprs.map(i => html`

        ${getConstraint(i)}<br>

        <br>`)}
        <br>
        `
        : html``
      }


      ${constraint.nodeKind
        ? html`
        <div class="input-field col s6">
        <input
        type="text" class="validate"
        placeholder="${constraint.nodeKind}"
        ></input>
        ${getMinMax(constraint)}

        <span title="${constraint.nodeKind}"> ? </span>
        </div>
        <br>
        `
        : html``
      }

      ${constraint.reference
        ? html` <paper-button   class="waves-effect waves-light btn modal-trigger"  @click="${(e) =>this.displayForm(constraint.reference)}" raised>${constraint.reference}</paper-button><br>
        `
        : html``
      }


      ${constraint.values
        ? html`${this.counter} ~~~~~~~values <span title="${this.toText(constraint.values)}"> ? </span> : <br>
        ${constraint.values}
        ${this.toText(constraint.values)}
        <select class="teal lighten-2" @change=${this.selectorChange}>
        ${constraint.values.map(i => html`

          <option value="${i.value}"  >${i.value || i}</option>
          `)}
          </select>
          `
          : html``
        }

        ${getMinMax(constraint)}
        <br>

        ${this.isFieldset(constraint.type)
          ? html `
          </fieldset>
          `
          :html ``
        }

        `


        return html`
        <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>
        <style>
        select {
          display: block; # obligé car materializecss n'arrive pas à initilaiser les selects
        }
        </style>
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

              isFieldset(shapeType){

                return shapeType != "Shape" && shapeType != "TripleConstraint" && shapeType != "NodeConstraint" && shapeType != "EachOf" && shapeType != "ShapeRef"
              }

            }

            customElements.define('shexy-forms', ShexyForms);
