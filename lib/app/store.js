import { createStore, applyMiddleware, compose } from 'redux'
import fetch from 'isomorphic-fetch'
import set from 'lodash/set'
import thunk from 'redux-thunk'

function buildStore () {
  const middleware = [thunk]
  const enhancer = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  const store = createStore(reducify(reducers), {}, enhancer)
  return store
}

var reducers = {
  // Updates the navigation
  'navigate' (state, {query}) {
    // query == { q, base, start... }
    state = set(state, ['uri'], query)
    return state
  },

  // Bootstrap data
  'accounts:init' (state, {payload}) {
    state = set(state, ['accounts'], payload)
    return state
  },

  'fetch:start' (state, {key}) {
    state = set(state, [key], {})
    state = set(state, [key, '_pending'], true)
    return state
  },

  'fetch:done' (state, {key, payload}) {
    state = set(state, [key], payload)
    return state
  },

  'fetch:error' (state, {key, error}) {
    state = set(state, [key], {})
    state = set(state, [key, '_error'], error)
    return state
  }
}

function reducify (reducers) {
  return function (state, action) {
    var fn = reducers[action.type]
    if (!fn) return state
    return fn(state, action)
  }
}

module.exports = buildStore
