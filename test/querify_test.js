'use strict'
const test = require('tape')
const querify = require('../lib/helpers/querify')

test('querify', t => {
  function run (input, output) {
    t.deepEqual(querify.apply(null, input), output, JSON.stringify(input))
  }

  run(['bal'], 'balance')
  run(['bal --real'], 'balance --real')
  run(['--real bal'], 'balance --real')
  run(['--real', 'bal'], 'balance --real')
  run(['--real', 'bal --cleared'], 'balance --real --cleared')
  // run(['--real', ['bal', '--cleared']], 'balance --real --cleared')
  // run(['bal', ['Expenses:Cash expenses']], "balance 'Expenses:Cash expenses'")

  t.end()
})
