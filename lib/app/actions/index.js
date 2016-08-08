import { stringify } from 'qs'
import fetch from 'isomorphic-fetch'
import checkStatus from '../helpers/check_status'

/*
 * Fetches data.
 */

function fetchData (options) {
  const query = { q: options.q, mode: options.mode }
  const queryString = stringify(query)
  const uri = '/hledger?' + queryString

  return dispatch => {
    dispatch({ type: 'fetch:start', key: options.key })

    fetch(uri)
    .then(checkStatus)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'fetch:done', payload: data, key: options.key })
    })
    .catch(err => {
      dispatch({ type: 'fetch:error', error: err, key: options.key })
    })
  }
}

module.exports = { fetchData }
