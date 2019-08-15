import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
//import 'https://unpkg.com/@polymer/paper-input/paper-input.js?module'; NOT SUPPORTED
import './shexy-formatter.js'
import './shexy-solid.js'

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
    currentShape: {type: Object},
    counter: {type: Number},
    lastPredicate: {type: String},
    data :{type : Object}
  };
}

constructor() {
  super();
  this.currentShape = {};
  this.shapes = [];
  this.footprint_shapes = [];
  this.counter = 0;
  this.lastPredicate = "unknown";
  this.data = {}
}

render() {

  const getMinMax = (constraint) => html `
  <label><small>
  ${constraint.min
    ? html `min: ${constraint.min},`
    : html ``
  }
  ${constraint.max
    ? html ` max: ${constraint.max}`
    : html ``
  }
  </small></label><br>`


  const getShape = (shape) => html `
  <form  id ="${shape.url}" class="flow-text" ?hidden=${this.isHidden(shape.url)}>
  <fieldset>

  <legend> <h2> ${this.localName(shape.url)} </h2></legend>
  ${getConstraint(shape.constraint)}

  ${shape.style == "regular"

  ? html `<br><paper-button
  class="waves-effect waves-light btn-large"
  type="submit"
  @click="${(e) =>this.submitForm()}"
  raised >
  Submit ${this.localName(shape.url)}
  <i class="material-icons right">send</i>
  </paper-button>`

  : html `<br><paper-button
  class="waves-effect waves-light btn-large"
  type="submit"
  @click="${(e) =>this.displayForm(shape.url.replace('_Footprint', ''))}"
  raised >
  <i class="material-icons left">arrow_back</i>
  Back to ${this.localName(shape.url.replace('_Footprint', ''))} Form</paper-button>`}

  </fieldset>
  </form>
  `




  const getConstraint = (constraint) => html`
  ${constraint.type ?
    html ``
    :html`type non défini : ${this.toText(constraint)}`
  }


  ${this.isFieldset(constraint.type)
    ? html `<fieldset>
    <legend><span title="${this.toText(constraint)}">${constraint.type}</span></legend>
    `
    :html ``
  }


  ${constraint.expression
    ? html`
    <!--  <small><span title="Expression ${this.toText(constraint.expression)}">Expression</span></small> -->
    ${getConstraint(constraint.expression)}
    `
    : html``
  }

  ${constraint.expressions
    ? html` <!--<small><span title="Expressions ${this.toText(constraint.expressions)}">Expressions</span></small>-->
    ${constraint.expressions.map(i => html`${getConstraint(i)}`)}`
    : html``
  }

  ${constraint.predicate
    ? html`<label class="flow-text" title="${this.toText(constraint)}">${this.setLastPredicate(constraint.predicate)}</label>`
    : html``
  }

  ${constraint.valueExpr
    ? html`${getConstraint(constraint.valueExpr)}`
    : html``
  }

  ${constraint.datatype
    ? html`${constraint.datatype.endsWith("date")
    ? html `<input type="date" class="teal lighten-5"
    placeholder="${constraint.datatype}"
    title="${constraint.datatype}"
    name="${this.getLastPredicate()}"
    ></input>`
    : html `
    <input type="text" class="validate teal lighten-5"
    placeholder="${constraint.datatype}"
    title="${constraint.datatype}"
    label="${constraint.datatype}"
    name="${this.getLastPredicate()}"
    ></input>`
  }`
  : html``
}

${constraint.shapeExprs
  ? html`<div title="${this.toText(constraint)}">
  ${constraint.type == "ShapeOr"
  ?html `<fieldset class="teal lighten-4"><legend class="teal lighten-4"><h6> Choose one of</h6></legend>
  ${constraint.shapeExprs.map(
    shapeExp => html`
    ${Object.keys(shapeExp).map(key =>
      html`${key == "type"
      ? html `<!--<span>${key}: ${shapeExp[key]}<br></span>-->`
      : html `
      <input class="with-gap teal lighten-5" title="${shapeExp}" name="${this.getLastPredicate()}" type="radio"  />
      <label class="flow-text teal lighten-5"> ${key}</label>
      ${getConstraint(shapeExp)}
      `
    }
    `
  )}
  `
)}
</fieldset>
`
: html `${constraint.shapeExprs.map(
  shapeExp => html`${getConstraint(shapeExp)}`
)}
`
}
</div>`
: html``
}


${constraint.nodeKind
  ? html`<input
  type="text" class="validate teal lighten-5"
  title="${constraint.nodeKind}"
  placeholder="${constraint.nodeKind}"
  name="${this.getLastPredicate()}"
  ></input>${getMinMax(constraint)}`
  : html``
}

${constraint.reference
  ? html`
  <input type="text" class="validate teal lighten-5"
  placeholder="${constraint.reference}"
  title="${constraint.reference}"
  label="${constraint.reference}"
  name="${this.getLastPredicate()}"
  ></input>


  <solid-folders
  url="${constraint.reference}"
  @change=${this.selectorChange}
  @select-event="${(e) => { this.changeValue(e, "mySelect") }}" >

  <select id="mySelect" slot="mySelect"
  name="${this.getLastPredicate()}"
  @change=${this.selectorChange}>
  </select>

  </solid-folders>

  <a href="${constraint.reference}" title="${constraint.reference}" target="blank"><i class="material-icons left teal-text lighten-5">visibility</i></a>
  <a href="#" title="Create a ${constraint.reference}" @click="${(e) =>this.displayForm(constraint.reference)}"><i class="material-icons left teal-text lighten-5">create</i>
  <br>  `
  : html``
}


${constraint.values
  ? html`<select class="teal lighten-5"
  @change=${this.selectorChange}
  title="${this.toText(constraint)}"
  name="${this.getLastPredicate()}">
  ${constraint.values.map(i => html`
    <option value="${i.value}"  >${i.value || i}</option>
    `)}
    </select>${getMinMax(constraint)}
    `
    : html``
  }
  ${this.isFieldset(constraint.type)
    ? html `</fieldset>`
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
  /* Style Placeholders */
  ::-webkit-input-placeholder {
    color: #2e7582;
    opacity: 1; /* Firefox */
    text-align: right;
  }
  ::-moz-placeholder {
    color: #2e7582;
    text-align: right;
  }
  :-ms-input-placeholder {
    color: #2e7582;
    text-align: right;
  }
  ::-ms-input-placeholder {
    color: #2e7582;
    text-align: right;
  }
  ::placeholder {
    color: #2e7582;
    text-align: right;
  }
  </style>


  <div class="section" id="forms_section">
  <h5>Forms</h5>
  <div  class="row center-align">
  ${this.shapes.map(i => html`
    ${i.style == "regular"
    ? html `  <div   class="card-panel hoverable col s6 m3 l2 teal lighten-2">
    <p title=${i.url} @click="${(e) =>this.panelClicked(i)}">
    ${this.localName(i.url)}</p>
    </div>`
    :html ``
  }`
)}
</div>
</div>


<div class="divider" id="top_Form"></div>
<div >
<paper-button raised class="waves-effect waves-light" @click="${(e) =>this.focus("forms_section")}">Forms</paper-button>
<paper-button raised class="waves-effect waves-light" @click="${(e) =>this.focus("footprints_section")}" >Footprints</paper-button>
</div>

<div id="currentShapeDiv">
${this.currentShape.url}
</div>



${this.shapes.map(shape => html`
  ${getShape(shape)}
  `)}


  <shexy-formatter
  name="${this.currentShape}"
  .shape="${this.currentShape}"
  .data="${this.data}"
  ></shexy-formatter>

  <div class="divider"></div>

  <div class="section" id="footprints_section">
  <h5>Footprints</h5>
  <p>To change the storage location of this data, use the "_Footprint" before submitting</p>
  <div class="row center-align">
  ${this.shapes.map(i => html`
    ${i.style == "footprint"
    ? html `
    <div  class="card-panel hoverable col s12 m6 l3 teal lighten-5">
    <p title=${i.url} @click="${(e) =>this.panelClicked(i)}">
    ${this.localName(i.url)}</p>
    </div>`
    : html ``
  }`
)}
</div>
</div>
`;
}


selectorChange(e) {
  console.log(e);
  console.log(e.bubbles);
}

shouldUpdate(changedProperties) {
  changedProperties.forEach((oldValue, propName) => {
    console.log(`${propName} changed. oldValue: ${oldValue}`);
  });
  if (changedProperties.has('schema')){
    this.processShapes()
  }
  return changedProperties.has('schema') || changedProperties.has('currentShape') || changedProperties.has('data');
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
    shap.style = "regular"
    if(url.endsWith("_Footprint")){
      shap.style = "footprint"
    }
    app.shapes = [...app.shapes, shap]
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
  this.focus("top_Form")
}
focus(id){
  var focusDiv = this.shadowRoot.getElementById(id)
  focusDiv.scrollIntoView();
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
    var fictiveShape = {}
    fictiveShape.url = id
    this.currentShape = fictiveShape
    this.focus("top_Form")
  }

  isFieldset(shapeType){

    return shapeType != "Shape" && shapeType != "TripleConstraint" && shapeType != "OneOf" && shapeType != "NodeConstraint" && shapeType != "EachOf" && shapeType != "ShapeRef" && shapeType != "ShapeOr"
  }
  isHidden(url){
    return url != this.currentShape.url
  }

  setLastPredicate(p){
    this.lastPredicate = p;
    return this.localName(p)
  }

  getLastPredicate(){
    return this.lastPredicate
  }

  submitForm(){
    var id = this.currentShape.url
    var formData =   this.jsonFromForm(id)
    console.log("fdata",formData)
    var id_footprint = id+"_Footprint"
    console.log("idfootprint",id_footprint)
    var footprintData = this.jsonFromForm(id_footprint)
    console.log("fpdata",footprintData)
    this.data = {}
    var data = {}
    data[id] = {}
    data[id].form = formData
    data[id].footprint = footprintData
    this.data = data
    console.log(this.data)
  }


  jsonFromForm(id){

    console.log(id)
    if (this.shadowRoot.getElementById(id) != null){
      var currentFormFields = this.shadowRoot.getElementById(id).elements
      console.log(currentFormFields)
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


        if (field.nodeName == "SELECT")
        {
          //  RECUPERATION DE LA VALEUR DU SLOT
          console.log(field)
          console.log(field.options)
          if (field.options.length> 0){
            console.log(field.options[ field.selectedIndex ])
            console.log(field.options[ field.selectedIndex ].text)

            var fieldData = {}
            var fieldName = field.name || "unknown";
            fieldData.value =  field.options[ field.selectedIndex ].text || "unknown";
            fieldData.type = field.type || "unknown";
            fieldData.format = field.placeholder || "unknown";
            console.log(fieldData)
            params[fieldName] = fieldData;
          }else{
            console.log("pas d'option")
            console.log("SLOT VALUE",field.slotvalue)
            var fieldData = {}
            var fieldName = field.name || "unknown";
            fieldData.value = field.slotvalue || "unknown";
            //  fieldData.type = field.type || "unknown";
            //    fieldData.format = field.placeholder || "unknown";
            console.log(fieldData)
            params[fieldName] = fieldData;
          }


          //  field.selectedOptions[0].value || field.selectedOptions[0].text ;
        }
        //  console.log(valid)

        if (valid == true){      //  console.log(field, field.nodeName)

          var fieldData = {}
          var fieldName = field.name;
          fieldData.value = field.value
          fieldData.type = field.type;
          fieldData.format = field.placeholder || "unknown";
          console.log(fieldData)
          params[fieldName] = fieldData;
        }

        /*  var x = document.getElementsByName("solid-folders");
        console.log(x)
        */

      }
      //  console.log("params ",params)
      /*if (!(id in data)){
      data[id] = [];
    }
    data[id].push(params)
    console.log("DATA -------- ",data)*/
    return params
  }else{
    console.log("pas de footprint")
  }

  //  this.shadowRoot.getElementById("jsonBtn").disabled = false;

}

changeValue(e, destination){
  console.log(e)
  console.log(e.target)
  console.log(e.detail.value)
  this.shadowRoot.getElementById(destination).slotvalue = e.detail.value
}

firstUpdated(){
  super.firstUpdated();
  const slot = this.shadowRoot.querySelector('#mySelect');
  console.log("SLOT",slot)
  slot.addEventListener('slotchange', e => {
    console.log('light dom children changed!');
  });
}


}

customElements.define('shexy-forms', ShexyForms);
