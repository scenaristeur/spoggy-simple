import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
//import { localName} from  './shexy-formatter.js'

class ShexyFormatter extends LitElement {
  static get properties() {
    return {
       name: { type: String },
       shape: { type: Object},
       formData: {type: Object     ,
         hasChanged(newVal, oldVal) {
         console.log("DATAAAAAAAAAAAAAAAAAAAAAAAA",newVal, oldVal)
       }}


      };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shape = {url:"testurl"};
    this.formData = {}
  }

  render() {
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">Shexy Formatter of ${this.shape.url}</div>
    <paper-button
    id="jsonBtn"
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.submitForm()}"
    raised
    disabled>
    <i class="material-icons left">file_download</i>
    json data
    </paper-button>
    <paper-button
    id="ttlBtn"
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.submitForm()}"
    raised
    disabled>
    <i class="material-icons left">file_download</i>
    ttl data
    </paper-button>



    <paper-button
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.displayForm(this.shape.url+"_Footprint")}"
    disabled
    raised >
    Verify ${this.localName(this.shape.url+"_Footprint")}
    <i class="material-icons right">keyboard_arrow_right</i>
    </paper-button>

    <paper-button
    id="extraBtn"
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.submitForm()}"
    raised
    disabled>
    add extra data : context, location, mood, personnal field...
    <i class="material-icons right">keyboard_arrow_right</i>
    </paper-button>
    `;
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



}

customElements.define('shexy-formatter', ShexyFormatter);
