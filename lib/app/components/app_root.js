import { element } from 'decca'

function render () {
  return <div class='root-layout'>
    <div class='top main-head'>
      <div class='center'>
        Ledger
      </div>
    </div>
    <div class='side main-sidebar'>
      Accounts...
    </div>
    <div class='body'>
    </div>
  </div>
}

module.exports = { render }
