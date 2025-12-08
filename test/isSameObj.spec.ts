import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameObj } from '../src/index'

describe('isSameObj()', () => {
    it('returns true for the same object instance', () => {
        const obj = { a: 1 }
        assert.strictEqual(isSameObj(obj, obj), true)
    })

    it('returns true for two empty objects', () => {
        assert.strictEqual(isSameObj({}, {}), true)
    })

    it('returns true for two objects with same primitive key-value pairs, regardless of order', () => {
        const obj1 = { a: 1, b: 'hello', c: true }
        const obj2 = { b: 'hello', c: true, a: 1 }
        assert.strictEqual(isSameObj(obj1, obj2), true)
    })

    it('returns false for objects with different number of keys', () => {
        const obj1 = { a: 1 }
        const obj2 = { a: 1, b: 2 }
        assert.strictEqual(isSameObj(obj1, obj2), false)
    })

    it('returns false for objects with different keys', () => {
        const obj1 = { a: 1 }
        const obj2 = { b: 1 }
        assert.strictEqual(isSameObj(obj1, obj2), false)
    })

    it('returns false for objects with same keys but different values', () => {
        const obj1 = { a: 1 }
        const obj2 = { a: 2 }
        assert.strictEqual(isSameObj(obj1, obj2), false)
    })

    it('returns true for deeply equal nested objects', () => {
        const obj1 = { a: { b: { c: 1 } }, d: [1, 2] }
        const obj2 = { a: { b: { c: 1 } }, d: [1, 2] }
        assert.strictEqual(isSameObj(obj1, obj2), true)
    })

    it('returns false for deeply unequal nested objects', () => {
        const obj1 = { a: { b: { c: 1 } } }
        const obj2 = { a: { b: { c: 2 } } }
        assert.strictEqual(isSameObj(obj1, obj2), false)
    })

    it('correctly compares objects containing arrays', () => {
        assert.strictEqual(isSameObj({ a: [1, 2] }, { a: [1, 2] }), true)
        assert.strictEqual(isSameObj({ a: [1, 2] }, { a: [2, 1] }), false)
    })

    it('correctly compares objects containing Date objects', () => {
        const d = new Date()
        assert.strictEqual(isSameObj({ t: new Date(d.getTime()) }, { t: new Date(d.getTime()) }), true)
        assert.strictEqual(isSameObj({ t: new Date() }, { t: new Date(1) }), false)
    })

    it('correctly compares objects containing RegExp objects', () => {
        assert.strictEqual(isSameObj({ r: /abc/gi }, { r: /abc/gi }), true)
        assert.strictEqual(isSameObj({ r: /abc/g }, { r: /abc/i }), false)
    })

    it('correctly compares objects containing Set objects', () => {
        assert.strictEqual(isSameObj({ s: new Set([1, 2]) }, { s: new Set([2, 1]) }), true)
        assert.strictEqual(isSameObj({ s: new Set([1]) }, { s: new Set([2]) }), false)
    })

    it('correctly compares objects containing Map objects', () => {
        const map1 = new Map([['a', 1]])
        const map2 = new Map([['a', 1]])
        const map3 = new Map([['b', 2]])
        assert.strictEqual(isSameObj({ m: map1 }, { m: map2 }), true)
        assert.strictEqual(isSameObj({ m: map1 }, { m: map3 }), false)
    })

    it('returns false for objects with different constructors', () => {
        class MyClass {}
        const obj1 = {}
        const obj2 = new MyClass()
        assert.strictEqual(isSameObj(obj1, obj2), false)
    })

    it('returns false when comparing an object to a non-object', () => {
        assert.strictEqual(isSameObj(null, {}), false)
        assert.strictEqual(isSameObj(undefined, {}), false)
        assert.strictEqual(isSameObj(123, {}), false)
    })

    it('returns false when comparing an array and an object', () => {
        assert.strictEqual(isSameObj([], {}), false)
        assert.strictEqual(isSameObj({}, []), false)
    })

    it('throws a TypeError if the reference value is not an object', () => {
        assert.throws(() => isSameObj({}, null as unknown as object), TypeError)
        assert.throws(() => isSameObj({}, 123 as unknown as object), TypeError)
        assert.throws(() => isSameObj({}, undefined as unknown as object), TypeError)
    })
})
