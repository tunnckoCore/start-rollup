/*!
 * start-rollup <https://github.com/tunnckoCore/start-rollup>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const test = require('mukla')
const startRollup = require('./index')

test('start-rollup', (done) => {
  startRollup()
  done()
})
