import { hasPath } from "../src"

describe('hasPath()', () => {
    it('returns true if the object has that property', () => {
        expect(hasPath({ foo: 'bar' }, 'foo')).toBe(true)
    })

    it('can dig deep into the object', () => {
        const obj = {
            foo: {
                bar: {
                    baz: undefined
                }
            }
        }

        expect(hasPath(obj, 'foo', 'bar', 'baz')).toBe(true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        expect(hasPath({ foo: { bar: 'qux' } }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        expect(hasPath({ foo: undefined }, 'foo')).toBe(true)
    })

    it('returns false if the property name is missing', () => {
        expect(hasPath({ foo: 'bar' })).toBe(false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        expect(hasPath({ undefined: 'one' })).toBe(false)
        // @ts-ignore
        expect(hasPath({ undefined: 'thress' }, undefined)).toBe(true)
        expect(hasPath({ undefined: 'two' }, 'undefined')).toBe(true)

    })

    it('returns true for "__proto__"', () => {
        expect(hasPath({}, '__proto__')).toBe(true)
    })

    it('returns true for other standard inherited properties', () => {
        expect(hasPath({}, 'constructor')).toBe(true)
        expect(hasPath({}, 'hasOwnProperty')).toBe(true)
        expect(hasPath({}, 'isPrototypeOf')).toBe(true)
        expect(hasPath({}, 'propertyIsEnumerable')).toBe(true)
        expect(hasPath({}, 'toLocaleString')).toBe(true)
        expect(hasPath({}, 'toString')).toBe(true)
        expect(hasPath({}, 'valueOf')).toBe(true)
        expect(hasPath({}, '__defineGetter__')).toBe(true)
        expect(hasPath({}, '__defineSetter__')).toBe(true)
        expect(hasPath({}, '__lookupGetter__')).toBe(true)
        expect(hasPath({}, '__lookupSetter__')).toBe(true)
    })

    it('woks for arrays', () => {
        expect(hasPath([1, 2, 3], 1)).toBe(true)
        expect(hasPath([1, 2, 3], -1)).toBe(false)
        expect(hasPath([1, 2, 3], 0)).toBe(true)
        expect(hasPath([1, 2, 3], '0')).toBe(true)
        expect(hasPath([1, 2, 3], '1')).toBe(true)
        expect(hasPath([1, 2, 3], '-1')).toBe(false)
        expect(hasPath([1, 2, 3], 'length')).toBe(true)
    })

    it('returns true for getter properties', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        expect(hasPath(a, 'b')).toBe(true)
    })

    it('returns true for setter properties', () => {
        class ClassWithSetter {
            _value:number
            set b(value: number) {
                this._value = value
            }
        }

        const a = new ClassWithSetter
        expect(hasPath(a, 'b')).toBe(true)
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
        expect(hasPath(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasPath(obj, 'a', 'b', '1', 'c1')).toBe(true)
    })
    
    it('works on property chains with prototypes', () => {
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
        expect(hasPath(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasPath(obj, 'a', 'b', '1', 'c1')).toBe(true)
    })
})
