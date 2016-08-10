var test = require('tape')
var parse = require('./index').parse
var parseMany = require('./index').parseMany
var toString = require('./index').toString

test('parse', function (t) {
  var args

  args = parse('bal -f foo.journal -M --no-elide')
  t.deepEqual(args, {
    file: 'foo.journal',
    monthly: true,
    elide: false,
    command: 'balance',
    query: []
  })

  args = parse('--real bal')
  t.deepEqual(args, {
    command: 'balance',
    real: true,
    query: []
  })

  args = parse('bal Assets')
  t.deepEqual(args, {
    command: 'balance',
    query: ['Assets']
  })

  args = parse('bal --alias A=B')
  t.deepEqual(args, {
    command: 'balance',
    query: [],
    alias: ['A=B']
  })

  args = parse('bal -f foo.journal -M --no-elide')
  t.deepEqual(toString(args),
    'balance --file foo.journal --monthly --no-elide')

  args = parse('bal --file=foo.journal -M --no-elide')
  t.deepEqual(toString(args),
    'balance --file foo.journal --monthly --no-elide')

  args = parse('bal --alias X=Y --alias A=B')
  t.deepEqual(toString(args),
    'balance --alias X\\=Y --alias A\\=B')

  args = parseMany('-f file.journal', 'bal -M')
  t.deepEqual(toString(args),
    'balance --file file.journal --monthly')

  t.end()
})
