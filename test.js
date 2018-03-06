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

  it('should create a new object if no destination is specified', function () {
    const from = {a: 1, b: 2}
    const to = copyOwn(from)
    assert.notStrictEqual(from, to)
    assert.strictEqual(to.a, 1)
    assert.strictEqual(to.b, 2)
  })

  it('should overwrite properties by default', function () {
    const dest = {key: 1}
    assert.strictEqual(dest.key, 1)
    copyOwn({key: 2}, dest)
    assert.strictEqual(dest.key, 2)
  })

  it('should silently fail to copy duplicated properties if `overwrite` is false', function () {
    const dest = {key: 1}
    assert.strictEqual(dest.key, 1)
    copyOwn({key: 2}, dest, {overwrite: false})
    assert.strictEqual(dest.key, 1)
  })

  it('should include non-enumerable properties by default', function () {
    const source = {}
    Object.defineProperty(source, 'noEnum', {enumerable: false, value: 123})
    assert.strictEqual(source.noEnum, 123)
    const dest = copyOwn(source)
    assert.strictEqual(dest.noEnum, 123)
  })

  it('should exclude non-enumerable properties if `enumOnly` is true', function () {
    const source = {enum: 123}
    Object.defineProperty(source, 'noEnum', {enumerable: false, value: 234})
    assert.strictEqual(source.noEnum, 234)
    const dest = copyOwn(source, {}, {enumOnly: true})
    assert.strictEqual(dest.enum, 123)
    assert.strictEqual(typeof dest.noEnum, 'undefined')
  })
})
