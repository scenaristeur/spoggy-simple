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




// Write Javascript code!
const appEl = document.getElementById('hyper');
const render = hyperHTML.bind(appEl);

render`<div>hyperdfHTML FTW</div>`
