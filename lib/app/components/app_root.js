import { element } from 'decca'
import get from 'lodash/get'
import AccountsList from './accounts_list'
import RegisterList from './register_list'

function render ({ props }) {
  const {state} = props

  return <div class='root-layout'>
    <div class='top main-nav'>
      <div class='center'>
        <input
          class='main-search'
          type='text'
          placeholder='Search...'
          value={get(state, 'context.q')}
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

module.exports = { render }
