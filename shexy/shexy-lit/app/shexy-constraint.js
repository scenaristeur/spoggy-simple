import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexyConstraint extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      type: {type: String},
      constraint: { type: Object},
      url: { type: Object},

    };
  }

  constructor() {
    super();
    this.name = 'ShexyConstraint';
    this.type = "";
    this.url = "";
    this.constraint = {};
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Name ${this.name}!</p>  <p> url : ${this.url}!</p>  <p>type ${this.type}!</p>
    <div class="card-panel teal lighten-2">Shexy Constraint</div>
        ${getConstraint(this.constraint)}
    `;
  }



  getConstraint(constraint) {
    console.log("Analyse de la contrainte ",this.url," de type ", this.type)
    console.log("Expression ",this.constraint.expression)
    if (user.isloggedIn) {
      return html`Welcome ${user.name}`;
    } else {
      return html`Please log in`;
    }
  }

  html`

  `


}

customElements.define('shexy-constraint', ShexyConstraint);
