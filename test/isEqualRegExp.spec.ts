import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isEqualRegExp } from '../src/index.ts'

describe('isEqualRegExp()', () => {
    it('returns true for two RegExp objects with the same pattern and flags', () => {
        assert.strictEqual(isEqualRegExp(/abc/, /abc/), true)
        assert.strictEqual(isEqualRegExp(/abc/g, /abc/g), true)
        assert.strictEqual(isEqualRegExp(/abc/i, /abc/i), true)
        assert.strictEqual(isEqualRegExp(/abc/gi, /abc/gi), true) // flag order doesn't matter
    })

    it('returns true for RegExp objects created via constructor', () => {
        assert.strictEqual(isEqualRegExp(new RegExp('abc', 'gi'), /abc/gi), true)
        assert.strictEqual(isEqualRegExp(new RegExp('abc', 'gi'), new RegExp('abc', 'ig')), true)
    })

    it('returns false for RegExp objects with different patterns', () => {
        assert.strictEqual(isEqualRegExp(/abc/, /def/), false)
        assert.strictEqual(isEqualRegExp(/abc/, /ab/), false)
    })

    it('returns false for RegExp objects with different flags', () => {
        assert.strictEqual(isEqualRegExp(/abc/, /abc/g), false)
        assert.strictEqual(isEqualRegExp(/abc/i, /abc/g), false)
        assert.strictEqual(isEqualRegExp(/abc/gi, /abc/i), false)
    })

    it('ignores the lastIndex property', () => {
        const re1 = /abc/g
        const re2 = /abc/g
        re1.test('abcde') // lastIndex is now 3
        assert.strictEqual(isEqualRegExp(re1, re2), true)
    })

    it('throws if the second value is not a RegExp', () => {
        // @ts-expect-error
        assert.throws(() => isEqualRegExp(/abc/, 'abc'), TypeError)
        // @ts-expect-error
        assert.throws(() => isEqualRegExp(/abc/, undefined), TypeError)
    })

    it('returns false if the first argument is not a RegExp', () => {
        assert.strictEqual(isEqualRegExp({}, /abc/), false)
        assert.strictEqual(isEqualRegExp(null, /abc/), false)
        assert.strictEqual(isEqualRegExp('abc', /abc/), false)
        assert.strictEqual(isEqualRegExp('', /abc/), false)
    })
})
