import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameMap } from '../src/index.ts'

describe('isSameMap()', () => {
    it('returns true for the same Map instance', () => {
        const map = new Map([['a', 1]])
        assert.strictEqual(isSameMap(map, map), true)
    })

    it('returns true for two empty maps', () => {
        assert.strictEqual(isSameMap(new Map(), new Map()), true)
    })

    it('returns true for two maps with the same primitive key-value pairs', () => {
        const map1 = new Map<any, any>([
            ['a', 1],
            ['b', 'hello'],
            ['c', null],
        ])
        const map2 = new Map<any, any>([
            ['a', 1],
            ['b', 'hello'],
            ['c', null],
        ])
        assert.strictEqual(isSameMap(map1, map2), true)
    })

    it('returns true for two maps with the same object references as values', () => {
        const obj = { id: 1 }
        const map1 = new Map([['key', obj]])
        const map2 = new Map([['key', obj]])
        assert.strictEqual(isSameMap(map1, map2), true)
    })

    it('returns false for maps with different sizes', () => {
        const map1 = new Map([['a', 1]])
        const map2 = new Map([
            ['a', 1],
            ['b', 2],
        ])
        assert.strictEqual(isSameMap(map1, map2), false)
        assert.strictEqual(isSameMap(map2, map1), false)
    })

    it('returns false for maps with the same size but different keys', () => {
        const map1 = new Map([['a', 1]])
        const map2 = new Map([['b', 1]])
        assert.strictEqual(isSameMap(map1, map2), false)
    })

    it('returns false for maps with the same keys but different values', () => {
        const map1 = new Map([['a', 1]])
        const map2 = new Map([['a', 2]])
        assert.strictEqual(isSameMap(map1, map2), false)
    })

    it('returns false for maps with different object references as values', () => {
        const map1 = new Map([['key', { id: 1 }]])
        const map2 = new Map([['key', { id: 1 }]])
        assert.strictEqual(isSameMap(map1, map2), false) // strict equality fails for objects
    })

    it('returns false if the first argument is not a Map', () => {
        assert.strictEqual(isSameMap({}, new Map()), false)
        assert.strictEqual(isSameMap(null, new Map()), false)
        assert.strictEqual(isSameMap(new Set(), new Map()), false)
    })

    it('throws a TypeError if the reference value is not a Map', () => {
        assert.throws(() => isSameMap(new Map(), null as unknown as Map<any, any>), TypeError)
        assert.throws(() => isSameMap(new Map(), {} as unknown as Map<any, any>), TypeError)
    })
})
