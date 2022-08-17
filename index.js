'use strict'
/**
 * Module dependencies.
 * @private
 */
const codes = require('./lib/codes.json')
/**
 * Module exports.
 * @public
 */
module.exports = chartOfAccounts;

// chartOfAccounts code to label map
chartOfAccounts.label = codes

// chart Of Accounts label to code map
chartOfAccounts.code = createLabelToChartOfAccountsCodeMap(codes)

// array of chart Of Accounts codes
chartOfAccounts.codes = createChartOfAccountsCodeList(codes)

// chart Of Accounts codes for the Balance Sheet accounts
chartOfAccounts.balanceSheet = require('./lib/balan-sheet');

// chart Of Accounts codes for the income statement accounts
chartOfAccounts.incomeStatement = require('./lib/income-statmet');

// chart Of Accounts codes for the Annexes accounts
chartOfAccounts.annex = require('./lib/annexes');

/**
 * Create a map of label to Chart Of Accounts code.
 * @private
 */

function createLabelToChartOfAccountsCodeMap(codes) {
  var map = {}

  Object.keys(codes).forEach(function forEachCode(code) {
    var label = codes[code]
    var chartOfAccounts = Number(code)

    // populate map
    map[label] = chartOfAccounts
  })

  return map
}

/**
 * Create a list of all chart Of Accounts codes.
 * @private
 */

function createChartOfAccountsCodeList(codes) {
  return Object.keys(codes).map(function mapCode(code) {
    return Number(code)
  })
}

/**
 * Get the Chart Of Accounts code for given label.
 * @private
 */

function getChartOfAccountsCode(label) {

  if (!Object.prototype.hasOwnProperty.call(chartOfAccounts.code, label)) {
    throw new Error('invalid chart Of Accounts label: "' + label + '"')
  }

  return chartOfAccounts.code[label]
}

/**
 * Get the Chart Of Accounts label for given code.
 * @private
 */

function getChartOfAccountsLabel(code) {

  if (!Object.prototype.hasOwnProperty.call(chartOfAccounts.label, code)) {
    throw new Error('invalid Chart Of Accounts code: ' + code)
  }

  return chartOfAccounts.label[code]
}

/**
 * Get the chart Of Accounts code.
 *
 * Given a number, this will throw if it is not a known chart Of Accounts
 * code, otherwise the code will be returned. Given a string,
 * the string will be parsed for a number and return the code
 * if valid, otherwise will lookup the code assuming this is
 * the chart Of Accounts label.
 *
 * @param {string|number} code
 * @returns {number}
 * @public
 */

function chartOfAccounts(code) {
  if (typeof code === 'number') {
    return getChartOfAccountsLabel(code)
  }

  if (typeof code !== 'string') {
    throw new TypeError('code must be a number or string')
  }
  
  // '701'
  var n = parseInt(code, 10)
  if (!isNaN(n)) {
    return getChartOfAccountsLabel(n)
  }

  return getChartOfAccountsCode(code)
}