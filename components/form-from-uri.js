
    import {LitElement, html, css} from 'https://unpkg.com/lit-element/lit-element.js?module';

    class FormFromUri extends LitElement {

      static get properties() {
        return {
          uri: {type: String}
        }
      }

      static get styles() {
        return css`.uri { color: green; }`;
      }

      render() {
        return html`
        FORM FROM URI are <span class="uri">${this.uri}</span>!


        `;
      }
    }

    customElements.define('form-from-uri', FormFromUri);
