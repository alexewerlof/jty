import { hasOPath } from "../src"

describe('hasOPath()', () => {
    it('returns true if the object has that property', () => {
        expect(hasOPath({ foo: 'bar' }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        expect(hasOPath({ foo: { bar: 'qux' } }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        expect(hasOPath({ foo: undefined }, 'foo')).toBe(true)
    })

    it('returns false if the property name is missing', () => {
        expect(hasOPath({ foo: 'bar' })).toBe(false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        expect(hasOPath({ 'undefined': 'yes' }, 'undefined')).toBe(true)
    })

    it('returns false for "prototype"', () => {
        expect(hasOPath({}, 'prototype')).toBe(false)
        expect(hasOPath({}, '__proto__')).toBe(false)
    })

    it('woks for arrays', () => {
        expect(hasOPath([1, 2, 3], 1)).toBe(true)
        expect(hasOPath([1, 2, 3], -1)).toBe(false)
        expect(hasOPath([1, 2, 3], 0)).toBe(true)
        expect(hasOPath([1, 2, 3], '0')).toBe(true)
        expect(hasOPath([1, 2, 3], '1')).toBe(true)
        expect(hasOPath([1, 2, 3], '-1')).toBe(false)
        expect(hasOPath([1, 2, 3], 'length')).toBe(true)
    })

    it('returns false for getter properties because they use prototype inheritance', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        expect(hasOPath(a, 'b')).toBe(false)
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
        expect(hasOPath(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasOPath(obj, 'a', 'b', '1', 'c1')).toBe(true)
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
        expect(hasOPath(obj, 'a', 'b', 0, 'c0')).toBe(false)
        expect(hasOPath(obj, 'a', 'b', '1', 'c1')).toBe(false)
    })
})
