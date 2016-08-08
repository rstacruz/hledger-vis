import { element } from 'decca'
import get from 'lodash/get'
import AccountsList from './accounts_list'
import RegisterList from './register_list'

function render ({ props }) {
  const {state} = props

  return <div class='root-layout'>
    <div class='top main-nav'>
      <div class='center'>
        Ledger
      </div>
    </div>
    <div class='side main-sidebar'>
      <AccountsList accounts={get(state, 'accounts')} />
    </div>
    <div class='body'>
      <RegisterList register={get(state, 'register')} />
    </div>
  </div>
}

module.exports = { render }
