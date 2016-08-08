import { element } from 'decca'
import map from 'lodash/map'

function render ({ props }) {
  const {accounts} = props
  return <div class='accounts-list'>
    {accounts.map(a =>
      <li>
        <a class='account-item'>
          {a}
        </a>
      </li>
    )}
  </div>
}

module.exports = { render }
