import { element } from 'decca'
/*
 * Returns a loading or error element if applicable.
 *
 *     loader(balance) || <BalanceSheet balance={balance} />
 */

function loader (data) {
  if (!data) {
    return <noscript />
  } else if (data._error) {
    return <div class='error-box'>Error: {data._error.message}</div>
  } else if (data._pending) {
    return <div class='loading-box'>
      <span class='spinner loading-spinner' />
      <span class='label'>Loading...</span>
    </div>
  }
}

module.exports = loader
