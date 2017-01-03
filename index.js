/*!
 * start-rollup <https://github.com/tunnckoCore/start-rollup>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const extend = require('extend-shallow')
const rolldown = require('rolldown')

const startRollup = (config) => (input) => {
  return function rollup (log) {
    config = typeof log === 'function' ? extend({
      ongenerate: (opts) => {
        log('bundling without writing to disk')
      },
      onwrite: (opts) => {
        log(`bundling to ${opts.dest} with "${opts.format}" format`)
      }
    }, config) : config

    return rolldown(config)
  }
}

module.exports = startRollup
