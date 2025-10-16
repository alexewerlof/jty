import { describe, it } from 'node:test'
import assert from 'node:assert'
import { hasProp } from '../src/index.ts'

describe('hasProp()', () => {
    it('returns true only if the property exist on the target', () => {
        const target = { foo: 'bar' }

        assert.strictEqual(hasProp(target, 'foo'), true)
        assert.strictEqual(hasProp(target, 'baz'), false)
    })

    it('does not care about the value of the property', () => {
        assert.strictEqual(hasProp({ u: undefined }, 'u'), true)
    })

    it('returns false if the target is not an object', () => {
        assert.strictEqual(hasProp('Hello', 'length'), false)
        assert.strictEqual(hasProp(3, 'toFixed'), false)
        assert.strictEqual(hasProp(true, 'valueOf'), false)
        assert.strictEqual(hasProp(undefined, 'basically'), false)
        assert.strictEqual(hasProp(null, 'yes'), false)
    })

    it('returns true for the getter or setter properties', () => {
        class A {
            _s = 5
            get g() {
                return true
            }
            set s(val: number) {
                this._s = val
            }
        }

        assert.strictEqual(hasProp(new A(), 'g'), true)
        assert.strictEqual(hasProp(new A(), 's'), true)
    })

    it('can check existence of multiple properties', () => {
        const target = { foo: 'bar', baz: 'cux' }

        assert.strictEqual(hasProp(target, 'foo', 'baz'), true)
        // returns false if any of the properties is missing
        assert.strictEqual(hasProp(target, 'foo', 'what'), false)
    })

    it('supports arrays', () => {
        const target = [10, 20, 30]

        assert.strictEqual(hasProp(target, 0, 1), true)
        assert.strictEqual(hasProp(target, 10, 11), false)
    })

    it('supports the length property of arrays', () => {
        assert.strictEqual(hasProp([], 'length'), true)
    })

    it('returns true for "__proto__"', () => {
        assert.strictEqual(hasProp({}, '__proto__'), true)
    })

    it('returns true for other standard inherited properties', () => {
        assert.strictEqual(hasProp({}, 'constructor'), true)
        assert.strictEqual(hasProp({}, 'hasOwnProperty'), true)
        assert.strictEqual(hasProp({}, 'isPrototypeOf'), true)
        assert.strictEqual(hasProp({}, 'propertyIsEnumerable'), true)
        assert.strictEqual(hasProp({}, 'toLocaleString'), true)
        assert.strictEqual(hasProp({}, 'toString'), true)
        assert.strictEqual(hasProp({}, 'valueOf'), true)
        assert.strictEqual(hasProp({}, '__defineGetter__'), true)
        assert.strictEqual(hasProp({}, '__defineSetter__'), true)
        assert.strictEqual(hasProp({}, '__lookupGetter__'), true)
        assert.strictEqual(hasProp({}, '__lookupSetter__'), true)
    })

    it('supports prototypically inherited properties', () => {
        const obj = Object.create({ foo: 'bar' })

        assert.strictEqual(hasProp(obj, 'foo'), true)
    })

    it('returns true if no prop is provided', () => {
        assert.strictEqual(hasProp({}), true)
    })

    it('returns true if no prop is provided', () => {
        assert.strictEqual(hasProp({}), true)
    })

    it('returns true if there is actually a property called undefined', () => {
        assert.strictEqual(
            hasProp(
                {
                    undefined: undefined,
                },
                'undefined',
            ),
            true,
        )
    })
})
