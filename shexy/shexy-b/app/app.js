//
import {hyper} from 'http://unpkg.com/hyperhtml?module';
import './my-ce.js'
/*import '/node_modules/hyperhtml/index.js';
const {hyper} = hyperHTML;*/
class FirstComponent extends hyper.Component {
  // it's important to always return the result
  render(){ return this.html
    `<span>first ${Math.random()}</span>
    <div class="form-group">
     <label for="exampleFormControlSelect1">Example select</label>
     <select class="form-control" id="exampleFormControlSelect1">
       <option>1</option>
       <option>2</option>
       <option>3</option>
       <option>4</option>
       <option>5</option>
     </select>
   </div>
h
<my-ce></my-ce>
n
   `
  }
}

class SecondComponent extends hyper.Component {
  render(){ return this.html
    `<span>second ${Math.random()}</span>
    <div class="alert alert-primary" role="alert">
      This is a primary alert—check it out!
    </div>
    <div class="alert alert-secondary" role="alert">
      This is a secondary alert—check it out!
    </div>`
  }
}

class CombinedComponent extends hyper.Component {
  constructor() {
    super();
    this.first = new FirstComponent;
    this.second = new SecondComponent;
  }
  render(){ return this.html
    `<p>hi, this is ${this.first} and ${this.second}<p>
    `
  }
}

hyper(document.body)
  `${new CombinedComponent}`;
