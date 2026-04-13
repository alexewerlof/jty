import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isArr } from '../src/index.js'

describe('isArr()', () => {
    it('returns true for an array', () => {
        assert.strictEqual(isArr([]), true)
    })

    it('returns false for a non-array value', () => {
        assert.strictEqual(isArr({}), false)
        assert.strictEqual(isArr(null), false)
        assert.strictEqual(isArr(undefined), false)
        assert.strictEqual(isArr(123), false)
        assert.strictEqual(isArr('string'), false)
        assert.strictEqual(isArr(true), false)
        assert.strictEqual(isArr(new Set([1, 2, 3])), false)
        assert.strictEqual(
            isArr(() => []),
            false,
        )
    })
})
