'use strict'
const test = require('tape')
const querify = require('../lib/helpers/querify')

test('querify', t => {
  function run (input, output) {
    t.deepEqual(querify.apply(null, input), output, JSON.stringify(input))
  }

  run(['bal'], 'bal')
  run(['bal --real'], 'bal --real')
  run(['--real bal'], 'bal --real')
  run(['--real', 'bal'], 'bal --real')
  run(['--real', 'bal --cleared'], 'bal --real --cleared')
  run(['--real', ['bal', '--cleared']], 'bal --real --cleared')
  run(['bal', ['Expenses:Cash expenses']], "bal 'Expenses:Cash expenses'")

  t.end()
})
