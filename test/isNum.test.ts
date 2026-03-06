import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isNum } from '../src/index.ts'

describe('isNum()', () => {
    it('returns true when the value is a number', () => {
        assert.strictEqual(isNum(17), true)
        assert.strictEqual(isNum(Math.PI), true)
        assert.strictEqual(isNum(0), true)
    })

    it('returns false when the value is a BigInt', () => {
        assert.strictEqual(isNum(17n), false)
        assert.strictEqual(isNum(0n), false)
    })

    it('returns false for NaN', () => {
        assert.strictEqual(isNum(NaN), false)
    })

    it('returns false for string numbers', () => {
        assert.strictEqual(isNum('13'), false)
        assert.strictEqual(isNum('2'), false)
    })

    it('returns false for non-numerical values', () => {
        assert.strictEqual(isNum('Hi'), false)
    })

    it('returns true for extreme numbers', () => {
        assert.strictEqual(isNum(Number.MAX_SAFE_INTEGER), true)
        assert.strictEqual(isNum(Number.MIN_SAFE_INTEGER), true)
    })
})
