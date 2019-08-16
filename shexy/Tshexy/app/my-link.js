
import  '/node_modules/hyperhtml/index.js'
const {hyper} = hyperHTML;

class MyLink extends HyperHTMLElement {
  created() { this.render(); }
  render() {
    return this.html`hello there!`;
  }
}
MyLink.define('my-link', {extends: 'a'});
