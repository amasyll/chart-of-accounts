# Chart Of Account
 
Chart Of Account utility for node.

This module provides a chart of account sourced from :
  * The [chart of accounts according to the uniform act on organization and harmonization
    accounts of companies on February 22, 2000 in fr](https://www.Droit-Afrique.com)
  * The [Chart of account SYSCOHADA in fr](https://plan-comptable-ohada.com/ancienne-norme-2001/comptes.html)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install chart-of-accounts
```
### API

```js
const chartOfAccount = require('chart-of-accounts')
```
### chartOfAccount(code)

Returns the chart of account (coa) label string for a known chart of account code. The code
may be a number or a string. An error is thrown for an unknown chart of account code.
E.g

```js
chartOfAccount(701) // => 'Ventes de marchandises'
chartOfAccount('701') // => 'Ventes de marchandises'
chartOfAccount(100) // throws
```

### chartOfAccount(label)

Returns the numeric coa code for a known chart of account label. The label
is An error is thrown for an unknown chart of account label.
E.g
```js
chartOfAccount('Ventes de marchandises') // => 701
chartOfAccount('Ventes de marchandises') // => 701
chartOfAccount('foo bar') // throws
```
### chartOfAccount.codes

Returns an array of all the chart of account codes as `Integer`s.

## chartOfAccount.balanceSheet[code]

Returns `true` if a chart of accounts code expects an balance sheet accounts.code, otherwise
`undefined`.

```js
chartOfAccount.balanceSheet[6030] // => undefined
chartOfAccount.balanceSheet[1204] // => true
chartOfAccount.balanceSheet[2304] // => true
chartOfAccount.balanceSheet[3304] // => true
chartOfAccount.balanceSheet[4304] // => true
```

### chartOfAccount.label[code]

Returns the label for a known numeric chat of account code, otherwise
`undefined`.

## chartOfAccount.incomStatement[code]

Returns `true` if a chart of accounts code expects an income statement accounts. code, otherwise
`undefined`.

```js
chartOfAccount.incomStatement[2103] // => undefined
chartOfAccount.incomStatement[6120] // => true
chartOfAccount.incomStatement[6230] // => true
chartOfAccount.incomStatement[7330] // => true
chartOfAccount.incomStatement[7430] // => true
```

## chartOfAccount.annex[code]

Returns `true` if a chart of accounts code expects an annex accounts. code, otherwise
`undefined`.

```js
chartOfAccount.annex[2103] // => undefined
chartOfAccount.annex[8620] // => true
chartOfAccount.annex[8230] // => true
chartOfAccount.annex[9330] // => true
chartOfAccount.annex[9430] // => true
```
## chartOfAccount.isBelongs('Account type', code)
The code must be a string or a number
Returns `true` if the code belongs to on of the account types listed below 
* Equity;
* Fixed assets;
* Stocks;
* Third part;
* Cash;
* Expenses;
* Incomes
else returns false

E.g
```js
chartOfAccount.isBelongs('Equity', 1011) // => true
chartOfAccount.isBelongs('Equity', '1011') // => true
chartOfAccount.isBelongs('Equity', 2011) // => false
chartOfAccount.isBelongs('Equity', '2011') // => false
```
## License

[MIT](/LICENSE.md)
