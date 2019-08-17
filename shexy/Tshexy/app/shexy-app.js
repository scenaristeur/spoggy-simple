import './my-component.js'
import './counter.js'
import './todo.js'
import './my-ce.js'
import './h-welcome.js'
//import './select.js'
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
<div class="input-field col s12">
<select data-key=yup  onchange=${change} >
<optgroup label="team 1">
<option value="option1">CHANGE TO FIRE CUSTOM EVENT TO INDEX</option>
<option value="option2">Option 2</option>
</optgroup>
<optgroup label="team 2">
<option value="option31">Option 3</option>
<option value="option4">Option 4</option>
</optgroup>
</select>
<label>OSELECT in SHEXY-APP</label>
</div>

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
