import {render, html} from 'http://unpkg.com/lighterhtml?module';


const Option = ({label, value, selected}) => html`
  <option value=${value} selected="${selected}" >
    ${label}
  </option>
`
const Select = (options, onChange) => html`
  <select onchange=${(e) => onChange(e.target.value)}>
    ${options.map(Option)}
  </select>
`
let showNumbers = true
let activeNumber = '2'
let activeLetter = 'a'
const numbers = ['1', '2', '3', '4']
const letters = ['a', 'b']
const toggle = () => {
  showNumbers = !showNumbers
  update()
}
const setNumber = (num) => {
  activeNumber = num
  update()
}
const setLetter = (letter) => {
  activeLetter = letter
  update()
}
const getOptions = (arr, active) => arr.map(item => ({
  label: item,
  value: item,
  selected: item === active,
}))
const SelectNumber = () => {
  const options = getOptions(numbers, activeNumber)
  return Select(options, setNumber)
}
const SelectLetter = () => {
  const options = getOptions(letters, activeLetter)
  // return  Select(options, setLetter)
  return html`<span>${Select(options, setLetter)}</span>`
}
const App = () => html`
  <button onclick=${toggle}>
    toggle
  </button>
  ${(showNumbers) ? SelectNumber() : SelectLetter()}
`
const update = () => render(document.getElementById("selectDiv"), App)
update()

let materialScript = document.createElement('script')
materialScript.setAttribute('src', 'lib/materialize/js/materialize.min.js')
document.head.appendChild(materialScript)
M.AutoInit();
console.log(M)
