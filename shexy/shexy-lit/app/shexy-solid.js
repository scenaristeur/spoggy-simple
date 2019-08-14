import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexySolid extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      newFiles: {type: Array},
      ttlBase: {type: String}
     };
  }

  constructor() {
    super();
    this.name = 'World';
    this.newFiles = [1,2,3];


  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">Shexy Solid<br>

${this.newFiles.length} files
<p>prop4: ${this.newFiles.map((item, index) =>
        html`<span>[${index}]:${item}&nbsp;</span>`)}
      </p>


    </div>
    `;
  }
}

customElements.define('shexy-solid', ShexySolid);
