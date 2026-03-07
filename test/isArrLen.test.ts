import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isArrLen } from '../src/index.ts'

describe('isArrLen()', () => {
    it('can match the length', () => {
        assert.strictEqual(isArrLen(['a', 'b', 'c'], 3), true)
        assert.strictEqual(isArrLen(['a', 'b', 'c'], 4), false)
    })

    it('checks the len range', () => {
        const arr2 = [1, 2]
        assert.strictEqual(isArrLen(arr2, undefined), true)
        assert.strictEqual(isArrLen(arr2, 0), true)
        assert.strictEqual(isArrLen(arr2, 1), true)
        assert.strictEqual(isArrLen(arr2, 2), true)
        assert.strictEqual(isArrLen(arr2, 2, 3), true)
        assert.strictEqual(isArrLen(arr2, 2, 10), true)
        assert.strictEqual(isArrLen(arr2, 0, 3), true)
        assert.strictEqual(isArrLen(arr2, 0, 2), true)
    })

    it('returns false for non-array values', () => {
        assert.strictEqual(isArrLen(null, 1), false)
    })

    it('throws TypeError for invalid bounds', () => {
        assert.throws(() => isArrLen([1], '1' as any), TypeError)
        assert.throws(() => isArrLen([1], undefined, '3' as any), TypeError)
    })
})
