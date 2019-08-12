import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShapeSelector extends LitElement {
  static get properties() {
    return { name: { type: String } };
  }

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">SHAPE SELECTOR</div>
    `;
  }
}

customElements.define('shape-selector', ShapeSelector);
