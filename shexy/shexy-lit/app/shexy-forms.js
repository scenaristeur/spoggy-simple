import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexyForms extends LitElement {
  static get properties() {
    return {
      schema: { type: String      ,
        hasChanged(newVal, oldVal) {
          console.log(newVal, oldVal)
        }
      }
    };
  }

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">shexy forms</div>
    `;
  }

  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    return changedProperties.has('schema');
  }
  /*
  var shapes = this.schema.shapes;
  var start = this.schema.start;
  console.log("START",start)
  for (let [url, constraint] of Object.entries(shapes)) {
  console.log(url)
  //  Shape(url,constraint)
}*/
}

customElements.define('shexy-forms', ShexyForms);
