import {render, html} from 'https://unpkg.com/lighterhtml?module';
import './todo.js'
// direct import (script module, deno)
//import dialogPolyfill  from '/node_modules/dialog-polyfill/index.js';


customElements.define('shexy-app', class extends HTMLElement {
  constructor() {
    super();
    this.state = {yup: 0, nope: 0};
    this.render = render.bind(
      // used as update callback context
      this,
      // used as target node
      // it could either be the node itself
      // or its shadow root, even a closed one
      this.attachShadow({mode: 'open'}),
      // the update callback
      this.render
    );

    // first render
    this.render();

  }



  connectedCallback(){
    console.log("CREATED")

  /*  M.AutoInit();
    console.log(M)*/

  }

  render() {
    const {yup, nope} = this.state;
    return html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="lib/materialize/css/materialize.min.css"  media="screen,projection"/>

    <nav class="teal lighten-2">
    <div class="nav-wrapper">
    <a href="#" class="brand-logo">Shexy</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
    <li><a href="https://scenaristeur.github.io/spoggy-simple/">Spoggy</a></li>
    <!--    <li><a href="collapsible.html">JavaScript</a></li>-->
    </ul>
      </nav>

      <div class="container">
      <div class="section">
      <h5>Select shape to generate Form</h5>


<div id="todoDiv"   onchange="shapeChanged(event)">TODODIV</div>

</div>

<div class="section">
<h5>Select shape to generate Form</h5>

</div>
      </div>


      <!--<div class="card-panel teal lighten-2">footer</div>-->

      <footer class="page-footer teal lighten-2">
      <div class="container">
      <div class="row">
      <div class="col l6 s12">
      <h5 class="white-text">Shexy</h5>
      <p class="grey-text text-lighten-4">Shexy allows you to generate forms from linked data.</p>
      </div>
      <div class="col l4 offset-l2 s12">
      <h5 class="white-text">Links</h5>
      <ul>
      <li><a class="grey-text text-lighten-3" href="https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/">Ruben's blog post about shapes</a></li>
      <li><a class="grey-text text-lighten-3" href="https://forum.solidproject.org/t/im-too-shexy-for-my-pod-experiments-on-shapes-to-forms/2027/15">Latest News on Forum : <i>I'm too shexy for my POD</i></a></li>
      <li><a class="grey-text text-lighten-3" href="https://scenaristeur.github.io/spoggy-simple/">Spoggy</a></li>
      <li><a class="grey-text text-lighten-3" href="https://github.com/scenaristeur/spoggy-simple/tree/master/shexy/shexy-lit">Source Code</a></li>
      </ul>
      </div>
      </div>
      </div>
      <div class="footer-copyright">
      <div class="container">
      © 2019 Smag0
      <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
      </div>
      </footer>
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
