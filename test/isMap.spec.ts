import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isMap } from '../src/object'

describe('isMap', () => {
    it('should return true for Map instances', () => {
        assert.strictEqual(isMap(new Map()), true)
        assert.strictEqual(isMap(new Map([['a', 1]])), true)
    })

    it('should return false for other object types', () => {
        assert.strictEqual(isMap(new Set()), false)
        assert.strictEqual(isMap({}), false)
        assert.strictEqual(isMap([]), false)
        assert.strictEqual(isMap(new Date()), false)
        assert.strictEqual(isMap(/a/), false)
        assert.strictEqual(isMap(new Error()), false)
        assert.strictEqual(isMap(new WeakMap()), false)
        assert.strictEqual(isMap(new String('test')), false)
        assert.strictEqual(isMap(new Number(123)), false)
    })

    it('should return false for primitive values', () => {
        assert.strictEqual(isMap('a string'), false)
        assert.strictEqual(isMap(123), false)
        assert.strictEqual(isMap(true), false)
        assert.strictEqual(isMap(Symbol('s')), false)
        assert.strictEqual(isMap(null), false)
        assert.strictEqual(isMap(undefined), false)
        assert.strictEqual(isMap(9007199254740991n), false)
    })
})
