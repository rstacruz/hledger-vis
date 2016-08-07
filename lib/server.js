const hledger = require('hledger')
const resolve = require('path').resolve

/*
 * Creates a Koa server.
 */

function createServer (options) {
  const app = require('koa')()
  const router = createRouter()

  app.use(require('koa-views')(resolve(__dirname, '../views')))
  app.use(require('koa-static')(resolve(__dirname, '../public')))
  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}

function createRouter (options) {
  const router = require('koa-router')()

  router.get('/', function * (next) {
    const data = {
      accounts: yield hledger(['accounts'], { mode: 'list' })
    }
    yield this.render('index.jade', data)
  })

  return router
}

module.exports = createServer
