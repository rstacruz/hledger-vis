const hledger = require('hledger')
const resolve = require('path').resolve

/*
 * Creates a Koa server.
 */

function createServer (options) {
  const app = require('koa')()
  const router = createRouter()

  app.use(require('koa-views')(resolve(__dirname, '../views')))
  app.use(require('koa-json')({ pretty: true }))
  app.use(require('koa-static')(resolve(__dirname, '../public')))
  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}

function createRouter (options) {
  const router = require('koa-router')()

  router.get('/', function * (next) {
    yield this.render('index.jade')
  })

  router.get('/hledger', function * (next) {
    const mode = this.query.mode || 'csv'
    const query = this.query.q
    let result = yield hledger(query, { mode })
    if (this.query.table) result = hledger.tableize(result)
    this.body = result
  })

  return router
}

module.exports = createServer
