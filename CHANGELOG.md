# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0-next.6](https://github.com/Swivel-Finance/illuminate-js/compare/v2.0.0-next.5...v2.0.0-next.6) (2023-12-08)


### Features

* support lending on ETH markets ([6c6eac7](https://github.com/Swivel-Finance/illuminate-js/commit/6c6eac7b953b9584b43df1c6f954774a99494542))

## [2.0.0-next.5](https://github.com/Swivel-Finance/illuminate-js/compare/v2.0.0-next.4...v2.0.0-next.5) (2023-12-01)


### Bug Fixes

* **adapter:** fix encoding of empty `bytes` string ([d4f7cea](https://github.com/Swivel-Finance/illuminate-js/commit/d4f7cea44fb375e692d03a39459e3b0613fb6323))

## [2.0.0-next.4](https://github.com/Swivel-Finance/illuminate-js/compare/v2.0.0-next.3...v2.0.0-next.4) (2023-12-01)


### ⚠ BREAKING CHANGES

* **lender:** `feenominator` now requires the maturity timestamp

### Features

* add `Notional` protocol adapter ([e1e6740](https://github.com/Swivel-Finance/illuminate-js/commit/e1e67402b733dece2f8840ace422cd309ca32de0))
* **lender:** update `feenominator` signature ([8db8337](https://github.com/Swivel-Finance/illuminate-js/commit/8db83374baadd94462f0b740026caf7dce27ce97))

## [2.0.0-next.3](https://github.com/Swivel-Finance/illuminate-js/compare/v2.0.0-next.2...v2.0.0-next.3) (2023-11-30)


### Bug Fixes

* **marketplace:** unwrap the ethers result for the `markets` method ([536f0cd](https://github.com/Swivel-Finance/illuminate-js/commit/536f0cd6674b2cc0db0b4b83390b67d0d12f6cc2))

## [2.0.0-next.2](https://github.com/Swivel-Finance/illuminate-js/compare/v2.0.0-next.1...v2.0.0-next.2) (2023-11-28)


### ⚠ BREAKING CHANGES

* `Lender.mint` now requires an additional parameter `t`
* `Lender.HOLD` is now `Lender.hold`
* `Lender.MIN_FEENOMINATOR` is now `Lender.minimumFeenominator`

### Features

* add `Exactly` and `Term` protocol adapters ([7afd3b3](https://github.com/Swivel-Finance/illuminate-js/commit/7afd3b36e94a8769eab6b138db93eb3b41a9d94d))


### Bug Fixes

* add generated contract ABIs ([597b43c](https://github.com/Swivel-Finance/illuminate-js/commit/597b43c32c70438b58116e29d7a45b1642ff19f6))

## [2.0.0-next.1](https://github.com/Swivel-Finance/illuminate-js/compare/v2.0.0-next.0...v2.0.0-next.1) (2023-11-07)

## [2.0.0-next.0](https://github.com/Swivel-Finance/illuminate-js/compare/v1.0.0...v2.0.0-next.0) (2023-11-07)


### ⚠ BREAKING CHANGES

* `redeemSignatures` on `Lender` are changed
* `marketPlace` getter is now `marketplace`
* `converter`, `swivelAddr` and `tempusAddr` are removed
* `redeem` method signatures have changed
* `markets` mapping has changed, only `underlying` and `maturity` are used to index markets, `principals` argument is removed;
* `markets` mapping now returns a `Market` struct, containing an array of principal tokens (indexed by `Principals` identifier) and the pool for the market;
* `pools` map no longer exists on `Marketplace` (pool is now in the `Market` struct returned by `markets`)
* `MAX_VALUE` is now `maximumValue`
* `marketPlace` is now `marketplace`
* `swivelAddr`, `pendleAddr`, `apwineAddr` are removed
* `lend` method signatures have changed

### Features

* add `batch` method to `Lender` ([c11d8e8](https://github.com/Swivel-Finance/illuminate-js/commit/c11d8e842ea18f5fb2eaea3ed3068e68bcb00fb2))
* add `converters` mapping to redeemer contract ([a569bf7](https://github.com/Swivel-Finance/illuminate-js/commit/a569bf72bb1cefe7462c8e94afa9d40de9f14501))
* add `curvePools` mapping to `Lender` contract ([8fe7a1c](https://github.com/Swivel-Finance/illuminate-js/commit/8fe7a1c6de0e491741f3441450bf98f14d7c37c1))
* add `Pendle` adapter implementation ([cbb13a3](https://github.com/Swivel-Finance/illuminate-js/commit/cbb13a337af81d075ab2a1edf866632a27f4dcf4))
* add new `Market` struct ([837d046](https://github.com/Swivel-Finance/illuminate-js/commit/837d0462f37750ad581803356a98f65a1984c82d))
* provide parameter helpers for pendle ([4790b95](https://github.com/Swivel-Finance/illuminate-js/commit/4790b9510e66693ddcd8ea85e2cfb0a487ef9e08))
* update `Lender` contract to v2 ([c5229d6](https://github.com/Swivel-Finance/illuminate-js/commit/c5229d69457f3c610b16bef852de71de6be9f305))
* update `Marketplace` contract to v2 ([8259ab2](https://github.com/Swivel-Finance/illuminate-js/commit/8259ab2c1f90e3ecf5a6dc5010aea055bd3cd13e))
* update `Redeemer` contract to v2 ([d745280](https://github.com/Swivel-Finance/illuminate-js/commit/d74528069dfab8f711bd3d7c1a932195c2b7f476))


### Bug Fixes

* correct the indizes of `d` in Pendle's lend implememtation ([d36805f](https://github.com/Swivel-Finance/illuminate-js/commit/d36805fbbb0be4781d9826deb8ff71d6e1130947))
* provide `buildTokenOutput` helper for pendle ([be6ee3f](https://github.com/Swivel-Finance/illuminate-js/commit/be6ee3f20c623654ba8adcdc156456233f42d089))
* update the illuminate/yield adapter ([4514c47](https://github.com/Swivel-Finance/illuminate-js/commit/4514c470e07e631a7ccb00eeb2f88ef96d4f366e))

## [1.0.0](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.7...v1.0.0) (2023-05-26)


### Features

* add strategy and strategy router contracts ([0915a16](https://github.com/Swivel-Finance/illuminate-js/commit/0915a166ff40710b82d14465650d3b45ad4c218a))

### [0.0.7](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.6...v0.0.7) (2023-02-14)


### Features

* update to latest contract version ([1e84188](https://github.com/Swivel-Finance/illuminate-js/commit/1e841887bae2f8e61240b7c244a922d03a75a9cb))

### [0.0.6](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.5...v0.0.6) (2022-12-22)


### Features

* **executor:** add gas optimization to trabsaction executor ([c7d5111](https://github.com/Swivel-Finance/illuminate-js/commit/c7d5111afc3a7dd61fcf65852825175a9138dab4))
* **lender:** add new public getters to lender ([d61a730](https://github.com/Swivel-Finance/illuminate-js/commit/d61a730fe28d5c68c81dcbdbdd37ac853f5e2f2d))
* **marketplace:** remove `token` getter from marketplace ([1b6f6eb](https://github.com/Swivel-Finance/illuminate-js/commit/1b6f6ebe392eecf65e06a81fcd024bbf44326d19))
* new lend signature for APWine ([d88e31b](https://github.com/Swivel-Finance/illuminate-js/commit/d88e31bfcfd7569c0bce99fc5d5236fe0d2d083d))
* **redeemer:** update redeem methods and add new getters ([2409b08](https://github.com/Swivel-Finance/illuminate-js/commit/2409b08327dd06d05ee4b7eb75bf8503e1a751af))

### [0.0.5](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.4...v0.0.5) (2022-11-02)


### Features

* add MIN_FEENOMINATOR and feeChange public attributes ([23509a7](https://github.com/Swivel-Finance/illuminate-js/commit/23509a73fbf14935a7d26f0d53dd24295847c12e))


### Bug Fixes

* update APWine lend signature ([ebe2dd9](https://github.com/Swivel-Finance/illuminate-js/commit/ebe2dd91f4dbbd9de8d8ff9b4ba7e3a53c56edd3))

### [0.0.4](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.3...v0.0.4) (2022-10-26)


### Bug Fixes

* **lender:** update lender contract and ABI to match latest goerli deploy ([0072dbf](https://github.com/Swivel-Finance/illuminate-js/commit/0072dbf6f7b2281f2c138563f3b8e99005eea0f6))

### [0.0.3](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.2...v0.0.3) (2022-10-06)


### Bug Fixes

* update order types to v3 orders ([64cf7cd](https://github.com/Swivel-Finance/illuminate-js/commit/64cf7cd94688b401279f462228d1c7f279532e9a))

### [0.0.2](https://github.com/Swivel-Finance/illuminate-js/compare/v0.0.1...v0.0.2) (2022-09-30)

### 0.0.1 (2022-09-22)


### Features

* add custom error handling ([638279d](https://github.com/Swivel-Finance/illuminate-js/commit/638279d5fc55168e7fa98c396b53b02f955a959b)), closes [#11](https://github.com/Swivel-Finance/illuminate-js/issues/11)
* add marketplace and lender hoc ([22b089d](https://github.com/Swivel-Finance/illuminate-js/commit/22b089d569979bbd7cccb9c5be7a64b01bcb3628)), closes [#1](https://github.com/Swivel-Finance/illuminate-js/issues/1)
* **lender:** add `lend` implementation ([30a7798](https://github.com/Swivel-Finance/illuminate-js/commit/30a77989d0dc02743784cee6907ba4e0daf44eea)), closes [#1](https://github.com/Swivel-Finance/illuminate-js/issues/1)
* **lender:** add `mint` method ([adfa024](https://github.com/Swivel-Finance/illuminate-js/commit/adfa024507c5304de6976eb1c5d8691102863b2e)), closes [#1](https://github.com/Swivel-Finance/illuminate-js/issues/1)
* **lender:** enable overrides for lend function ([e365000](https://github.com/Swivel-Finance/illuminate-js/commit/e36500059697790b08a5b01a8a60c72d7fc97ea5)), closes [#1](https://github.com/Swivel-Finance/illuminate-js/issues/1)
* **redeemer:** add redeemer implementation ([68bdfb6](https://github.com/Swivel-Finance/illuminate-js/commit/68bdfb6adf6cee8edb4ea1bf648f1192d1963b5d)), closes [#1](https://github.com/Swivel-Finance/illuminate-js/issues/1)


### Bug Fixes

* update contracts to latest ([9f0a955](https://github.com/Swivel-Finance/illuminate-js/commit/9f0a955528cc2070037a1816bb399bdf4671d87d))
