import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';
import 'https://unpkg.com/@polymer/paper-button/paper-button.js?module';
import  './shexy-solid.js'

class ShexyFormatter extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shape: { type: Object},
      formData: {type: Object  /*   ,
        hasChanged(newVal, oldVal) {
        console.log("DATAAAAAAAAAAAAAAAAAAAAAAAA",newVal, oldVal)
      }
      */},
      ttlBase: {type: String},
      anonyme: {type: Boolean},
      ttl: {type: Array},
      prop4: {type: Array},
      prop5: {type: Object}

    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.shape = {url:"testurl"};
    this.formData = {url:"testurl"};
    this.anonyme = true
    this.ttl = [];
    this.ttlBase = "@prefix : <https://holacratie.solid.community/public/> .\n"
    +  "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n"
    +  "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n"
    +  "@prefix xml: <http://www.w3.org/XML/1998/namespace> .\n"
    +  "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n"
    +  "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n"
    +  "@base <https://holacratie.solid.community/public/> .\n\n\n";
    this.prop4 = ['one','two'];
    this.prop5 = {id:'pop',swing:'flok'}

  }

  render() {
    return html`
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <div class="card-panel teal lighten-2">Shexy Formatter of ${this.shape.url}</div>


    json0 : ${JSON.stringify(this.formData)}

    <paper-button
    id="jsonBtn"
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.submitForm()}"
    raised
    disabled>
    <i class="material-icons left">file_download</i>
    json data
    </paper-button>
    <paper-button
    id="ttlBtn"
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.submitForm()}"
    raised
    disabled>
    <i class="material-icons left">file_download</i>
    ttl data
    </paper-button>



    <paper-button
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.displayForm(this.shape.url+"_Footprint")}"
    disabled
    raised >
    Verify ${this.localName(this.shape.url+"_Footprint")}
    <i class="material-icons right">keyboard_arrow_right</i>
    </paper-button>

    <paper-button
    id="extraBtn"
    class="waves-effect waves-light btn-small modal-trigger"
    type="submit"
    @click="${(e) =>this.submitForm()}"
    raised
    disabled>
    add extra data : context, location, mood, personnal field...
    <i class="material-icons right">keyboard_arrow_right</i>
    </paper-button>


    <paper-button @click="${(e) =>this.add()}"
    raised>Add</paper-button>


    <shexy-solid
    .ttl=${this.ttl}
    .shape=${this.shape}
    prop1="test prop1"
    prop2="8"
    prop3="true"
    .prop4="${this.prop4}"
    .prop5="${this.prop5}">
    </shexy-solid>


    `;
  }
  add(){
    console.log("prop4",this.prop4)
    console.log("prop5",this.prop5)
    var randy = "miok"
    const d = new Date();
    var now = d.toUTCString()+"\n";
    this.prop4 = [...this.prop4, now];
    this.prop5 = Object.assign({}, this.prop5, {[now]: randy});
    console.log("prop4",this.prop4)
    console.log("prop5",this.prop5)
  }

  shouldUpdate(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });
    if (changedProperties.has('formData')){
      this.processsformString()
    }
    return changedProperties.has('schema') || changedProperties.has('currentShape') || changedProperties.has('ttl') || changedProperties.has('formData') || changedProperties.has('prop4')  || changedProperties.has('prop5');
  }

  localName(uri){
    var ln = uri;
    if (uri.lastIndexOf("#") != -1) {
      ln = uri.substr(uri.lastIndexOf("#")).substr(1)
    }else{
      ln = uri.substr(uri.lastIndexOf("/")).substr(1)
    }
    return ln
  }

  processsformString(){
    var app = this
    var ttl = []
    //  jsonData = JSON.parse(this.formData)
    console.log(this.formData)
    console.log("id" , this.shape.url)
    var id = this.shape.url
    this.formData[id].forEach(function(enreg){
      if (enreg.submitted == undefined) {
        console.log("newfile ttl")
        var randomName = '_' + Math.random().toString(36).substr(2, 9);
        var filename = randomName
        var ttlString = app.ttlBase

        for (let [predicate, object] of Object.entries(enreg)) {
          if( object.value.length > 0){
            if ((predicate == "http://schema.org/name") &&  (object.value.length > 0)){
              var underName  = object.value.split(' ').join('_');
              filename = underName;
            }
            console.log(predicate, object);
            ttlString += '<>  <'+predicate+'>  "'+object.value+'".  # Format :'+object.type+ " "+object.format+ "\n";
          }
        }

        const d = new Date();
        var now = d.toUTCString()+"\n";

        ttlString  += "\n\n# shexy made with "+id+"\n";
        ttlString  += "# from "+location.protocol + '//' + location.host + location.pathname+"\n";
        ttlString += "# at "+now

        if (app.anonyme == false){
          ttlString  += "# by "+this.shadowRoot.getElementById("solid-session").textContent+"\n";
        }
        console.log(ttlString)
        enreg.submitted = filename
        //ttl.push({ filename: filename , content: ttlString})
        app.ttl = [...app.ttl, { filename: filename , content: ttlString}];
      }

    })
    /*console.log("new files ", newFiles)
    //return newFiles;
    this.newFiles = newFiles
    this.ttl = newFiles*/
  }


}

customElements.define('shexy-formatter', ShexyFormatter);
