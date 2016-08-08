import { element, dom } from 'decca'
import AppRoot from './components/app_root'

var store = require('./store')()
var render = dom.createRenderer(document.getElementById('app'))

function update () {
  var state = store.getState()
  render(<AppRoot state={state} />, state)
}

store.subscribe(update)
update()
