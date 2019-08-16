import {render, html} from 'http://unpkg.com/lighterhtml?module';
// direct import (script module, deno)
//import dialogPolyfill  from '/node_modules/dialog-polyfill/index.js';


customElements.define('my-ce', class extends HTMLElement {
  constructor() {
    super();
    this.state = {yup: 0, nope: 0};
    this.render = render.bind(
      // used as update callback context
      this,
      // used as target node
      // it could either be the node itself
      // or its shadow root, even a closed one
      this.attachShadow({mode: 'closed'}),
      // the update callback
      this.render
    );
    // first render
    this.render();

  }



  created(){
    console.log("CREATED")

  }

  render() {
    const {yup, nope} = this.state;
    return html`
    <link type="text/css" rel="stylesheet" href="lib/materialize/css/materialize.min.css"  media="screen,projection"/>
    <script type="text/javascript" src="lib/materialize/js/materialize.min.js"></script>
    Isn't this <strong>awesome</strong>?
    <hr>
    <button data-key=yup onclick=${this}>yup ${yup}</button>
    <button data-key=nope onclick=${this}>nope ${nope}</button>


    `;
  }
  handleEvent(event) {
    this[`on${event.type}`](event);
  }
  onclick(event) {
    event.preventDefault();
    const {key} = event.currentTarget.dataset;
    this.state[key]++;
    this.render();
  }
});
