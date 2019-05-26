// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import { TestAgent } from './agents/TestAgent.js';

// Extend the LitElement base class
class MyAgent extends LitElement {

  /**
  * Implement `render` to define a template for your element.
  *
  * You must provide an implementation of `render` for any element
  * that uses LitElement as a base class.
  */
  render(){
    /**
    * `render` must return a lit-html `TemplateResult`.
    *
    * To create a `TemplateResult`, tag a JavaScript template literal
    * with the `html` helper function:
    */
    var testAgent = new TestAgent('testAgent');
    console.log(testAgent)
    testAgent.send('historiqueAgent', 'Prêt!');
    return html`
    <!-- template content -->
    <p>A paragraph in my agent</p>
    `;
  }

}
// Register the new element with the browser.
customElements.define('my-agent', MyAgent);
