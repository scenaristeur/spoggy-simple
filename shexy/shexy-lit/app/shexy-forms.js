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
    counter: {type: Number},
    setLastPredicate: {type: String}
  };
}

constructor() {
  super();
  this.currentShape = 'World';
  this.shapes = [];
  this.footprint_shapes = [];
  this.counter = 0;
  this.lastPredicate = ""
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
  <form  id ="${shape.url}" ?hidden=${this.isHidden(shape.url)}>

  <fieldset>
  <legend>  ${this.localName(shape.url)}</legend>
  <!--  ${this.toText(shape)}-->
  </br>
  ${getConstraint(shape.constraint)}
  <paper-button
  class="waves-effect waves-light btn-large modal-trigger"
  type="submit"
  @click="${(e) =>this.submitForm()}"
  raised >
  Submit ${this.localName(shape.url)}
  <i class="material-icons right">send</i>
  </paper-button>
  </fieldset>
  </form>
  `

  const getConstraint = (constraint) => html`
  ${constraint.type ?
    html ``:html`type non défini : ${this.toText(constraint)}<br>`
  }


  ${this.isFieldset(constraint.type)
    ? html `
    <fieldset>
    <legend>Constraint Type :${constraint.type} <span title="${this.toText(constraint)}">?</span></legend>
    `
    :html ``
  }


last predicate : ${this.getLastPredicate()}


  ${constraint.expression
    ? html`
    <span title="Expression ${this.toText(constraint.expression)}"> ? </span>
    ${getConstraint(constraint.expression)}
    `
    : html``
  }

  ${constraint.expressions
    ? html` <span title="Expressions ${this.toText(constraint.expressions)}"> ? </span>
    ${constraint.expressions.map(i => html`${getConstraint(i)}`)}`
    : html``
  }

  ${constraint.predicate
    ? html`<br><span title="${this.toText(constraint)}">${this.setLastPredicate(constraint.predicate)} :<br></span>`
    : html``
  }

  ${constraint.valueExpr
    ? html`
    <span title="${this.toText(constraint.valueExpr)}"> ? </span>
    ${getConstraint(constraint.valueExpr)}`
    : html``
  }

  ${constraint.datatype
    ? html`
    ${constraint.datatype.endsWith("date")
    ? html `
    <input type="date" class="teal lighten-2"
    placeholder="${constraint.datatype}"
    title="${constraint.datatype}"
    name="${this.getLastPredicate()}"
    ></input>`
    : html `
    <input type="text" class="validate teal lighten-2"
    placeholder="${constraint.datatype}"
    title="${constraint.datatype}"
    label="${constraint.datatype}"
    name="${this.getLastPredicate()}"
    ></input>`
  }`
  : html``
}

${constraint.shapeExprs
  ? html`
  <div title="${this.toText(constraint)}">
  ${constraint.shapeExprs.map(
    i => html`
    ${getConstraint(i)}
    ${constraint.type == "ShapeOr"
    ? html ` OR `
    : html ``
  }`
)}
</div>`
: html``
}


${constraint.nodeKind
  ? html`
  <input
  type="text" class="validate teal lighten-2"
  title="${constraint.nodeKind}"
  placeholder="${constraint.nodeKind}"
  name="${this.getLastPredicate()}"
  ></input>
  ${getMinMax(constraint)}`
  : html``
}

${constraint.reference
  ? html`
  <input type="text" class="validate teal lighten-2"
  placeholder="${constraint.reference}"
  title="${constraint.reference}"
  label="${constraint.reference}"
  name="${this.getLastPredicate()}"
  ></input>
  <paper-button class="waves-effect waves-light btn modal-trigger"
  @click="${(e) =>this.displayForm(constraint.reference)}"
  raised>
  Select or create a ${constraint.reference}
  </paper-button>`
  : html``
}


${constraint.values
  ? html`
  <select class="teal lighten-2"
  @change=${this.selectorChange}
  title="${this.toText(constraint)}">
  ${constraint.values.map(i => html`
    <option value="${i.value}"  >${i.value || i}</option>
    `)}
    </select>`
    : html``
  }

  ${getMinMax(constraint)}

  ${this.isFieldset(constraint.type)
    ? html `</fieldset> `
    :html ``
  }
  `


  return html`
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
    <div   class="card-panel hoverable col s6 m3 l2 teal lighten-2">
    <p title=${i.url} @click="${(e) =>this.panelClicked(i)}">
    ${this.localName(i.url)}</p>
    </div>`
  )}
  </div>
  </div>

  <div class="divider"></div>

  <div id="currentShape">
  ${this.currentShape.url}
  </div>

  <div class="divider"></div>

  ${this.shapes.map(shape => html`
    ${getShape(shape)}

    `)}

    <div class="section">
    <h5>Footprints</h5>
    <p>To change the storage location of this data, use the "_Footprint" before submitting</p>
    <div class="row center-align">
    ${this.footprint_shapes.map(i => html`
      <div  class="card-panel hoverable col s12 m6 l3 teal lighten-4">
      <p title=${i.url}>
      ${this.localName(i.url)}</p>
      </div>`
    )}
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
      this.currentShape = app.shapes[0]
      //  this.focus();
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
    this.focus()
  }
  focus(){
    var focusDiv = this.shadowRoot.getElementById(this.currentShape.url)
    console.log(focus)
    focusDiv.focus()
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
      //  console.log("ANALYSE DE TYPE ", json.type, "url :",json.url, "DATA :",json)
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
    isHidden(url){
      return url != this.currentShape.url
    }

    setLastPredicate(p){
      this.lastPredicate = p;
      return p
    }

    getLastPredicate(){
      return this.lastPredicate
    }

    submitForm(){
      var data = [];
      var id = this.currentShape.url
      console.log(id)
      var currentFormFields = this.shadowRoot.getElementById(id).elements
      var currentFormLength = this.shadowRoot.getElementById(id).elements.length;
      console.log( "Found " + currentFormFields.length + " elements in the form "+id);


      var params = {};
      for( var i=0; i<currentFormFields.length; i++ )
      {
        var field = currentFormFields[i]

        var field = currentFormFields[i]
        var valid = true;
        if (
          (field.nodeName == "FIELDSET")  ||
          (field.nodeName == "BUTTON")    ||
          ((field.type == "radio") && (field.checked == false))
        )
        {
          valid = false
        }

        console.log(valid)

        if (valid == true){      //  console.log(field, field.nodeName)
          console.log(field, field.nodeName, field.type)
          var fieldData = {}
          var fieldName = field.name;
          fieldData.value = field.value;
          fieldData.type = field.type;
          fieldData.format = field.placeholder || "unknown";
          params[fieldName] = fieldData;

        }
      }
      //  console.log("params ",params)
      if (!(id in data)){
        data[id] = [];
      }
      data[id].push(params)
      console.log("DATA -------- ",data)



    }




  }

  customElements.define('shexy-forms', ShexyForms);
