import { element } from 'decca'
import map from 'lodash/map'
import reroute from '../helpers/reroute'
import buildPath from '../helpers/build_path'
import c from 'classnames'
import {stringify} from 'qs'

function render ({ props, context }) {
  const {balance} = props
  if (!balance) {
    return <noscript />
  } else if (balance._error) {
    return <div>Error: {balance._error.message}</div>
  } else if (balance._pending) {
    return <div>Loading...</div>
  } else {
    return renderList(balance, context)
  }
}

function renderList (balance, ctx) {
  const items = balance.slice(1)

  return <div class='accounts-list'>
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
