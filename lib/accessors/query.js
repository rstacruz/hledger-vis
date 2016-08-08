const parse = require('shell-quote').parse

/*
 * Converts a string to a query.
 *
 *     toQuery('acct:Savings')
 *     => [ {type: 'key', key: 'acct', value: 'Savings'} ]
 */

function toQuery (str, options) {
  let query = parse(str)
  return query.map(part => {
    let m
    if ((m = part.match(/^-/))) {
      return { type: 'flag', value: part }
    } else if ((m = part.match(/^((?:not:)?(?:not|acct|inacct|inacctonly|desc|amt|code|cur|date|depth|real|status|tag)):(.*?)$/))) {
      return { type: 'key', key: m[1], value: m[2] }
    } else {
      return { type: 'string', value: part }
    }
  })
}

/*
 * Converts a query to a string.
 */

function toString (query) {
  return query.map(q => {
    if (q.type === 'flag') {
      return quote(q.value)
    } else if (q.type === 'string') {
      return quote(q.value)
    } else if (q.type === 'key') {
      return q.key + ':' + quote(q.value)
    }
  }).join(' ')
}

/*
 * Normalizes a query string.
 */

function normalize (str) {
  return toString(toQuery(str))
}

/*
 * Quotes a part.
 */

function quote (str) {
  if (str.match(/[ ]/)) {
    return JSON.stringify(str)
  } else {
    return str
  }
}

module.exports = {
  normalize,
  toQuery,
  toString
}
