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
 * Create a function that verifies if the code belongs an account type
 * @param {string} account type
 * @param {String|Number} account code
 * @returns {true|false}
 * @private
 * /
/*coa['80', '81', '82', '83', '84', '85', '86', '87', '88', '89']
['90', '91', '92', '93', '94', '95', '96', '97', '98', '99']*/
chartOfAccounts.isBelongs = (className, classCode) => {
  let classArray
  let classCodes
  if (typeof className !== 'string') {
    throw new Error('The class type must be a string')
  }
  if (typeof classCode === 'number') {
    classCodes = classCode.toString()
  } else
  if (typeof classCode === 'string') {
    classCodes = classCode
  } else {
    throw new Error('The code must be a string or number')
  }
  switch (className) {
    case 'Equity':
      classArray = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
      break
    case 'Fixed assets':
      classArray = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29']
      break
    case 'Stocks':
      classArray = ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39']
      break
    case 'Third part':
      classArray = ['40', '41', '42', '43', '44', '45', '46', '47', '48', '49']
      break
    case 'Cash':
      classArray = ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
      break
    case 'Expenses':
      classArray = ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69']
      break
    case 'Incomes':
      classArray = ['70', '71', '72', '73', '74', '75', '76', '77', '78', '79']
      break
    default:
  }
  let codes
  if (classCodes.length > 2) {
    codes = classCodes.substring(0, 2)
  } else {
    codes = classCodes
  }
  return classArray.includes(codes)
}

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