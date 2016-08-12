import { parse } from 'qs'
import route from 'riot-route'
import { init, fetchData } from '../actions'

/*
 * Router service.
 *
 * Listens to `window.location.history` and dispatches stuff.
 */

function Router (store) {
  route('/..', name => {
    const query = parse(window.location.search.slice(1))
    store.dispatch({ type: 'navigate', query })

    // Use `reg --related` if it's an account
    // If it's not (eg, `desc:baguio`), use `print`
    store.dispatch(fetchData({
      q: 'register --related ' + (query.q || ''),
      mode: 'csv',
      key: 'register'
    }))

    // Rollup overview
    store.dispatch(fetchData({
      q: 'balance --tree --no-elide --average --monthly ' + (query.q || ''),
      mode: 'csv',
      key: 'rollup'
    }))
  })

  route.base('/')
  route.start(true)
}

module.exports = Router
