import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexySolid extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      ttl: {type: Array},
      shape: { type:Object},
      prop1: { type: String, reflect: true },
      prop2: { type: Number, reflect: true },
      prop3: { type: Boolean, reflect: true },
      prop4: { type: Array, reflect: true },
      prop5: { type: Object, reflect: true }
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.ttl = [1,2,3];
    this.shape = {}
    this.prop1 = '';
    this.prop2 = 0;
    this.prop3 = false;
    this.prop4 = [];
    this.prop5 = {id:'swing',id:'fantadiano'};

  }



  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>prop4: ${this.prop4.map((item, index) =>
      html`<span>[${index}]:${item}&nbsp;${item.filename}<br>
      ${item.content}
      </span>`)}
      </p>


      <p>Hello, ${this.name}!</p>
      <div class="card-panel teal lighten-2">Shexy Solid<br>
      ${this.prop4.map(i => html`i Array:${i}`)}
      <p>prop5:
      ${Object.keys(this.prop5).map(item =>
        html`<span>${item}: item : ${this.prop5[item]}&nbsp;</span>`)}
        </p>


        ${this.ttl.length} files TTL
        <p>TTL: ${this.ttl.map((item, index) =>
          html`<span>[${index}]:${item}&nbsp;<br>
          ${item.filename}<br>
          ${item.content}

          </span>`)}
          </p>
          <p>prop1 ${this.prop1}</p>
          <p>prop2 ${this.prop2}</p>
          <p>prop3 ${this.prop3}</p>

          <p>prop4: ${this.prop4.map((item, index) =>
            html`<span>[${index}]:${item}&nbsp;</span>`)}
            </p>

            <p>prop5:
            ${Object.keys(this.prop5).map(item =>
              html`<span>${item}: ${this.prop5[item]}&nbsp;</span>`)}
              </p>

              <button @click="${this.changeProperties}">change properties</button>
              <button @click="${this.changeAttributes}">change attributes</button>

              </div>
              `;
            }


            attributeChangedCallback(name, oldval, newval) {
              console.log('attribute change: ', name, newval);
              super.attributeChangedCallback(name, oldval, newval);
            }


            shouldUpdate(changedProperties) {
              changedProperties.forEach((oldValue, propName) => {
                console.log(`${propName} changed. oldValue: ${oldValue}`);
              });
              if ((changedProperties.has('prop4')) || (changedProperties.has('prop5'))|| (changedProperties.has('ttl'))){
                this.processsnewFiles()
              }
              return changedProperties.has('ttl') || changedProperties.has('shape')  || changedProperties.has('prop4')  || changedProperties.has('prop5')
            }


            processsnewFiles(){
              console.log("SOLID prop4",this.prop4)
              console.log("SOLID prop5",this.prop5)
              console.log("SHAPE",this.shape)
              console.log("SOLID TTL",this.ttl)
              this.ttl.forEach(function (f){
                console.log(f)
              //  this.sendData(id, f)
              })
            }


            changeAttributes() {
              let randy = Math.floor(Math.random()*10);
              let myBool = this.getAttribute('prop3');

              this.setAttribute('prop1', randy.toString);
              this.setAttribute('prop2', randy.toString);
              this.setAttribute('prop3', myBool? '' : null);
              this.setAttribute('prop4', JSON.stringify([...this.prop4, randy]));
              this.setAttribute('prop5',
              JSON.stringify(Object.assign({}, this.prop5, {[randy]: randy})));
              this.requestUpdate();
            }

            changeProperties() {
              let randy = Math.floor(Math.random()*10);
              let myBool = this.prop3;

              this.prop1 = randy.toString();
              this.prop2 = randy;
              this.prop3 = !myBool;
              this.prop4 = [...this.prop4, randy];
              this.prop5 = Object.assign({}, this.prop5, {[randy]: randy});
            }

            updated(changedProperties) {
              changedProperties.forEach((oldValue, propName) => {
                console.log(`${propName} changed. oldValue: ${oldValue}`);
              });
            }
          }

          customElements.define('shexy-solid', ShexySolid);
