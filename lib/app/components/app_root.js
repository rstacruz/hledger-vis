import { element } from 'decca'
import get from 'lodash/get'
import AccountsList from './accounts_list'

function render ({ props }) {
  return <div class='root-layout'>
    <div class='top main-head'>
      <div class='center'>
        Ledger
      </div>
    </div>
    <div class='side main-sidebar'>
      <AccountsList accounts={props.state.accounts} />
    </div>
    <div class='body'>
    </div>
  </div>
}

module.exports = { render }
