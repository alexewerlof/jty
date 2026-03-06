import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isObj } from '../src/index.ts'

describe('isObj()', () => {
    it('returns true for an object', () => {
        assert.strictEqual(isObj({}), true)
    })

    it('returns true for an array', () => {
        assert.strictEqual(isObj([]), true)
    })

    it('returns false for null', () => {
        assert.strictEqual(isObj(null), false)
    })

    it('returns true for a Map()', () => {
        assert.strictEqual(isObj(new Map()), true)
    })

    it('returns true for a Set()', () => {
        assert.strictEqual(isObj(new Set()), true)
    })

    it('returns true for a Array()', () => {
        assert.strictEqual(isObj(new Array()), true)
    })

    it('returns true for a Number()', () => {
        assert.strictEqual(isObj(new Number()), true)
    })
})
