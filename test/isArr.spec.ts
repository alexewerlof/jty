import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isArr } from "../src/index.ts"

describe('isArr()', () => {
    it('returns true for an array', () => {
        assert.strictEqual(isArr([]), true)
    })

    it('can check the minimum acceptable length', () => {
        assert.strictEqual(isArr(['a', 'b', 'c'], 3), true)
        assert.strictEqual(isArr(['a', 'b', 'c'], 4), false)
    })

    it('returns false for a non-array value', () => {
        assert.strictEqual(isArr({}), false)
    })

    it('checks the len range', () => {
        const arr2 = [1, 2]
        assert.strictEqual(isArr(arr2, undefined), true)
        assert.strictEqual(isArr(arr2, 0), true)
        assert.strictEqual(isArr(arr2, 1), true)
        assert.strictEqual(isArr(arr2, 2), true)
        assert.strictEqual(isArr(arr2, 2, 3), true)
        assert.strictEqual(isArr(arr2, 2, 10), true)
        assert.strictEqual(isArr(arr2, 0, 3), true)
        assert.strictEqual(isArr(arr2, 0, 2), true)
    })
})
