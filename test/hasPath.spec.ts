import { describe, it } from 'node:test'
import assert from 'node:assert'
import { hasPath } from '../src/index.ts'

describe('hasPath()', () => {
    it('returns true if the object has that property', () => {
        assert.strictEqual(hasPath({ foo: 'bar' }, 'foo'), true)
    })

    it('can dig deep into the object', () => {
        const obj = {
            foo: {
                bar: {
                    baz: undefined,
                },
            },
        }

        assert.strictEqual(hasPath(obj, 'foo', 'bar', 'baz'), true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        assert.strictEqual(hasPath({ foo: { bar: 'qux' } }, 'foo'), true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        assert.strictEqual(hasPath({ foo: undefined }, 'foo'), true)
    })

    it('returns false if the property name is missing', () => {
        assert.strictEqual(hasPath({ foo: 'bar' }), false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        assert.strictEqual(hasPath({ undefined: 'one' }), false)
        // @ts-ignore
        assert.strictEqual(hasPath({ undefined: 'thress' }, undefined), true)
        assert.strictEqual(hasPath({ undefined: 'two' }, 'undefined'), true)
    })

    it('returns true for "__proto__"', () => {
        assert.strictEqual(hasPath({}, '__proto__'), true)
    })

    it('returns true for other standard inherited properties', () => {
        assert.strictEqual(hasPath({}, 'constructor'), true)
        assert.strictEqual(hasPath({}, 'hasOwnProperty'), true)
        assert.strictEqual(hasPath({}, 'isPrototypeOf'), true)
        assert.strictEqual(hasPath({}, 'propertyIsEnumerable'), true)
        assert.strictEqual(hasPath({}, 'toLocaleString'), true)
        assert.strictEqual(hasPath({}, 'toString'), true)
        assert.strictEqual(hasPath({}, 'valueOf'), true)
        assert.strictEqual(hasPath({}, '__defineGetter__'), true)
        assert.strictEqual(hasPath({}, '__defineSetter__'), true)
        assert.strictEqual(hasPath({}, '__lookupGetter__'), true)
        assert.strictEqual(hasPath({}, '__lookupSetter__'), true)
    })

    it('woks for arrays', () => {
        assert.strictEqual(hasPath([1, 2, 3], 1), true)
        assert.strictEqual(hasPath([1, 2, 3], -1), false)
        assert.strictEqual(hasPath([1, 2, 3], 0), true)
        assert.strictEqual(hasPath([1, 2, 3], '0'), true)
        assert.strictEqual(hasPath([1, 2, 3], '1'), true)
        assert.strictEqual(hasPath([1, 2, 3], '-1'), false)
        assert.strictEqual(hasPath([1, 2, 3], 'length'), true)
    })

    it('returns true for getter properties', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A()
        assert.strictEqual(hasPath(a, 'b'), true)
    })

    it('returns true for setter properties', () => {
        class ClassWithSetter {
            _value: number
            set b(value: number) {
                this._value = value
            }
        }

        const a = new ClassWithSetter()
        assert.strictEqual(hasPath(a, 'b'), true)
    })

    it('works on property chains', () => {
        const obj = {
            a: {
                b: [
                    {
                        c0: 100,
                    },
                    {
                        c1: 101,
                    },
                ],
            },
        }
        assert.strictEqual(hasPath(obj, 'a', 'b', 0, 'c0'), true)
        assert.strictEqual(hasPath(obj, 'a', 'b', '1', 'c1'), true)
    })

    it('works on property chains with prototypes', () => {
        const obj = {
            a: Object.create({
                b: [
                    {
                        c0: 100,
                    },
                    {
                        c1: 101,
                    },
                ],
            }),
        }
        assert.strictEqual(hasPath(obj, 'a', 'b', 0, 'c0'), true)
        assert.strictEqual(hasPath(obj, 'a', 'b', '1', 'c1'), true)
    })
})
