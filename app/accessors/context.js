const parse = require('shell-quote').parse
const Query = require('./query')

/*
 * Converts a context to a query.
 *
 *     toQuery({q: 'acct:Savings'})
 *     => [ {type: 'key', key: 'acct', value: 'Savings'} ]
 */

function toQuery (ctx) {
  let parts = []
  if (ctx && ctx.base) parts.push(ctx.base)
  if (ctx && ctx.scope) parts.push(ctx.scope)
  if (ctx && ctx.q) parts.push(ctx.q)

  const str = parts.join(' ')
  const query = parse(str)

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
 * Converts a context to a string.
 */

function toString (ctx) {
  return Query.toString(toQuery(ctx))
}

module.exports = {
  toQuery,
  toString
}
