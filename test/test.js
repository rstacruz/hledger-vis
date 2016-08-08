const test = require('tape')
const Query = require('../app/accessors/query')
const toQuery = Query.toQuery
const normalize = Query.normalize

test('Query.toQuery', t => {
  t.deepEqual(toQuery({q: 'acct:Assets'}), [
    { type: 'key', key: 'acct', value: 'Assets' }
  ])
  t.deepEqual(toQuery({q: 'Assets'}), [
    { type: 'string', value: 'Assets' }
  ])
  t.deepEqual(toQuery({q: 'acct:"Assets:BDO Savings" Expenses'}), [
    { type: 'key', key: 'acct', value: 'Assets:BDO Savings' },
    { type: 'string', value: 'Expenses' }
  ])
  t.end()
})

test('Query.normalize', t => {
  t.deepEqual(
    normalize({q: 'acct:Assets'}),
    'acct:Assets')
  t.deepEqual(
    normalize({q: 'not:Assets'}),
    'not:Assets')
  t.deepEqual(
    normalize({q: 'not:acct:Assets'}),
    'not:acct:Assets')
  t.deepEqual(
    normalize({q: 'Assets'}),
    'Assets')
  t.end()
})
