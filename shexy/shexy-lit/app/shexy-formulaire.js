import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
//import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
//import 'https://unpkg.com/@polymer/paper-input/paper-input.js?module';


class ShexyFormulaire extends LitElement {
  static get properties() {
    return {
      url: { type: String},
      constraint: {type: Object}   /*   ,
      hasChanged(newVal, oldVal) {
      console.log(newVal, oldVal)
    }*/

  };
}

constructor() {
  super();
  this.url = "";
  this.constraint = {}
}

render() {
  return html`
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

  <div id="form">
  url :  ${this.url}
  ${this.constraint}
  </div>



  `;
}

shouldUpdate(changedProperties) {
  changedProperties.forEach((oldValue, propName) => {
    console.log(`${propName} changed. oldValue: ${oldValue}`);
  });
  /*if (changedProperties.has('url')){
  this.processShapes()
}*/
return changedProperties.has('url') || changedProperties.has('constraint');
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
  console.log(id)
  this.currentShape = shape

}



}

customElements.define('shexy-formulaire', ShexyFormulaire);
