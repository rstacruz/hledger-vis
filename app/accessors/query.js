const toQuery = require('./context')

/*
 * Normalizes a context.
 */

function normalize (ctx) {
  return toString(toQuery(ctx))
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
 * Quotes a part.
 */

function quote (str) {
  if (str.match(/[ \\"]/)) {
    return JSON.stringify(str)
  } else {
    return str
  }
}

module.exports = {
  toString
}
