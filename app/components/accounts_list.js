import { element } from 'decca'
import map from 'object-loops/map'
import reroute from '../helpers/reroute'
import buildPath from '../helpers/build_path'
import loader from '../helpers/loader'
import c from 'classnames'
import {stringify} from 'qs'

function render ({ props, context }) {
  const {balance} = props

  return loader(balance)
    || renderList(balance, context)
}

function renderList (items, ctx) {
  return <div class='accounts-list _fadein'>
    {map(items, a => <li>{renderLink(a, ctx)}</li>)}
  </div>
}

function renderLink (item, ctx) {
  const [account, balance] = item
  const parts = account.split(':')
  const label = parts[parts.length - 1]
  const depth = parts.length
  const path = buildPath({q: account}, ctx)

  return <a
    class={c('account-link', `-level-${depth}`)}
    href={path}
    onClick={reroute}>
    <span class='label'>{label}</span>
    <span class='balance'>{balance}</span>
  </a>
}

module.exports = { render }
