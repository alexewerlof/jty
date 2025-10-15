import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isFin } from "../src/index.ts"

describe('isFin()', () => {
    it('returns true for a number or BigInt', () => {
        assert.strictEqual(isFin(1), true)
        assert.strictEqual(isFin(1.1), true)
        assert.strictEqual(isFin(-1), true)
        assert.strictEqual(isFin(-1.1), true)
        assert.strictEqual(isFin(0), true)
        assert.strictEqual(isFin(1n), true)
        assert.strictEqual(isFin(-1n), true)
    })

    it('returns false for non finite values', () => {
        assert.strictEqual(isFin('1'), false)
        assert.strictEqual(isFin('1n'), false)
        assert.strictEqual(isFin(NaN), false)
        assert.strictEqual(isFin(null), false)
        assert.strictEqual(isFin(Infinity), false)
        assert.strictEqual(isFin(-Infinity), false)
    })


    it('works for BigInt and numerical bounds', () => {
        assert.strictEqual(isFin(1, 1n, 1n), true)
        assert.strictEqual(isFin(1, 0n, 2n), true)
        assert.strictEqual(isFin(1, -2n, 3), true)
        assert.strictEqual(isFin(1, -3, 4n), true)
        assert.strictEqual(isFin(1n, -4n, 5n), true)
        assert.strictEqual(isFin(1n, -5n, 6), true)
        assert.strictEqual(isFin(1n, -6, 7n), true)
    })
})
