/*
 * Ensures that `fetch()` returns a 2xx or 3xx.
 */

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var err = new Error(res.statusText)
    err.response = res
    throw err
  }
}

module.exports = checkStatus
