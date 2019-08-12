import {html, render} from 'https://unpkg.com/lit-html?module';

// Import lit-html
//import {html, render} from 'lit-html';

// Define a template
const myTemplate = (name) => html`<p>Hello ${name}</p>`;

// Render the template to the document
render(myTemplate('World'), document.body);
