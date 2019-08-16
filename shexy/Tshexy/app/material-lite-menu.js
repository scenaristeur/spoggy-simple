import {render, html} from 'http://unpkg.com/lighterhtml?module';


const toggle = () => {

  update()
}

const show = (e) =>{
  console.log(e.currentTarget.dataset.i)
}

const App = () => html`


<button id="menu-speed" class="mdl-button mdl-js-button mdl-button--icon">
<i class="material-icons">more_vert</i>
</button>


<ul class="mdl-menu mdl-js-menu" for="menu-speed">
<li class="mdl-menu__item" data-i="one" onclick=${show}>Fast</li>
<li class="mdl-menu__item" data-i="two" onclick=${show}>Medium</li>
<li class="mdl-menu__item" data-i="tri" onclick=${show}>Slow</li>
</ul>

<!-- Mini FAB button -->
<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
<i class="material-icons" data-i="btn two" onclick=${show}>add</i>
</button>
<!-- Colored mini FAB button -->
<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored">
<i class="material-icons" data-i="btn one" onclick=${show}>add</i>
</button>

<button onclick=${toggle}>
update
</button>

`
// add dynamic btn
var button2 = document.createElement('button');
var textNode = document.createTextNode('Click M 2e!');
button2.appendChild(textNode);
button2.className = 'mdl-button mdl-js-button mdl-button--raised mdl-button--colored';
componentHandler.upgradeElement(button2);
document.getElementById('testBtnFromMenu').appendChild(button2);

const update = () => render(document.getElementById("menuDiv"), App)
update()
