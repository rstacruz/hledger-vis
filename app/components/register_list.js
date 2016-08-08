import { element } from 'decca'
import map from 'lodash/map'
import reverse from 'lodash/fp/reverse'
import loader from '../helpers/loader'

function render ({ props }) {
  const {register} = props

  return loader(register)
    || renderList({ props })
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
