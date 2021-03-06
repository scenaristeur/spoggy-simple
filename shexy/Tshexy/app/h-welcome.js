
customElements.define(

'h-welcome',

class HyperWelcome extends HTMLElement {

  get html() { return this._html || (this._html = hyperHTML.bind(this)); }

  

  get user() {

    return this._user;

  }



  set user(value) {

    this._user = value;

    this.render();

  }



  render() {

    return this.html`<h1>Hello, ${this._user.name}</h1>`;

  }

}

);
