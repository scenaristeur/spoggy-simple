import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexyFormatter extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      shape: {type: Object} ,
      data: {type: Object}
    }
  }

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <p>Shape : ${this.shape.url}</p>
    <p>Data:
    ${Object.keys(this.data).map(item =>
      html`<span>${item}: ${this.data[item]}&nbsp;</span>`)}
      </p>
      <div class="card-panel teal lighten-2">shexy formatter</div>
      `;
    }


    shouldUpdate(changedProperties) {
      changedProperties.forEach((oldValue, propName) => {
        console.log(`${propName} changed. oldValue: ${oldValue}`);
      });
      if (changedProperties.has('data')){
        this.processData()
      }
      return  changedProperties.has('data');
    }

    processData(){
      console.log(this.data)
      var ttlFile  = {}
      var ttlString = "@prefix : <https://holacratie.solid.community/public/> .\n"
      +  "@prefix owl: <http://www.w3.org/2002/07/owl#> .\n"
      +  "@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n"
      +  "@prefix xml: <http://www.w3.org/XML/1998/namespace> .\n"
      +  "@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .\n"
      +  "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n"
      +  "@base <https://holacratie.solid.community/public/> .\n\n\n";


      for (let [shape, data] of Object.entries(this.data)) {
        console.log(shape, data);

        //  console.log(this.formData)
        //  console.log("id" , this.shape.url)
        var id = shape
        /*  this.formData[id].forEach(function(enreg){
        if (enreg.submitted == undefined) {*/
        console.log("newfile ttl")
        var randomName = '_' + Math.random().toString(36).substr(2, 9);
        var filename = randomName
        //  var ttlString = app.ttlBase

        for (let [predicate, object] of Object.entries(data.form)) {
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

        /*if (app.anonyme == false){
        ttlString  += "# by "+this.shadowRoot.getElementById("solid-session").textContent+"\n";
      }*/
      console.log(ttlString)
      ttlFile = { filename: filename , content: ttlString}

      console.log("TTLFILE",ttlFile)
      //  enreg.submitted = filename
      //ttl.push({ filename: filename , content: ttlString})
      //  app.ttl = [...app.ttl, { filename: filename , content: ttlString}];
    }

    //  })
    /*console.log("new files ", newFiles)
    //return newFiles;
    this.newFiles = newFiles
    this.ttl = newFiles*/
  }






}

customElements.define('shexy-formatter', ShexyFormatter);
