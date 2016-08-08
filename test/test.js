const test = require('tape')
const Query = require('../lib/accessors/query')
const toQuery = Query.toQuery
const normalize = Query.normalize

test('Query.toQuery', t => {
  t.deepEqual(toQuery('acct:Assets'), [
    { type: 'key', key: 'acct', value: 'Assets' }
  ])
  t.deepEqual(toQuery('Assets'), [
    { type: 'string', value: 'Assets' }
  ])
  t.deepEqual(toQuery('acct:"Assets:BDO Savings" Expenses'), [
    { type: 'key', key: 'acct', value: 'Assets:BDO Savings' },
    { type: 'string', value: 'Expenses' }
  ])
  t.end()
})

test('Query.normalize', t => {
  t.deepEqual(
    normalize('acct:Assets'),
    'acct:Assets')
  t.deepEqual(
    normalize('not:Assets'),
    'not:Assets')
  t.deepEqual(
    normalize('not:acct:Assets'),
    'not:acct:Assets')
  t.deepEqual(
    normalize('Assets'),
    'Assets')
  t.end()
})
