import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isArrIdx } from '../src/index.ts'

describe('inRange()', () => {
    it('returns true if the index is in range', () => {
        assert.strictEqual(isArrIdx([10, 20, 30], 0), true)
        assert.strictEqual(isArrIdx([10, 20, 30], 1), true)
        assert.strictEqual(isArrIdx([10, 20, 30], 2), true)
    })

    it('returns false for negative values', () => {
        assert.strictEqual(isArrIdx([11, 12, 13], -1), false)
    })

    it('returns false for out of range values', () => {
        assert.strictEqual(isArrIdx([31, 32, 33], 3), false)
    })

    it('returns false for fractional index', () => {
        assert.strictEqual(isArrIdx([41, 42, 43], 1.5), false)
    })
})
