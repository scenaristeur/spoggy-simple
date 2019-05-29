// Import stylesheets
//import './style.css';
//import { bind } from 'hyperhtml';
//import hyperHTML from 'https://unpkg.com/hyperhtml?module';


/*
TEST THYPER HTML
https://medium.com/easy-apps-with-hyperhtml/easy-apps-with-hyperhtml-1-4a56acad9327
telecharge depuis <script src="https://unpkg.com/hyperhtml@latest/min.js"></script>

intégré au HTML par
<div id="hyper"></div>
<script src="./dist/hyperhtml.min.js"></script>
            <script type="module" src="./hyper/app.js"></script>
          */

var bind = hyperHTML.bind
var wire = hyperHTML.wire;
var Component = hyperHTML.Component;


/*7*/

//https://viperhtml.js.org/hyperhtml/documentation/#components-3
class Table extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.data = [{ label: 'one', value: 1 }, { label: 'two', value: 2 }, { label: 'three', value: 3 }];
  }
  get defaultState() {
    return {
      sorted: ''
    }
  }
  onclick(e) {
    //stop the regular link behaviour
    e.preventDefault();
    //get the current link
    const link = e.target;
    //read the attribute data-target, this will tell use how to sort the ary
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    let asc = this.state.sorted === attr;
    //simple sort, reverse the sort if asc is true
    this.data.sort((a, b) => (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    //update the sorted attr
    this.setState({
      sorted: asc ? '' : attr
    });
    //no render set state will do a render
  }
  render() {
    return this.html`
    <table id="${this.props.id}" class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th><a onclick="${this}" data-target="label" href="#">Label</a></th>
          <th><a onclick="${this}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${this.data.map(obj => wire(obj) `<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
      </tbody>
    </table>
  `;
  }
}


//bind(document.body)`${new Table({id: 'myid'})}`;
bind(document.getElementById("app"))`${new Table({id: 'myid'})}`;






/*6*/
/* ne fonctionne pas
class Table {
  constructor(props) {
    this.props = props;
    this.data = [{ label: 'one', value: 1 }, { label: 'two', value: 2 }, { label: 'three', value: 3 }];
    this.html = wire(this);
  }
  state = {
    sorted: ''
  }
  handleEvent(e) {
    //stop the regular link behaviour
    e.preventDefault();
    //get the current link
    const link = e.target;
    //read the attribute data-target, this will tell use how to sort the ary
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    let asc = this.state.sorted === attr;
    //simple sort, reverse the sort if asc is true
    this.data.sort((a, b) => (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    //update the sorted attr
    this.state.sorted = asc ? '' : attr;
    //re-render
    this.render();
  }
  render() {
    return this.html`
    <table id="${this.props.id}" class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th><a onclick="${this}" data-target="label" href="#">Label</a></th>
          <th><a onclick="${this}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${this.data.map(obj => wire(obj) `<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
      </tbody>
    </table>
  `;
  }
}


const mytable = new Table({id: 'myid'});
document.body.appendChild(mytable.render());
*/


/*5*/
/*
function Table(id) {
  this.state = {
    sorted: ''
  };
  this.id = id;
  this.data = [{ label: 'one', value: 1 }, { label: 'two', value: 2 }, { label: 'three', value: 3 }];
  this.html = wire(this);
  return this.render();
}

Table.prototype.handleEvent = function (e) {
    //stop the regular link behaviour
    e.preventDefault();
    //get the current link
    const link = e.target;
    //read the attribute data-target, this will tell use how to sort the ary
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    let asc = this.state.sorted === attr;
    //simple sort, reverse the sort if asc is true
    this.data.sort((a, b) => (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    //update the sorted attr
    this.state.sorted = asc ? '' : attr;
    //re-render
    this.render();
};

Table.prototype.render = function () {
  return this.html`
    <table id="${this.id}" class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th><a onclick="${this}" data-target="label" href="#">Label</a></th>
          <th><a onclick="${this}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${this.data.map(obj => wire(obj) `<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
      </tbody>
    </table>
  `;
};

//document.body.appendChild(new Table('myid'))
document.getElementById("app").appendChild(new Table('myid'))

*/









/*4*/

/*
const Table = {
  html: bind(document.getElementById('app')),
  data: [{ label: 'one', value: 1 }, { label: 'two', value: 2 }, { label: 'three', value: 3 }],
  state: {
    sorted: ''
  },
  handleEvent(e) {
    //stop the regular link behaviour
    e.preventDefault();
    //get the current link
    const link = e.target;
    //read the attribute data-target, this will tell use how to sort the ary
    const attr = link.dataset.target;
    //check if the user clicked on the same attr
    let asc = this.state.sorted === attr;
    //simple sort, reverse the sort if asc is true
    this.data.sort((a, b) => (''+a[attr]).localeCompare(''+b[attr]) * (asc ? 1 : -1));
    //update the sorted attr
    this.state.sorted = asc ? '' : attr;
    //re-render
    this.render();
  },
  render() {
    return this.html`
    <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th><a onclick="${this}" data-target="label" href="#">Label</a></th> <!-- this = current object, not Element -->
          <th><a onclick="${this}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${this.data.map(obj => wire(obj) `<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
      </tbody>
    </table>
  `;
  }
}

Table.render();

*/


/*3*/

/*

const appEl = document.getElementById('app');
const render = bind(appEl);


const ary = [{ label: 'one', value: 1 }, { label: 'two', value: 2 }, { label: 'three', value: 3 }];

let sorted;
function sort(e) {
  //stop the regular link behaviour
  e.preventDefault();
  //get the current link
  const link = e.target;
  //read the attribute data-target, this will tell use how to sort the ary
  const attr = link.dataset.target;
  //check if the user clicked on the same attr
  let asc = sorted === attr;
  //simple sort, reverse the sort if asc is true
  ary.sort((a, b) => (''+a[attr]).localeCompare(''+b[attr]) * (asc ? -1 : 1));
  //update the sorted attr
  sorted = asc ? '' : attr;
  //re-render
  display();
}

function display() {
  render`
    <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th><a onclick="${sort}" data-target="label" href="#">Label</a></th>
          <th><a onclick="${sort}" data-target="value" href="#">Value</a></th>
        </tr>
      </thead>
      <tbody>
        ${ary.map(obj => wire(obj) `<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
      </tbody>
    </table>
  `;
}

display();
*/


          /*2*/
          /*const appEl = document.getElementById('app');
          const render = hyperHTML.bind(appEl);
          const ary = [{label: 'one', value: 1},{label: 'two', value: 2},{label: 'three', value: 3}];
          render`
            <table class="table table-striped table-bordered table-sm">
              <thead>
                <tr><th>Label</th><th>Value</th></tr>
              </thead>
              <tbody>
                ${ary.map(obj => hyperHTML.wire(obj)`<tr><td>${obj.label}</td><td>${obj.value}</td></tr>`)}
              </tbody>
            </table>
          `;*/


// Write Javascript code!

/*
1*/
/*
function tick(renderFn) {
  renderFn`
    <div>
      <h1>Hello, world!</h1>
      <h2>It is ${new Date().toLocaleTimeString()}.</h2>
    </div>
  `;
}

const appEl = document.getElementById('hyper');
const render = hyperHTML.bind(appEl);


setInterval(() => tick(render), 1000);*/
