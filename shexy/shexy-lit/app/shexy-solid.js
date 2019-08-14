import { LitElement, html, property, customElement }  from 'https://unpkg.com/lit-element?module';


class ShexySolid extends LitElement {
  static get properties() {
    return { name: { type: String },
    ttl: { type: Object} };
  }

  constructor() {
    super();
    this.name = 'World';
      this.fileClient = SolidFileClient;
  }

  render() {
    return html`
    <link type="text/css" rel="stylesheet" href="css/materialize.min.css"  media="screen,projection"/>

    <p>Hello, ${this.name}!</p>
    <p>Shape : ${this.ttl.shape.url}</p>
    <p>Data:
    ${Object.keys(this.ttl).map(item =>
      html`<span>
      ${item}: ${this.ttl[item]}&nbsp;<br>

      </span>`)}
      </p>
      <div class="card-panel teal lighten-2">shexy solid</div>
      `;
    }




    shouldUpdate(changedProperties) {
      changedProperties.forEach((oldValue, propName) => {
        console.log(`${propName} changed. oldValue: ${oldValue}`);
      });
      if (changedProperties.has('ttl')){
        this.processsTtl()
      }
      return changedProperties.has('schema') || changedProperties.has('currentShape') || changedProperties.has('ttl') || changedProperties.has('formData') || changedProperties.has('prop4')  || changedProperties.has('prop5');
    }

    processsTtl(){
      console.log("TTL",this.ttl)
      this.solidCheckSession()
    }


    solidCheckSession(){
      // todo move display of elements in ui.js !!
  //    var not_loggedElements = document.querySelectorAll(".not_logged")
  //    var loggedElements =  document.querySelectorAll(".logged")
  //    var sessionDiv =  document.getElementById("solid-session")

      this.fileClient.checkSession().then(
        session => {
          console.log("Logged in as "+session.webId)
        /*  var logged = "Logged in as "+session.webId
          log(logged)
          //  console.log(loginElements)
          not_loggedElements.forEach(function(e){
            e.style.display = "none"
          })
          loggedElements.forEach(function(e){
            e.style.display = "block"
          })
          sessionDiv.innerHTML = session.webId*/
          this.makeFile()
        },
        err => {
          //  console.log(err)
          console.log( "Aucune session Solid")
        /*  not_loggedElements.forEach(function(e){
            e.style.display = "block"
          })
          loggedElements.forEach(function(e){
            e.style.display = "none"
          })
          sessionDiv.innerHTML = "Login to send data to a Solid POD"*/
          //  alert("")
          this.login();
          return false;
        }
      );
    }


    login(){
      this.fileClient.popupLogin().then( webId => {
        console.log( `Logged in as ${webId}.`)
          this.makeFile()
      }, err => {
        console.log(err)
        alert("erreur : ",err)
      }
    );
    }

     logout(){
      this.fileClient.logout().then( out =>
        {
          console.log("OUT",out)
          console.log( `Bye now!` )

        }
      );
    }



    makeFile(){
console.log("TODO get footprint")
/*var footprint = this.ttl.footprint

      var root = footprint["https://footprint.solid.community/public/root"].value || "https://holacratie.solid.community/public/";
      var path = footprint["https://footprint.solid.community/public/path"].value ||  this.localName(this.ttl.shape.url)
      console.log("PATH",path)


      var url = root+path+"/"+this.ttl.filename;*/
var fileUrl = this.ttl.shape.url+"/"+this.ttl.filename
console.log(fileUrl)

      this.fileClient.createFile(fileUrl, this.ttl.content, "text/turtle").then( fileCreated => {
      /*  result.status = "created"
        result.file = fileCreated
        updateResult(result)*/
        console.log(`Created file ${fileCreated}.`);
      //  log (fileCreated, "Created file")
      },
      err => {
        //  result.status = "erreur"
      //  updateResult(result)
        console.log(err);
        //  alert("erreur ")
      //  log(err, "ERROR : file create")
      }
    );
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






  }

  customElements.define('shexy-solid', ShexySolid);
