/*!
 * start-rollup <https://github.com/tunnckoCore/start-rollup>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

const fs = require('fs')
const test = require('mukla')
const exists = require('fs-exists-sync')
const buble = require('rollup-plugin-buble')
const startRollup = require('./index')

test('should transpile to .dest, using Buble', (done) => {
  startRollup({
    entry: './test.js',
    dest: './node_modules/test.old.js',
    format: 'cjs',
    plugins: [buble()]
  })()().then(() => {
    test.strictEqual(exists('./node_modules/test.old.js'), true)

    const res = fs.readFileSync('./node_modules/test.old.js', 'utf8')
    test.strictEqual(/function \(done\) \{/.test(res), true)
    test.strictEqual(/^var/m.test(res), true)
    test.strictEqual(/\);/.test(res), true)
    done()
  }, done).catch(done)
})

test('should resolve result if no ".dest" and no ".targets" opts', (done) => {
  startRollup({
    entry: './test.js',
    plugins: [buble({
      target: {
        node: '4'
      }
    })]
  })()(() => {}).then(({ code }) => {
    test.strictEqual(typeof code, 'string')
    test.strictEqual(/.then\(\(ref\) => \{/.test(code), true)
    test.strictEqual(/var code = ref.code;/.test(code), true)
    test.strictEqual(/^const test = require/m.test(code), true)
    test.strictEqual(/\(done\) => \{/.test(code), true)
    done()
  }, done).catch(done)
})

test('should transpile to multiple targets', (done) => {
  startRollup({
    entry: './test.js',
    targets: [
      { dest: './node_modules/test.common.js', format: 'cjs' },
      { dest: './node_modules/test.es6.js', format: 'es' }
    ]
  })()().then(() => {
    test.strictEqual(exists('./node_modules/test.common.js'), true)
    test.strictEqual(exists('./node_modules/test.es6.js'), true)
    done()
  }, done).catch(done)
})

test('should sourcemaps are working', function (done) {
  startRollup({
    entry: './test.js',
    sourceMap: 'inline',
    plugins: [buble()]
  })()().then(({ code }) => {
    test.strictEqual(/^\/\/# sourceMappingURL=/m.test(code), true)
    done()
  }, done).catch(done)
})
