var SolidAuthService = class {
  constructor() {
    this.session = {};

    var auth = this;

this.trackSession();
  }
  getSession() {
    return this.session;
  }
trackSession(){

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        this.session.webId = "blop";
        console.log("s",this.session)
      }else{
        console.log(`The user is ${session.webId}`)
        this.session = session;
      }

    })
      console.log("sess",this.session)
  }

}
