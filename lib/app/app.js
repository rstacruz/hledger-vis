var store = require('./store')()
var h = require('decca').element

var createRenderer = require('decca').dom.createRenderer
var render = createRenderer(document.getElementById('app'))
var AppRoot = require('./components/app_root')

function update () {
  var state = store.getState()
  render(h(AppRoot, { state: state }), state)
}

store.subscribe(update)
update()
