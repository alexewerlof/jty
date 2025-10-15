import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isStr } from "../src/index.ts"

describe('isStr()', () => {
    it('returns true for a string', () => {
        assert.strictEqual(isStr('Hello'), true)
    })

    it('returns false for a non-string value', () => {
        assert.strictEqual(isStr(null), false)
    })

    it('returns true for an empty string when no minimum length is specified', () => {
        assert.strictEqual(isStr(''), true)
    })

    it('can match the length', () => {
        assert.strictEqual(isStr('', 0), true)
        assert.strictEqual(isStr('', 1), false)
        assert.strictEqual(isStr('H', 0, 1), true)
        assert.strictEqual(isStr('H', 1), true)
        assert.strictEqual(isStr('H', 2), false)
        assert.strictEqual(isStr('Hi', 1), true)
        assert.strictEqual(isStr('Hi', 2), true)
        assert.strictEqual(isStr('Hi', 3), false)
    })

    it('can match length range', () => {
        const str = 'Hello'
        assert.strictEqual(isStr(str, undefined, 6), true)
        assert.strictEqual(isStr(str, 0, 6), true)
        assert.strictEqual(isStr(str, -1, 6), true)
        assert.strictEqual(isStr(str, -1.1, 5.1), true)
        assert.strictEqual(isStr(str, 5, 6), true)
        assert.strictEqual(isStr(str, 4, 6), true)
        assert.strictEqual(isStr(str, 4, 5), true)
        assert.strictEqual(isStr(str, undefined, 5), true)
    })

    it('does not choke if the max is less than min', () => {
        const str = 'Hello'
        assert.strictEqual(isStr(str, 6, 5), false)
        assert.strictEqual(isStr(str, 6, 4), false)
        assert.strictEqual(isStr(str, 5, 4), false)
    })
})
