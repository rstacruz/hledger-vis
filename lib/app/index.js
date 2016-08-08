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

store.dispatch({ type: 'accounts:init', payload: getMeta('app:accounts') })

store.subscribe(update)
update()

global.Store = store

route('/..', name => {
  const query = route.query()
  store.dispatch({ type: 'navigate', query })
  store.dispatch(fetchData({ q: 'reg ' + query.q, mode: 'list', key: 'register' }))
})

route.base('/')
route.start(true)
