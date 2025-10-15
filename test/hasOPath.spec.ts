import { describe, it } from 'node:test'
import assert from 'node:assert'
import { hasOPath } from "../src/index.ts"

describe('hasOPath()', () => {
    it('returns true if the object has that property', () => {
        assert.strictEqual(hasOPath({ foo: 'bar' }, 'foo'), true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        assert.strictEqual(hasOPath({ foo: { bar: 'qux' } }, 'foo'), true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        assert.strictEqual(hasOPath({ foo: undefined }, 'foo'), true)
    })

    it('returns false if the property name is missing', () => {
        assert.strictEqual(hasOPath({ foo: 'bar' }), false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        assert.strictEqual(hasOPath({ 'undefined': 'yes' }, 'undefined'), true)
    })

    it('returns false for "prototype"', () => {
        assert.strictEqual(hasOPath({}, 'prototype'), false)
        assert.strictEqual(hasOPath({}, '__proto__'), false)
    })

    it('woks for arrays', () => {
        assert.strictEqual(hasOPath([1, 2, 3], 1), true)
        assert.strictEqual(hasOPath([1, 2, 3], -1), false)
        assert.strictEqual(hasOPath([1, 2, 3], 0), true)
        assert.strictEqual(hasOPath([1, 2, 3], '0'), true)
        assert.strictEqual(hasOPath([1, 2, 3], '1'), true)
        assert.strictEqual(hasOPath([1, 2, 3], '-1'), false)
        assert.strictEqual(hasOPath([1, 2, 3], 'length'), true)
    })

    it('returns false for getter properties because they use prototype inheritance', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        assert.strictEqual(hasOPath(a, 'b'), false)
    })

    it('works on property chains', () => {
        const obj = {
            a: {
                b: [
                    {
                        c0: 100
                    },
                    {
                        c1: 101
                    }
                ]
            }
        }
        assert.strictEqual(hasOPath(obj, 'a', 'b', 0, 'c0'), true)
        assert.strictEqual(hasOPath(obj, 'a', 'b', '1', 'c1'), true)
    })
    
    it('does not honor property chains with prototypes', () => {
        const obj = {
            a: Object.create({
                b: [
                    {
                        c0: 100
                    },
                    {
                        c1: 101
                    }
                ]
            })
        }
        assert.strictEqual(hasOPath(obj, 'a', 'b', 0, 'c0'), false)
        assert.strictEqual(hasOPath(obj, 'a', 'b', '1', 'c1'), false)
    })
})
