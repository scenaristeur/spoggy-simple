import {html, render} from 'https://unpkg.com/lit-html?module';
import './shape-select.js';

// Import lit-html
//import {html, render} from 'lit-html';

// Define a template
let myTemplate = (data) => html`
  <h1>${data.title}</h1>
  <p>${data.body}</p>


  <div class="card-panel teal lighten-2">This is a card panel with a teal lighten-2 class</div>
`;





/////


const result = myTemplate({title: 'Hello', body: 'lit-html is cool'});
// Render the template to the document
render(result, document.body);
