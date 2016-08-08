/*
 * Returns the value of a meta tag
 */

function getMeta (name) {
  const el = document.querySelector(`meta[name="${name}"]`)
  if (!el) return

  const content = el.getAttribute('content')
  if (!content) return

  try {
    return JSON.parse(content)
  } catch (e) {
    return content
  }
}

module.exports = getMeta
