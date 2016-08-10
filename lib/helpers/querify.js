const split = require('shell-quote').parse
const join = require('shell-quote').quote

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
  var args = []
  var cmd = null
  for (let i = 0, len = arguments.length; i < len; i++) {
    let argument = arguments[i]
    if (!argument) continue

    if (typeof argument === 'string') {
      argument = split(argument)
    }

    argument.forEach(arg => {
      if (!cmd && arg.substr(0, 1) !== '-') {
        cmd = arg
      } else {
        args.push(arg)
      }
    })
  }

  if (cmd) args = [cmd].concat(args)
  return join(args)
}

module.exports = querify
