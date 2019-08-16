//import '/my-link.js';
//import '/my-element.js'

class MyComponent extends HTMLElement {
  static get observedAttributes() { return ['name']; }
  constructor(...args) {
    super(...args);
    this.html = hyperHTML.bind(this);
  }
  attributeChangedCallback() { this.render(); }
  connectedCallback() { this.render(); }
  render() {
    return this.html`
    <h1>Hello, ${this.getAttribute('name')}</h1>

    `;
  }
}

customElements.define('my-component', MyComponent);
