import { element, dom } from 'decca'
import AppRoot from './components/app_root'
import Router from './services/router'
import { init } from './actions'

/*
 * Fire up the store and start the services
 */

var store = require('./store')()
global.Store = store

DOM(store)
Router(store)

store.dispatch(init())

/*
 * DOM service:
 * listens to the store and updates the DOM via decca
 */

function DOM (store) {
  var render = dom.createRenderer(document.getElementById('app'), store.dispatch)

  function update () {
    var state = store.getState()
    render(<AppRoot state={state} />, state)
  }

  store.subscribe(update)
  update()
}
