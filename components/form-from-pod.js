
    import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

    class FormFromPod extends LitElement {

      static get properties() {
        return {
          mood: {type: String}
        }
      }

      static get styles() {
        return css`.mood { color: green; }`;
      }

      render() {
        return html`FORM FROM POD are <span class="mood">${this.mood}</span>!`;
      }
    }

    customElements.define('form-from-pod', FormFromPod);
