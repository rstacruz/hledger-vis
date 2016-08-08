import { element, dom } from 'decca'
import AppRoot from './components/app_root'
import getMeta from './helpers/get_meta'
import route from 'riot-route'
import { fetchData } from './actions'

var store = require('./store')()
var render = dom.createRenderer(document.getElementById('app'))

function update () {
  var state = store.getState()
  render(<AppRoot state={state} />, state)
}

store.subscribe(update)
update()

global.Store = store

store.dispatch(fetchData({ q: 'bal --no-total', mode: 'csv', key: 'balance' }))

route('/..', name => {
  const query = require('qs').parse(window.location.search.slice(1))
  store.dispatch({ type: 'navigate', query })
  store.dispatch(fetchData({ q: 'reg ' + query.q, mode: 'csv', key: 'register' }))
})

route.base('/')
route.start(true)
