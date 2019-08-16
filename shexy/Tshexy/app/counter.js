const {hyper} = hyperHTML;
// cette methode ne semble pas integrer materialize js
class Counter extends hyper.Component {
  get defaultState() {
    return {css: 'font-weight:bold;', count: 0};
  }
  constructor(count) {
    super();
    this.setState({count});


  }
  onclick() {
    this.setState(prev => ({count: prev.count + 1}));
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'lib/materialize/js/materialize.min.js')
    document.head.appendChild(recaptchaScript)
    M.AutoInit();
    console.log(M)
  }

    created() {
      // triggers automatically attributeChangedCallback
      this.key = 'value';
      console.log("key",this.key)
    }


  onconnected() {
    super.onconnected()
    console.log('finally live');
    console.log('before');
    this.wait(1000);  //7 seconds in milliseconds
    console.log('after');
  /*  let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'lib/materialize/js/materialize.min.js')
    document.head.appendChild(recaptchaScript)
    console.log('M loaded');
    M.AutoInit();
    console.log(M)*/


  }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }
  render() {
    return this.html`
    <button style=${this.state.css} onclick=${this}>
    ${this.state.count}
    </button>

    <div class="input-field col s12">
    <select>
    <optgroup label="team 1">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    </optgroup>
    <optgroup label="team 2">
    <option value="3">Option 3</option>
    <option value="4">Option 4</option>
    </optgroup>
    </select>
    <label>Optgroups ${this.state.count}</label>
    </div>


    `;
  }
}
