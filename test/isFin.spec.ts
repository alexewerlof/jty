import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isFin } from '../src/index.ts'

describe('isFin()', () => {
    it('returns true for a number', () => {
        assert.strictEqual(isFin(1), true)
        assert.strictEqual(isFin(1.1), true)
        assert.strictEqual(isFin(-1), true)
        assert.strictEqual(isFin(-1.1), true)
        assert.strictEqual(isFin(0), true)
        assert.strictEqual(isFin(+0), true)
        assert.strictEqual(isFin(-0), true)
        assert.strictEqual(isFin(1n), false)
        assert.strictEqual(isFin(-1n), false)
    })

    it('returns false for non finite values', () => {
        assert.strictEqual(isFin('1'), false)
        assert.strictEqual(isFin('1n'), false)
        assert.strictEqual(isFin(NaN), false)
        assert.strictEqual(isFin(null), false)
        assert.strictEqual(isFin(Infinity), false)
        assert.strictEqual(isFin(-Infinity), false)
    })
})
