import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import './shexy-constraint.js'


class ShexyShape extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      url: {type: String},
      constraint: { type: Object},

    };
  }

  constructor() {
    super();
    this.name = 'ShexyShape';
    this.url = "";
    this.constraint = {};
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Name ${this.name}!</p>  <p> url : ${this.url}!</p>  <p>type ${this.constraint.type}!</p>
    <div class="card-panel teal lighten-2">Shexy Shape</div>
    <shexy-constraint
    .type=${this.constraint.type}
    .url=${this.url}
    .constraint=${this.constraint}
    ></shexy-constraint>
    `;
  }
}

customElements.define('shexy-shape', ShexyShape);
