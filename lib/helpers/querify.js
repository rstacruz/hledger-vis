const parse = require('../../modules/hledger-flags').parse
const parseMany = require('../../modules/hledger-flags').parseMany
const toString = require('../../modules/hledger-flags').toString

/*
 * Normalizes an hledger query from given arguments.
 *
 *     querify('--real bal')
 *     //=> 'bal --real'
 *
 *     querify('bal', '--real Assets:Fixed')
 *     //=> 'bal --real Assets:Fixed'
 */

function querify () {
  var args = [].slice.call(arguments)
  var flags = parseMany.apply(null, args)
  return toString(flags)
}

module.exports = querify
