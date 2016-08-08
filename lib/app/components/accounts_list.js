import { element } from 'decca'
import map from 'lodash/map'

function render ({ props }) {
  const {accounts} = props
  return <div class='accounts-list'>
    {accounts.map(a =>
      <li>
        <a class='account-link' href={'/?q=' + a} onClick={reroute}>
          {a}
        </a>
      </li>
    )}
  </div>
}


import route from 'riot-route'
function reroute (e) {
  e.preventDefault()
  route(e.target.getAttribute('href'))
}

module.exports = { render }
