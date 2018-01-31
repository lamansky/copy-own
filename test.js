'use strict'

const assert = require('assert')
const copyOwn = require('.')

describe('copyOwn()', function () {
  it('should copy an object’s own properties to another object', function () {
    const from = {a: 1, b: 2}
    const to = copyOwn(from, {})
    assert.notStrictEqual(from, to)
    assert.strictEqual(to.a, 1)
    assert.strictEqual(to.b, 2)
  })

  it('should not copy an object’s inherited properties', function () {
    class Cls {
      get inherited () { return true }
    }
    const from = new Cls()
    from.a = 1

    assert(from instanceof Cls)
    assert.strictEqual(from.inherited, true)

    const to = copyOwn(from, {})
    assert(!(to instanceof Cls))
    assert.strictEqual(to.a, 1)
    assert.strictEqual(typeof to.inherited, 'undefined')
  })
})
