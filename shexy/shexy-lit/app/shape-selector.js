import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShapeSelector extends LitElement {
  static get properties() {
    return {
      name: { type: String } ,
      jsonShapeList: { type: String } ,
      liste: { type: Array,
        /*hasChanged(newVal, oldVal) {
        console.log(newVal, oldVal)
      }*/

    }
  };
}

constructor() {
  super();
  this.liste = []
}

render() {

  return html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!--  <label>Shape Select</label>-->
  <select @change=${this.selectorChange}>
  <option value="" disabled selected>1 - CHOOSE A GOOD SHEX</option>
  ${this.liste.map(i => html`<option value="${i.value}" title="${i.value}" ?disabled=${this.disabled(i)} >${this.optionName(i)}</option>`)}
  </select>
  <!--<div class="input-field">
  <input ></input><paper-button raised disabled>Use your shex shape</paper-button> ?
  </div>-->
  <a href="${this.shapeUrl}" target="blank">${this.shapeUrl}</a>


  `;

}

firstUpdated(){
  super.firstUpdated()
  this.loadShapeList()
}

loadShapeList(){
  var app = this;
  fetch(this.jsonShapeList)
  .then(function(shapeList) {
    console.log("chargé");
    var sl = shapeList.json().then(function(liste) {
      console.log("parsé");
      console.log(liste)
      app.liste = liste
    }).catch(function(e) {
      console.log("error parsing",e);
      console.log(sl)
    });

  }).catch(function(e) {
    console.log("error fetching",e);
  });
}

shouldUpdate(changedProperties) {
  changedProperties.forEach((oldValue, propName) => {
    console.log(`${propName} changed. oldValue: ${oldValue}`);
  });
  return changedProperties.has('liste') || changedProperties.has('shapeUrl');
}

selectorChange(e) {
  // console.log(e.bubbles);
  let   shapeSelected = new CustomEvent('shape-selected', {
    detail: {
      shapeUrl: e.currentTarget.value
    }
  });
  this.dispatchEvent(shapeSelected);
  this.shapeUrl = e.currentTarget.value
}

optionName(shape){
  return shape.name || shape.value
}

disabled(shape){
  if (shape.name == undefined || shape.name.length < 1){
    return true
  }else{
    return false
  }
}

}

customElements.define('shape-selector', ShapeSelector);
