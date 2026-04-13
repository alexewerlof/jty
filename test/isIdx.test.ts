import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isIdx } from '../src/index.js'

describe('isIdx()', () => {
    it('returns true if the index is in range', () => {
        assert.strictEqual(isIdx(0, 3), true)
        assert.strictEqual(isIdx(1, 3), true)
        assert.strictEqual(isIdx(2, 3), true)
    })

    it('returns false for negative values', () => {
        assert.strictEqual(isIdx(-1, 3), false)
    })

    it('returns false for out of range values', () => {
        assert.strictEqual(isIdx(3, 3), false)
    })

    it('returns false for fractional index', () => {
        assert.strictEqual(isIdx(1.5, 3), false)
    })

    it('throws TypeError if length is not an integer', () => {
        assert.throws(() => isIdx(1, 1.5 as any), TypeError)
        assert.throws(() => isIdx(1, '1' as any), TypeError)
        assert.throws(() => isIdx(1, NaN as any), TypeError)
    })

    it('throws RangeError if length is negative', () => {
        assert.throws(() => isIdx(1, -1), RangeError)
    })
})
