import route from 'riot-route'

/*
 * Bind this to onClick of links
 */

function reroute (e) {
  e.preventDefault()
  route(e.target.getAttribute('href'))
}

module.exports = reroute
