import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isEqualObj } from '../src/index.js'

describe('isEqualObj()', () => {
    it('returns true for the same object instance', () => {
        const obj = { a: 1 }
        assert.strictEqual(isEqualObj(obj, obj), true)
    })

    it('returns true for two empty objects', () => {
        assert.strictEqual(isEqualObj({}, {}), true)
    })

    it('returns true for two objects with same primitive key-value pairs, regardless of order', () => {
        const obj1 = { a: 1, b: 'hello', c: true }
        const obj2 = { b: 'hello', c: true, a: 1 }
        assert.strictEqual(isEqualObj(obj1, obj2), true)
    })

    it('returns false for objects with different number of keys', () => {
        const obj1 = { a: 1 }
        const obj2 = { a: 1, b: 2 }
        assert.strictEqual(isEqualObj(obj1, obj2), false)
    })

    it('returns false for objects with different keys', () => {
        const obj1 = { a: 1 }
        const obj2 = { b: 1 }
        assert.strictEqual(isEqualObj(obj1, obj2), false)
    })

    it('returns false for objects with same keys but different values', () => {
        const obj1 = { a: 1 }
        const obj2 = { a: 2 }
        assert.strictEqual(isEqualObj(obj1, obj2), false)
    })

    it('returns true for deeply equal nested objects', () => {
        const obj1 = { a: { b: { c: 1 } }, d: [1, 2] }
        const obj2 = { a: { b: { c: 1 } }, d: [1, 2] }
        assert.strictEqual(isEqualObj(obj1, obj2), true)
    })

    it('returns false for deeply unequal nested objects', () => {
        const obj1 = { a: { b: { c: 1 } } }
        const obj2 = { a: { b: { c: 2 } } }
        assert.strictEqual(isEqualObj(obj1, obj2), false)
    })

    it('correctly compares objects containing arrays', () => {
        assert.strictEqual(isEqualObj({ a: [1, 2] }, { a: [1, 2] }), true)
        assert.strictEqual(isEqualObj({ a: [1, 2] }, { a: [2, 1] }), false)
    })

    it('correctly compares objects containing Date objects', () => {
        const d = new Date()
        assert.strictEqual(isEqualObj({ t: new Date(d.getTime()) }, { t: new Date(d.getTime()) }), true)
        assert.strictEqual(isEqualObj({ t: new Date() }, { t: new Date(1) }), false)
    })

    it('correctly compares objects containing RegExp objects', () => {
        assert.strictEqual(isEqualObj({ r: /abc/gi }, { r: /abc/gi }), true)
        assert.strictEqual(isEqualObj({ r: /abc/g }, { r: /abc/i }), false)
    })

    it('correctly compares objects containing Set objects', () => {
        assert.strictEqual(isEqualObj({ s: new Set([1, 2]) }, { s: new Set([2, 1]) }), true)
        assert.strictEqual(isEqualObj({ s: new Set([1]) }, { s: new Set([2]) }), false)
    })

    it('correctly compares objects containing Map objects', () => {
        const map1 = new Map([['a', 1]])
        const map2 = new Map([['a', 1]])
        const map3 = new Map([['b', 2]])
        assert.strictEqual(isEqualObj({ m: map1 }, { m: map2 }), true)
        assert.strictEqual(isEqualObj({ m: map1 }, { m: map3 }), false)
    })

    it('returns false for objects with different constructors', () => {
        class MyClass {}
        const obj1 = {}
        const obj2 = new MyClass()
        assert.strictEqual(isEqualObj(obj1, obj2), false)
    })

    it('returns false when comparing an object to a non-object', () => {
        assert.strictEqual(isEqualObj(null, {}), false)
        assert.strictEqual(isEqualObj(undefined, {}), false)
        assert.strictEqual(isEqualObj(123, {}), false)
    })

    it('returns false when comparing an array and an object', () => {
        assert.strictEqual(isEqualObj([], {}), false)
        assert.strictEqual(isEqualObj({}, []), false)
    })

    it('throws a TypeError if the reference value is not an object', () => {
        assert.throws(() => isEqualObj({}, null as unknown as object), TypeError)
        assert.throws(() => isEqualObj({}, 123 as unknown as object), TypeError)
        assert.throws(() => isEqualObj({}, undefined as unknown as object), TypeError)
    })
})
