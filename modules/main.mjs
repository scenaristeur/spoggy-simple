// 📁 main.mjs
import '../dist/hyperhtml.min.js';
import {repeat, shout} from './lib.mjs';
import { Table } from './Table.js';

console.log("Table",Table)
var bind = hyperHTML.bind
var wire = hyperHTML.wire;
var Component = hyperHTML.Component;

repeat('hello');
// → 'hello hello'
shout('Modules in action');

// → 'MODULES IN ACTION!'
console.log("MAIN")
console.log(hyperHTML)
//bind(document.body)`${new Table({id: 'myid'})}`;
bind(document.getElementById("app3"))`${new Table({id: 'myid'})}`;
