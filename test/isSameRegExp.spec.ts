import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameRegExp } from '../src/index'

describe('isSameRegExp()', () => {
    it('returns true for two RegExp objects with the same pattern and flags', () => {
        assert.strictEqual(isSameRegExp(/abc/, /abc/), true)
        assert.strictEqual(isSameRegExp(/abc/g, /abc/g), true)
        assert.strictEqual(isSameRegExp(/abc/i, /abc/i), true)
        assert.strictEqual(isSameRegExp(/abc/gi, /abc/gi), true) // flag order doesn't matter
    })

    it('returns true for RegExp objects created via constructor', () => {
        assert.strictEqual(isSameRegExp(new RegExp('abc', 'gi'), /abc/gi), true)
        assert.strictEqual(isSameRegExp(new RegExp('abc', 'gi'), new RegExp('abc', 'ig')), true)
    })

    it('returns false for RegExp objects with different patterns', () => {
        assert.strictEqual(isSameRegExp(/abc/, /def/), false)
        assert.strictEqual(isSameRegExp(/abc/, /ab/), false)
    })

    it('returns false for RegExp objects with different flags', () => {
        assert.strictEqual(isSameRegExp(/abc/, /abc/g), false)
        assert.strictEqual(isSameRegExp(/abc/i, /abc/g), false)
        assert.strictEqual(isSameRegExp(/abc/gi, /abc/i), false)
    })

    it('ignores the lastIndex property', () => {
        const re1 = /abc/g
        const re2 = /abc/g
        re1.test('abcde') // lastIndex is now 3
        assert.strictEqual(isSameRegExp(re1, re2), true)
    })

    it('throws if the second value is not a RegExp', () => {
        // @ts-expect-error
        assert.throws(() => isSameRegExp(/abc/, 'abc'), TypeError)
        // @ts-expect-error
        assert.throws(() => isSameRegExp(/abc/, undefined), TypeError)
    })

    it('returns false if the first argument is not a RegExp', () => {
        assert.strictEqual(isSameRegExp({}, /abc/), false)
        assert.strictEqual(isSameRegExp(null, /abc/), false)
        assert.strictEqual(isSameRegExp('abc', /abc/), false)
        assert.strictEqual(isSameRegExp('', /abc/), false)
    })
})
