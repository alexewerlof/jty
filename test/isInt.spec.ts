import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isInt } from "../src/index.ts"

describe('isInt()', () => {
    it('returns true when the value is an integer', () => {
        assert.strictEqual(isInt(17), true)
        assert.strictEqual(isInt(Math.PI), false)
        assert.strictEqual(isInt(0), true)
    })

    it('returns false for NaN', () => {
        assert.strictEqual(isInt(NaN), false)
    })

    it('returns false for string numbers', () => {
        assert.strictEqual(isInt('13'), false)
    })

    it('returns false for non-numerical values', () => {
        assert.strictEqual(isInt('Hi'), false)
    })

    it('returns true for extreme numbers', () => {
        assert.strictEqual(isInt(Number.MAX_SAFE_INTEGER), true)
        assert.strictEqual(isInt(Number.MIN_SAFE_INTEGER), true)
    })

    it('checks range', () => {
        assert.strictEqual(isInt(19, 17, 20), true)
        assert.strictEqual(isInt(19, 17, 19), true)
        assert.strictEqual(isInt(19, 19, 20), true)
        assert.strictEqual(isInt(19, 19), true)
        assert.strictEqual(isInt(19, undefined, 19), true)
    })

    it('returns false for non-integer numbers even when they are in range', () => {
        assert.strictEqual(isInt(19.1, 19), false)
        assert.strictEqual(isInt(19.1, undefined, 19), false)
    })
})
