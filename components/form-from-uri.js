
import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

class FormFromUri extends LitElement {
  constructor() {
    super();
  this.fields = [{name:"test"}]
    this.formAgent = new FormAgent('formAgent');
    this.formAgent.send('historiqueAgent', 'Prêt!');

  }
  static get properties() {
    return {
      uri: {type: String},
      fields: {type: Array}
    }
  }

  static get styles() {
    return css`.uri { color: green; }`;
  }

  render() {
    return html`
    FORM FROM URI are <span class="uri">${this.uri}</span>!
    <button @click=${this.askForSchema}>LOAD</button>
    <ul>
       ${this.fields.map((f) => html`<li>${f.name}</li>`)}
       <!--voir holacratie-field de heroku-spoggy-->
     </ul>
    `;
  }

  firstUpdated(){

    console.log(this.uri)
    //  this.formAgent.send('fileAgent', {type: 'form', uri: this.uri })
  }
  askForSchema(){
    console.log("ask")
    this.formAgent.send('fileAgent', {type: 'form', uri: this.uri, callback: this.updateForm })
  /*  this.formAgent.request('fileAgent', {type: 'test', uri: this.uri })
    .then(function(reply) {
      console.log('reply: ' + reply);
    });*/
  }
  updateForm(fields){

    this.fields = fields
      console.log("UPDATE FORM",this.fields)
  }
}

customElements.define('form-from-uri', FormFromUri);
