import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isBigInt } from '../src/index.ts'

describe('isBigInt()', () => {
    it('returns true when the value is an integer', () => {
        assert.strictEqual(isBigInt(18n), true)
        assert.strictEqual(isBigInt(0n), true)
        assert.strictEqual(isBigInt(-13n), true)
    })

    it('returns false for NaN', () => {
        assert.strictEqual(isBigInt(NaN), false)
    })

    it('returns false for string numbers', () => {
        assert.strictEqual(isBigInt('21'), false)
        assert.strictEqual(isBigInt('23n'), false)
    })

    it('returns false for non-numerical values', () => {
        assert.strictEqual(isBigInt('Hi'), false)
    })

    it('returns true for extreme numbers', () => {
        assert.strictEqual(isBigInt(BigInt(Number.MAX_SAFE_INTEGER)), true)
        assert.strictEqual(isBigInt(BigInt(Number.MIN_SAFE_INTEGER)), true)
    })
})
