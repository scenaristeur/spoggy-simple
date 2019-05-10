var SolidAuthService = class {
  constructor() {
    this.session = {}
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
this.foo(3);
this.track();
console.log("SESSION", this.session)

  }
  getSession() {
    return this.session;
  }


  async foo(value) {
    const data = await this.bar();
    data.key = value;
    console.log(data)
    return data;
  }
  async bar() {
    console.log("bar")
    return {foo:1, bar:2}
  }

  async track() {
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
}


}
