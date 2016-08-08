import get from 'lodash/get'
import { stringify } from 'qs'

/**
 * Returns a new path.
 *
 *     buildPath({ q: 'hello' })
 *     //=> '/?q=hello'
 *
 *     buildPath({ q: 'hello' }, { context: { base: '--cleared' }})
 *     //=> '/?q=hello&base=cleared'
 */

function buildPath (ctx, state) {
  const current = get(state, 'context') || {}
  const newCtx = Object.assign({}, current, ctx)
  return '/?' + stringify(newCtx)
}

module.exports = buildPath
