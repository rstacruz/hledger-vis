var minimist = require('minimist')
var split = require('shell-quote').parse
var join = require('shell-quote').quote

var OPTIONS = {
  // This is actually not passed onto minimist, because minimist will just turn
  // them into `false`. Only here for reference.
  boolean: [
    'ignore-assertions',
    'cleared',
    'pending',
    'date2',
    'uncleared',
    'real',
    'cost',
    'empty',

    // bal & reg
    'historical',
    'cumulative',
    'average',
    'output-file',
    'output-format',

    // bal
    'tree',
    'elide', // no-elide
    'row-total',
    'total', // no-total
    'value'
  ],
  string: [
    'file',
    'begin',
    'end',
    'rules-file',
    'alias',
    'period',
    'depth',
  ],
  alias: {
    'aux-date': 'date2',
    'f': 'file',
    'C': 'cleared',
    'U': 'uncleared',
    'R': 'real',
    'B': 'cost',
    'E': 'empty',
    'b': 'begin',
    'e': 'end',
    'p': 'period',
    'D': 'daily',
    'W': 'weekly',
    'M': 'monthly',
    'Q': 'quarterly',
    'Y': 'yearly',

    // bal & reg
    'H': 'historical',
    'A': 'average',
    'r': 'related',
    'o': 'output-file',
    'O': 'output-format',

    // bal
    'T': 'row-total',
    'N': 'no-total',
    'V': 'value',

  },

  // Not passed to minimist, but used to array-ify certain keys
  'array': [
    'alias'
  ]
}

/*
 * Options that should be scrubbed in safe environments
 */

var UNSAFE_OPTIONS = [
  'output-file',
  'output-format',
  'file'
]

/*
 * Aliases for certain commands.
 * eg, `ledger bal` is the same as `ledger balance`
 */

var COMMAND_ALIASES = {
  'bal': 'balance',
  'reg': 'register',
  'is': 'incomestatement',
  'bs': 'balancesheet',
  'cf': 'cashflow'
}

/**
 * parse : parse(string)
 * Parses a string into a Ledger Flags object.
 *
 *     > parse('-f ledger.journal bal -M')
 *     {
 *       command: 'balance',
 *       file: 'ledger.journal',
 *       query: [],
 *       monthly: true
 *     }
 *
 * The return value is an object that always has the following fields:
 *
 * - `command` (String) - the command to be executed
 * - `query` (Array) - query to run
 *
 * All other attributes are derived from the flags.
 */

function parse (str) {
  var args = minimist(split(str), {
    string: OPTIONS.string,
    alias: OPTIONS.alias
  })

  // Remove aliases
  Object.keys(OPTIONS.alias).forEach(function (alias) {
    if (args.hasOwnProperty(alias)) delete args[alias]
  })

  // Extract `command`
  args.command = normalizeCommand(args._[0])
  args.query = args._.slice(1)
  delete args._

  // Arrayify some flags (eg, 'alias')
  OPTIONS.array.forEach(function (flag) {
    var val = args[flag]
    if (args.hasOwnProperty(flag) && !Array.isArray(val)) {
      args[flag] = [val]
    }
  })

  return args
}

/**
 * normalizeCommand : normalizeCommand(cmd)
 * Normalizes a command based on aliases.
 *
 *     > normalizeCommand('reg')
 *     'register'
 *
 *     > normalizeCommand('bal')
 *     'balance'
 */

function normalizeCommand (cmd) {
  if (COMMAND_ALIASES[cmd]) return COMMAND_ALIASES[cmd]
  return cmd
}

/**
 * toString : toString(flags)
 * Converts Ledger Flags back into string.
 *
 *     > args = parse('bal -f ledger.journal -M')
 *     > toString(args)
 *     'balance --file ledger.journal --monthly'
 */

function toString (flags) {
  var args = []

  if (flags.command) {
    args.push(flags.command)
  }

  Object.keys(flags).forEach(function (flag) {
    if (['command', 'query'].indexOf(flag) > -1) return
    var val = flags[flag]
    args = pushValue(args, flag, val)
  })

  if (flags.query) {
    args = args.concat(flags.query)
  }

  return join(args)
}

/**
 * parseMany : parseMany(strings...)
 * Parses many arguments.
 *
 *     > args = parseMany('-f ledger.journal', 'bal -M')
 *     > toString(args)
 *     'balance --file ledger.journal --monthly'
 */

function parseMany () {
  var args = []
  for (var i = 0, len = arguments.length; i < len; i++) {
    var argument = arguments[i]
    if (typeof argument === 'string') {
      args.push(argument)
    } else if (Array.isArray(argument)) {
      args.push(split(argument))
    }
  }

  return parse(args.join(' '))
}

/*
 * Internal: pushes a value into args
 */

function pushValue (args, flag, val) {
  if (val === false) {
    return args.concat(['--no-' + flag])
  }

  if (Array.isArray(val)) {
    return val.reduce(function (acc, val) {
      return pushValue(acc, flag, val)
    }, args)
  }

  if (flag.length === 1) {
    args = args.concat(['-' + flag])
  } else {
    args = args.concat(['--' + flag])
  }

  if (val !== true) {
    args = args.concat(val)
  }

  return args
}

/*
 * Exports
 */

module.exports = {
  OPTIONS: OPTIONS,
  parse: parse,
  parseMany: parseMany,
  toString: toString
}
