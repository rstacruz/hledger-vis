import { stringify } from 'qs'
import buildPath from '../helpers/build_path'
import fetch from 'isomorphic-fetch'
import checkStatus from '../helpers/check_status'
import { toString } from '../accessors/context'
import get from 'lodash/get'
import route from 'riot-route'

/**
 * Fetches ledger data into a given key.
 *
 *     fetchData({ q: 'bal', key: 'balance' })
 */

function fetchData (options) {
  const ctx = { q: options.q }
  const query = { q: toString(ctx), mode: options.mode }
  const queryString = stringify(query)
  const uri = '/hledger?' + queryString
  const transform = options.pipe || (d => d)

  return dispatch => {
    dispatch({ type: 'fetch:start', key: options.key })

    fetch(uri)
    .then(checkStatus)
    .then(res => res.json())
    .then(transform)
    .then(data => {
      dispatch({ type: 'fetch:done', payload: data, key: options.key })
    })
    .catch(err => {
      dispatch({ type: 'fetch:error', error: err, key: options.key })
    })
  }
}

/*
 * Bootstraps needed data.
 */

function init () {
  return dispatch => {
    dispatch(fetchData({
      q: 'bal --no-total',
      mode: 'csv',
      key: 'balance',
      pipe: fixBalance
    }))
  }
}

function fixBalance (bal) {
  bal = bal.slice(1) // Remove CSV header

  // bal = bal.reduce((acc, item) => {
  //   acc.push(item)
  //   return acc
  // }, [])

  return bal
}

/*
 * Navigates to a different URL.
 * (Doesn't actually do anything in the store)
 *
 *     store.dispatch(navigate({ q: 'Assets:Cash' }))
 */

function navigate (ctx) {
  return (dispatch, getState) => {
    const path = buildPath(ctx, getState())
    route(path)
  }
}

module.exports = {
  fetchData,
  init,
  navigate
}
