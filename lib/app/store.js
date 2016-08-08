import { createStore } from 'redux'
import set from 'lodash/set'

function buildStore () {
  var store = createStore(reducify(reducers), {})
  return store
}

var reducers = {
  'accounts:init' (state, {payload}) {
    return set(state, ['accounts'], payload)
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
