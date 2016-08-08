import { element, dom } from 'decca'
import AppRoot from './components/app_root'
import getMeta from './helpers/get_meta'

var store = require('./store')()
var render = dom.createRenderer(document.getElementById('app'))

function update () {
  var state = store.getState()
  render(<AppRoot state={state} />, state)
}

store.dispatch({ type: 'accounts:init', payload: getMeta('app:accounts') })

store.subscribe(update)
update()

window.Store = store
