import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isBInt } from "../src/index.ts"

describe('isBInt()', () => {
    it('returns true when the value is an integer', () => {
        assert.strictEqual(isBInt(18n), true)
        assert.strictEqual(isBInt(0n), true)
        assert.strictEqual(isBInt(-13n), true)
    })

    it('returns false for NaN', () => {
        assert.strictEqual(isBInt(NaN), false)
    })

    it('returns false for string numbers', () => {
        assert.strictEqual(isBInt('21'), false)
        assert.strictEqual(isBInt('23n'), false)
    })

    it('returns false for non-numerical values', () => {
        assert.strictEqual(isBInt('Hi'), false)
    })

    it('returns true for extreme numbers', () => {
        assert.strictEqual(isBInt(BigInt(Number.MAX_SAFE_INTEGER)), true)
        assert.strictEqual(isBInt(BigInt(Number.MIN_SAFE_INTEGER)), true)
    })

    it('checks range', () => {
        assert.strictEqual(isBInt(18n, 17n, 20n), true)
        assert.strictEqual(isBInt(18n, 17, 18n), true)
        assert.strictEqual(isBInt(18n, 18n, 20), true)
        assert.strictEqual(isBInt(18n, 18n), true)
        assert.strictEqual(isBInt(18n, undefined, 18n), true)
    })

    it('returns false for non-integer numbers even when they are in range', () => {
        assert.strictEqual(isBInt(19.1, 19), false)
        assert.strictEqual(isBInt(19.1, undefined, 19), false)
    })
})
