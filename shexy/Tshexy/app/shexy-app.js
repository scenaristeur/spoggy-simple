import './my-component.js'
import './counter.js'
import './todo.js'
import './my-ce.js'
import './h-welcome.js'
import './select.js'
import './material-lite-menu.js'
//import './my-link.js'


class ShexyApp extends HTMLElement {
  static get observedAttributes() { return ['name']; }
  constructor(...args) {
    super(...args);
    this.html = hyperHTML.bind(this);
  }
  attributeChangedCallback() { this.render(); }
  connectedCallback() {
    // NE FONCTION QUE DANS INDEX.HTMLhyper(document.getElementById('compteur3'))`${new Counter(600)}`;

    this.render();
    hyper(document.getElementById('compteur2'))`${new Counter(152542)}`;
    hyper(document.getElementById('welcome'))`
    passing data to child<br>
    <h-welcome user=${{ name: 'Sara' }} />

    <h-welcome user=${{ name: 'Cahal' }} />

    <h-welcome user=${{ name: 'Edite' }} />
<hr>


    `;

  }
  render() {
    return this.html`
    <h1>Hello APP, ${this.getAttribute('name')}</h1>

    ------------
    <my-ce></my-ce>
    ---------

    ----------

    `;
  }



  handleEvent(event) {
    console.log(event);
  }
  onclick(event) {
    console.log(event)
  }
  change(event) {
    console.log(event)
    const {key} = event.currentTarget.dataset;
    console.log(key)
    console.log(event.currentTarget.value)
  }

}

customElements.define('shexy-app', ShexyApp);
