# hledger-vis

> Web UI for hledger

## Usage

* [hledger] is required. See [hledger downloads](http://hledger.org/download.html) for more info on how to install it in other platforms.

  ```sh
  apt-get install hledger  # debian/ubuntu
  brew install hledger     # osx
```

* Install hledger-vis.

  > *No release yet; see [dev setup](#dev-setup) below on how to install it.*

  <!--
  ```sh
  npm install -g @rstacruz/hledger-vis
  hledger vis
  ```
  -->

* Run hledger-vis. This will open a browser.

  ```sh
  hledger vis
  ```

* You may also pass arguments that will be passed to `hledger`. These will affect all views in hledger-vis (see `hledger vis --help`).

  ```sh
  hledger vis -f file.ledger
  hledger vis --cost --date2
  ```

## Dev setup

* Setup:

  ```sh
  git clone https://github.com/rstacruz/hledger-vis.git
  cd hledger-vis
  npm install
  ```

* Start in development mode (auto-reloads):

  ```sh
  npm start
  ```

* Make it available globally (optional):

  ```sh
  npm link
  ```

## Thanks

**hledger-vis** © 2016+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/hledger-vis/contributors
[hledger]: http://hledger.org/
