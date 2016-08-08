const test = require('tape')
const Context = require('../app/accessors/context')
const toQuery = Context.toQuery
const toString = Context.toString

test('Context.toQuery', t => {
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

test('Context.toString', t => {
  t.deepEqual(
    toString({q: 'acct:Assets'}),
    'acct:Assets')
  t.deepEqual(
    toString({q: 'not:Assets'}),
    'not:Assets')
  t.deepEqual(
    toString({q: 'not:acct:Assets'}),
    'not:acct:Assets')
  t.deepEqual(
    toString({q: 'Assets'}),
    'Assets')
  t.end()
})
