/* This is trash, I know, sorry */

const sdate = require('s-date')

var result = []

const FROM = new Date('2012-01-01')
const TO = new Date('2013-01-01')
const DAYS = 86400 * 1000
const RESTAURANTS = [
  'KFC', 'McDonalds', 'Burger King', 'IHOP',
  'Jack\'s BBQ and Grill', 'Kanto Freestyle Breakfast',
  'Smile Elephant Thai Cuisine', 'Cafe Juanita', 'Silantro Mexican Cafe',
  'Gustoso\'s Peri-Peri', 'Poco Deli', 'Pitmaster\'s Smokehouse',
  'Eleven Tables', 'St. Patrick\'s', 'Charlie\'s Grind and Grill',
  'Wooden Spoon', 'Tomahawk Chops & Grill', 'Mad Mark\'s Creamery',
  'The Round Table'
]

push(result, {
  date: ['dates', {
    from: FROM,
    to: TO,
    interval: 31
  }],
  from: 'Income:Salary',
  to: 'Assets:Savings',
  amount: 1800.00,
  description: 'Monthly salary'
})

push(result, {
  date: ['dates', {
    from: new Date(+FROM + 12 * DAYS),
    to: TO,
    interval: 31
  }],
  from: 'Assets:Savings',
  to: 'Expenses:Rent',
  amount: 800,
  description: 'Rent payment'
})

push(result, {
  date: ['dates', {
    from: FROM,
    to: TO,
    interval: ['int', {from: 1, to: 10}]
  }],
  from: 'Assets:Cash',
  to: 'Expenses:Dining',
  amount: ['amount', {from: 10.00, to: 30.00}],
  description: ['sample', RESTAURANTS]
})

push(result, {
  date: ['dates', {
    from: FROM,
    to: TO,
    interval: ['int', {from: 5, to: 15}]
  }],
  from: 'Assets:Cash',
  to: 'Expenses:Grocery',
  amount: ['amount', {from: 30.00, to: 70.00}],
  description: ['sample', ['Walmart', 'Target']]
})

push(result, {
  date: ['dates', {
    from: new Date(+FROM + 15 * DAYS),
    to: TO,
    interval: ['int', {from: 28, to: 31}]
  }],
  from: 'Assets:Savings',
  to: 'Expenses:Power',
  amount: ['amount', {from: 50.00, to: 70.00}],
  description: 'Power bill'
})

push(result, {
  date: ['dates', {
    from: new Date(+FROM + 15 * DAYS),
    to: TO,
    interval: ['int', {from: 28, to: 31}]
  }],
  from: 'Assets:Savings',
  to: 'Expenses:Phone',
  amount: ['amount', {from: 50.00, to: 70.00}],
  description: 'Phone service'
})

push(result, {
  date: ['dates', {
    from: FROM,
    to: TO,
    interval: ['int', {from: 6, to: 12}]
  }],
  from: 'Assets:Savings',
  to: 'Assets:Cash',
  amount: ['amount', {from: 70.00, to: 150.00}],
  description: 'ATM withdrawal'
})

console.log(render(result, { currency: '$ #' }))

// ---

function render (result, options) {
  return result.map(item => {
    let lines = []
    let date = sdate('{yyyy}/{mm}/{dd}', item.date)

    lines.push(`${date} * ${item.description}`)
    lines.push(`  ${item.to}  ${curr(item.amount, options.currency)}`)
    lines.push(`  ${item.from}`)
    return lines.join('\n')
  }).join('\n\n')
}

function curr (amount, format) {
  amount = amount.toString()
  amount = amount.replace(/(\.\d\d).*$/, '$1')
  amount = amount.replace(/(\.\d)$/, '$10')
  return format.replace('#', amount)
}

function push (result, spec) {
  var dates = rand(spec.date)

  dates.forEach(date => {
    result.push({
      date: date,
      from: rand(spec.from),
      to: rand(spec.to),
      amount: rand(spec.amount),
      description: rand(spec.description)
    })
  })
}

function rand (spec) {
  if (Array.isArray(spec)) {
    var type = spec[0]
    var payload = spec[1]
    if (type === 'int') return randInt(payload)
    if (type === 'amount') return randAmount(payload)
    if (type === 'sample') return randSample(payload)
    if (type === 'dates') return randDates(payload)
  }

  return spec
}

function randDates (spec) {
  var now = +spec.from
  var result = []

  while (now < +spec.to) {
    result.push(new Date(now))
    now += rand(spec.interval) * DAYS
  }

  return result
}

function randInt (spec) {
  var range = spec.to - spec.from
  return spec.from + Math.round(range * Math.random())
}

function randAmount (spec) {
  var range = spec.to - spec.from
  return spec.from + Math.round(100 * range * Math.random()) / 100
}

function randSample (spec) {
  var n = Math.round(Math.random() * (spec.length - 1))
  return spec[n]
}
