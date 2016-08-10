/*
 * Converts minimist flags to a string.
 *
 *     flags = { help: true }
 *     stringifyOptions({ boolean: ['help'] }, flags)
 *     //=> '--help'
 */

function stringifyOptions (spec, flags) {
  let args = []

  spec.boolean.forEach(key => {
    if (flags[key]) args.push(`--${key}`)
  })
  spec.string.forEach(key => {
    if (flags[key]) {
      args.push(`--${key}`)
      args.push(JSON.stringify(flags[key]))
    }
  })

  return args.join(' ')
}

module.exports = stringifyOptions
