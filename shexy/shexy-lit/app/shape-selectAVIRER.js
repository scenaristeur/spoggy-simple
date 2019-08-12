import {html, render} from 'https://unpkg.com/lit-html?module';


let selector = (data) => html`

<h1>${data.title}</h1>
<p>${data.body}</p>

<div class="input-field col s12">
  <select>
    <option value="" disabled selected>Choose your option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
  <label>Materialize Select</label>
</div>

  <div class="card-panel teal lighten-2">This is a card panel with a teal lighten-2 class</div>
`;

var options = ["one", "two"]
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
  console.log(instances)
});


const result = selector({title: 'Hello', body: 'lit-html is cool'});
// Render the template to the document
render(result, document.body);
