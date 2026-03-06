import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isArrIdx } from '../src/index.ts'

describe('isArrIdx()', () => {
    it('returns true if the index is in range', () => {
        assert.strictEqual(isArrIdx(0, [10, 20, 30]), true)
        assert.strictEqual(isArrIdx(1, [10, 20, 30]), true)
        assert.strictEqual(isArrIdx(2, [10, 20, 30]), true)
    })

    it('returns false for negative values', () => {
        assert.strictEqual(isArrIdx(-1, [11, 12, 13]), false)
    })

    it('returns false for out of range values', () => {
        assert.strictEqual(isArrIdx(3, [31, 32, 33]), false)
    })

    it('returns false for fractional index', () => {
        assert.strictEqual(isArrIdx(1.5, [41, 42, 43]), false)
    })
})
