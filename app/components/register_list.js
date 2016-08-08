import { element } from 'decca'
import map from 'lodash/map'
import reverse from 'lodash/fp/reverse'

function render ({ props }) {
  const {register} = props
  if (!register) {
    return <noscript />
  } else if (register._error) {
    return <div>Error: {register._error.message}</div>
  } else if (register._pending) {
    return <div>Loading...</div>
  } else {
    return renderList({ props })
  }
}

function renderList ({ props }) {
  const {register} = props
  const head = register.slice(0, 1)
  const body = register.slice(1)
  return <div class='register-list'>
    <table class='register-table'>
      <thead>
        {map(head, row =>
          <tr>
            {map(row, cell => <th>{cell}</th>)}
          </tr>
        )}
      </thead>
      <tbody>
        {map(reverse(body), row =>
          <tr>
            {map(row, cell => <td>{cell}</td>)}
          </tr>
        )}
      </tbody>
    </table>
  </div>
}

module.exports = { render }
