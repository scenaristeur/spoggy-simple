import {render, html} from 'https://unpkg.com/lighterhtml?module';

document.body.appendChild(
  // as unkeyed one-off content, right away 🎉
  html`<strong>any</strong> one-off content!<div/>`
);

// as automatically rendered wired content 🤯
todo(document.getElementById("todoDiv"));
function todo(node, items = []) {
  render(node, () => html`
  <ul>${items.map((what, i) => html`
    <li data-i=${i} onclick=${remove}> ${what} </li>
    `)}
    <button onclick=${add}> add </button>
    </ul>




    <div class="input-field col s12">
    <select data-key=yup  onchange=${change} >
    <optgroup label="team 1">
    <option value="option1">CHANGE TO FIRE CUSTOM EVENT TO INDEX</option>
    <option value="option2">Option 2</option>
    </optgroup>
    <optgroup label="team 2">
    <option value="option31">Option 3</option>
    <option value="option4">Option 4</option>
    </optgroup>
    </select>
    <label>Optgroups TOTO</label>
    </div>


    `);
    function add() {
      items.push(prompt('do'));
      todo(node, items);
    }
    function remove(e) {
      items.splice(e.currentTarget.dataset.i, 1);
      todo(node, items);
    }

    let materialScript = document.createElement('script')
    materialScript.setAttribute('src', 'lib/materialize/js/materialize.min.js')
    document.head.appendChild(materialScript)
    M.AutoInit();
    console.log(M)

    /*  function handleEvent(event) {
    console.log(event);
  }
  function onclick(event) {
  console.log(event)
}*/
function change(event) {
  console.log(event)
  const {key} = event.currentTarget.dataset;
  console.log(key)
  console.log(event.currentTarget.value)

  let   shapeSelected = new CustomEvent('shape-selected', {
    detail: {
      shapeUrl: event.currentTarget.value
  //  shapeUrl: "ola"
    },
    bubbles: true
  });
  this.dispatchEvent(shapeSelected);
  //this.shapeUrl = e.currentTarget.value
}
function onchange(event) {
  console.log(event)
}

function onselect(event) {
  console.log(event)
}
function handleEvent(event) {
  console.log(event)
  this[`on${event.type}`](event);
}
function onclick(event) {
  console.log(event)
  event.preventDefault();
  const {key} = event.currentTarget.dataset;
  this.state[key]++;
  this.render();
}

}
