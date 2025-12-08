import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameSet } from '../src/index'

describe('isSameSet()', () => {
    it('returns true for the same Set instance', () => {
        const set = new Set([1, 2, 3])
        assert.strictEqual(isSameSet(set, set), true)
    })

    it('returns true for two empty sets', () => {
        assert.strictEqual(isSameSet(new Set(), new Set()), true)
    })

    it('returns true for two sets with the same primitive values', () => {
        const set1 = new Set([1, 'a', true, null, undefined])
        const set2 = new Set([undefined, null, true, 'a', 1]) // Order doesn't matter
        assert.strictEqual(isSameSet(set1, set2), true)
    })

    it('returns true for two sets with the same object references', () => {
        const obj = { id: 1 }
        const set1 = new Set([obj])
        const set2 = new Set([obj])
        assert.strictEqual(isSameSet(set1, set2), true)
    })

    it('returns false for sets with different sizes', () => {
        const set1 = new Set([1, 2])
        const set2 = new Set([1, 2, 3])
        assert.strictEqual(isSameSet(set1, set2), false)
    })

    it('returns false for sets with the same size but different values', () => {
        const set1 = new Set([1, 2, 3])
        const set2 = new Set([1, 2, 4])
        assert.strictEqual(isSameSet(set1, set2), false)
    })

    it('returns false for sets with different object references', () => {
        const set1 = new Set([{ id: 1 }])
        const set2 = new Set([{ id: 1 }])
        assert.strictEqual(isSameSet(set1, set2), false) // strict equality fails for objects
    })

    it('returns false if the first argument is not a Set', () => {
        assert.strictEqual(isSameSet({}, new Set()), false)
        assert.strictEqual(isSameSet(null, new Set()), false)
        assert.strictEqual(isSameSet([1, 2], new Set([1, 2])), false)
    })

    it('throws a TypeError if the reference value is not a Set', () => {
        assert.throws(() => isSameSet(new Set(), null as unknown as Set<any>), TypeError)
        assert.throws(() => isSameSet(new Set(), {} as unknown as Set<any>), TypeError)
    })
})
