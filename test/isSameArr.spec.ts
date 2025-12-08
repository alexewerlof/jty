import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameArr } from '../src/index.ts'

describe('isSameArr()', () => {
    it('returns true for the same array instance', () => {
        const arr = [1, 2, 3]
        assert.strictEqual(isSameArr(arr, arr), true)
    })

    it('returns true for two arrays with the same primitive values in the same order', () => {
        const arr1 = [1, 'a', true, null, undefined]
        const arr2 = [1, 'a', true, null, undefined]
        assert.strictEqual(isSameArr(arr1, arr2), true)
    })

    it('returns true for two empty arrays', () => {
        assert.strictEqual(isSameArr([], []), true)
    })

    it('returns false for arrays with different lengths', () => {
        const arr1 = [1, 2]
        const arr2 = [1, 2, 3]
        assert.strictEqual(isSameArr(arr1, arr2), false)
    })

    it('returns false for arrays with the same length but different values', () => {
        const arr1 = [1, 2, 3]
        const arr2 = [1, 5, 3]
        assert.strictEqual(isSameArr(arr1, arr2), false)
    })

    it('returns false for arrays with the same values in a different order', () => {
        const arr1 = [1, 2, 3]
        const arr2 = [3, 2, 1]
        assert.strictEqual(isSameArr(arr1, arr2), false)
    })

    it('returns false for arrays containing different object references', () => {
        const arr1 = [{ a: 1 }]
        const arr2 = [{ a: 1 }]
        assert.strictEqual(isSameArr(arr1, arr2), false) // strict equality fails for objects
    })

    it('returns true for arrays containing the same object references', () => {
        const obj = { a: 1 }
        const arr1 = [obj]
        const arr2 = [obj]
        assert.strictEqual(isSameArr(arr1, arr2), true)
    })

    it('returns false if the first argument is not an array', () => {
        assert.strictEqual(isSameArr({}, [1, 2]), false)
        assert.strictEqual(isSameArr(null, [1, 2]), false)
        assert.strictEqual(isSameArr('1,2', [1, 2]), false)
    })

    it('throws a TypeError if the reference value is not an array', () => {
        assert.throws(() => isSameArr([], null as unknown as any[]), TypeError)
        assert.throws(() => isSameArr([], {} as unknown as any[]), TypeError)
    })
})
