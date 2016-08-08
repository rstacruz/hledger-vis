var createStore = require('redux').createStore

function buildStore () {
  var store = createStore(reducer)
  return store
}

function reducer (state, action) {
  return state
}

module.exports = buildStore
