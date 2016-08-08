import { element } from 'decca'
import map from 'lodash/map'
import reroute from '../helpers/reroute'
import c from 'classnames'
import {stringify} from 'qs'

function render ({ props }) {
  const {accounts} = props
  return <div class='accounts-list'>
    {map(accounts, a => <li>{renderLink(a)}</li>)}
  </div>
}

function renderLink (account) {
  const parts = account.split(':')
  const label = parts[parts.length - 1]
  const depth = parts.length

  return <a
    class={c('account-link', `-level-${depth}`)}
    href={'/?q=' + account}
    onClick={reroute}>
    {label}
  </a>
}



module.exports = { render }
