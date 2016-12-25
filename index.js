/*!
 * start-rollup <https://github.com/tunnckoCore/start-rollup>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

'use strict'

const r = require('rollup')

const startRollup = (config) => (input) => {
  return function rollup (log) {
    return r.rollup(config).then((bundle) => {
      const options = Object.assign({}, config)

      if (options.dest) {
        log(`transpiling to single destination: ${options.dest}`)
        return bundle.write(options)
      }

      if (options.targets) {
        return Promise.all(options.targets.map((target) => {
          log(`transpiling to ${target.dest} and with "${target.format}" format`)
          return bundle.write(Object.assign({}, config, target))
        }))
      }

      log(`transpiling without writing to disk`)
      const result = bundle.generate(options)

      if (options.sourceMap === 'inline') {
        // seen in `rollup`s CLI
        // seems like some hack?
        let SOURCEMAPPING_URL = 'sourceMa'
        SOURCEMAPPING_URL += 'ppingURL'

        result.code += `\n//# ${SOURCEMAPPING_URL}=${result.map.toUrl()}\n`
      }

      return result
    })
  }
}

module.exports = startRollup
