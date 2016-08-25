import { element } from 'decca'
import map from 'object-loops/map'
import reverse from 'lodash/fp/reverse'
import loader from '../helpers/loader'

function render ({ props }) {
  const {data} = props

  return <div class='basic-component'>
    <div class='component-header'>
      <h2>Monthly report</h2>
    </div>
    {loader(data) || <List {...props} />}
  </div>
}

function List ({ props }) {
  const {data} = props
  const head = data.slice(0, 1)
  const body = data.slice(1)
  return <div class='rollup-list _fadein'>
    <table class='register-table'>
      <thead>
        {map(head, row =>
          <tr>
            {map(row, cell => <th>{cell}</th>)}
          </tr>
        )}
      </thead>
      <tbody>
        {map(body, row =>
          <tr>
            {map(row, cell => <td>{cell}</td>)}
          </tr>
        )}
      </tbody>
    </table>
  </div>
}

module.exports = { render }
