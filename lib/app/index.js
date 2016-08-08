import { element, dom } from 'decca'
import AppRoot from './components/app_root'
import getMeta from './helpers/get_meta'
import route from 'riot-route'
import { init, fetchData } from './actions'

var store = require('./store')()
global.Store = store

DOM(store)
Router(store)

store.dispatch(init())

/*
 * DOM service
 */

function DOM (store) {
  var render = dom.createRenderer(document.getElementById('app'))

  function update () {
    var state = store.getState()
    render(<AppRoot state={state} />, state)
  }

  store.subscribe(update)
  update()
}

/*
 * Router service.
 *
 * Listens to `window.location.history` and dispatches stuff.
 */

function Router (store) {
  route('/..', name => {
    const query = require('qs').parse(window.location.search.slice(1))
    store.dispatch({ type: 'navigate', query })

    // Use --related if it's an account
    // If it's not (eg, `desc:baguio`), skip it
    store.dispatch(fetchData({ q: 'reg --related ' + query.q, mode: 'csv', key: 'register' }))
  })

  route.base('/')
  route.start(true)
}
