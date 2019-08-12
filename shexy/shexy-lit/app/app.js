import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import './shape-selector.js'

class SimpleGreeting extends LitElement {
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
    <!--
    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">simpleG</div>-->

    <shape-selector
    name="Selector"
    jsonShapeList="./data/shapesList.json"
    onClick="(e) => console.log(e.target)"
    @my-event="${(e) => { console.log(e.detail.message) }}"
    @shape-selected="${(e) => { this.shapeChanged(e) }}"
    ></shape-selector>
    `;
  }


  shapeChanged(e){
    console.log(e.detail)
  }





}

customElements.define('simple-greeting', SimpleGreeting);
