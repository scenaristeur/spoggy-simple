import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexySolid extends LitElement {
  static get properties() {
    return { name: { type: String },
    ttl: { type: Object} };
  }

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <p>Shape : ${this.ttl.shape.url}</p>
    <p>Data:
    ${Object.keys(this.ttl).map(item =>
      html`<span>
      ${item}: ${this.ttl[item]}&nbsp;<br>

      </span>`)}
      </p>
    <div class="card-panel teal lighten-2">shexy solid</div>
    `;
  }
}

customElements.define('shexy-solid', ShexySolid);
