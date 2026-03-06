import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isStrIdx } from '../src/index.ts'

describe('isStrIdx()', () => {
    it('returns true if the index is in range', () => {
        assert.strictEqual(isStrIdx(0, 'abc'), true)
        assert.strictEqual(isStrIdx(1, 'abc'), true)
        assert.strictEqual(isStrIdx(2, 'abc'), true)
    })

    it('returns false for negative values', () => {
        assert.strictEqual(isStrIdx(-1, 'abc'), false)
    })

    it('returns false for out of range values', () => {
        assert.strictEqual(isStrIdx(3, 'abc'), false)
    })

    it('returns false for fractional index', () => {
        assert.strictEqual(isStrIdx(1.5, 'abc'), false)
    })

    it('throws TypeError if str is not a string', () => {
        assert.throws(() => isStrIdx(0, 123), TypeError)
        assert.throws(() => isStrIdx(0, []), TypeError)
    })
})
