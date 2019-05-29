//import { Table } from './Table.js';

import {Table} from './hyper/Table.js';

console.log("Table",Table)
var bind = hyperHTML.bind
var wire = hyperHTML.wire;
var Component = hyperHTML.Component;

//bind(document.body)`${new Table({id: 'myid'})}`
bind(document.getElementById("app"))`${new Table({id: 'myid'})}`;
