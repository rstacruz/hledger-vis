import { element } from 'decca'
import map from 'lodash/map'

function render ({ props }) {
  const {register} = props
  if (!register) {
    return <noscript />
  } else if (register._error) {
    return <div>Error</div>
  } else if (register._pending) {
    return <div>Loading...</div>
  } else {
    return renderList({ props })
  }
}

function renderList ({ props }) {
  const {register} = props
  return <div class='register-list'>
    {register.map(a =>
      <li>
        {a}
      </li>
    )}
  </div>
}

module.exports = { render }
