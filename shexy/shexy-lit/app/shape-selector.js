import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShapeSelector extends LitElement {
  static get properties() {
    return { name: { type: String } };
  }

  constructor() {
    super();
    this.name = 'World';
    //  this.material_init()
  }





  render() {

    const data = {title: 'Hello', body: 'lit-html is cool'};


    let selector = (data) => html`

    <h1>${data.title}</h1>
    <p>${data.body}</p>



    <!--  <div class="card-panel teal lighten-2">This is a card panel with a teal lighten-2 class</div>-->
    `;


    return html`
    <!--<link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>-->

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">SHAPE SELECTOR</div>

    ${selector(data)}

    <div class="input-field col s12">
    <select @change=${this.selectorChange}>
    <option value="" disabled selected>Choose your option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    </select>
    <label>Materialize Select</label>
    </div>

<button @click="${this.selectorChange}">click</button>
    `;

  }



  async performUpdate() {
    console.log("update 1")
    //  material_init()
    //  await new Promise((resolve) => this.material_init(() => resolve()));
    super.performUpdate();
  }

  firstUpdated(changedProperties) {
    super.firstUpdated();
    console.log(" firstUpdated")
    //  this.material_init()

    let event = new CustomEvent('my-event', {
      detail: {
        message: 'Something important happened'
      }
    });
    this.dispatchEvent(event);




  }



  selectorChange(e) {
    // console.log(e.bubbles);
  let   shapeSelected = new CustomEvent('shape-selected', {
       detail: {
         message: 'Shape selected important happened'+e.currentTarget.value+"ok"
       }
     });
      this.dispatchEvent(shapeSelected);
  }


}

customElements.define('shape-selector', ShapeSelector);
