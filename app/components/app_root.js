import { element } from 'decca'
import get from 'lodash/get'
import AccountsList from './accounts_list'
import RegisterList from './register_list'
import { navigate } from '../actions'

function render ({ props, dispatch }) {
  const {state} = props

  return <div class='root-layout'>
    <div class='top main-nav'>
      <div class='center'>
        <input
          class='main-search'
          type='text'
          placeholder='Search...'
          value={get(state, 'context.q')}
          onKeydown={onKeydown(dispatch)}
          />
      </div>
    </div>
    <div class='side main-sidebar'>
      <AccountsList balance={get(state, 'balance')} />
    </div>
    <div class='body'>
      <RegisterList register={get(state, 'register')} />
    </div>
  </div>
}

/*
 * On press enter: change the current `q`
 */

function onKeydown (dispatch) {
  return e => {
    if (e.keyCode === 13) {
      e.target.blur()
      dispatch(navigate({ q: e.target.value }))
    }
  }
}

module.exports = { render }
