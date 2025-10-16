import { describe, it } from 'node:test'
import assert from 'node:assert'
import { hasOwnProp } from '../src/index.ts'

describe('hasOwnProp()', () => {
    it('returns true only if the property exist on the target', () => {
        const target = { foo: 'bar' }

        assert.strictEqual(hasOwnProp(target, 'foo'), true)
        assert.strictEqual(hasOwnProp(target, 'baz'), false)
    })

    it('does not care about the value of the property', () => {
        assert.strictEqual(hasOwnProp({ u: undefined }, 'u'), true)
    })

    it('returns false if the target is not an object', () => {
        assert.strictEqual(hasOwnProp('Hello', 'length'), false)
        assert.strictEqual(hasOwnProp(3, 'toFixed'), false)
        assert.strictEqual(hasOwnProp(true, 'valueOf'), false)
        assert.strictEqual(hasOwnProp(undefined, 'basically'), false)
        assert.strictEqual(hasOwnProp(null, 'yes'), false)
    })

    it('returns false for the getter or setter properties', () => {
        class A {
            _s = 13
            get g() {
                return true
            }
            set s(val: number) {
                this._s = val
            }
        }

        assert.strictEqual(hasOwnProp(new A(), 'g'), false)
        assert.strictEqual(hasOwnProp(new A(), 's'), false)
    })

    it('can check existence of multiple properties', () => {
        const target = { foo: 'bar', baz: 'cux' }

        assert.strictEqual(hasOwnProp(target, 'foo', 'baz'), true)
        // returns false if any of the properties is missing
        assert.strictEqual(hasOwnProp(target, 'foo', 'what'), false)
    })

    it('supports arrays', () => {
        const target = [10, 20, 30]

        assert.strictEqual(hasOwnProp(target, 0, 1), true)
        assert.strictEqual(hasOwnProp(target, 10, 11), false)
    })

    it('supports the length property of arrays', () => {
        assert.strictEqual(hasOwnProp([], 'length'), true)
    })

    it('returns false for "__proto__"', () => {
        assert.strictEqual(hasOwnProp({}, '__proto__'), false)
    })

    it('returns false for other standard inherited properties', () => {
        assert.strictEqual(hasOwnProp({}, 'constructor'), false)
        assert.strictEqual(hasOwnProp({}, 'hasOwnProperty'), false)
        assert.strictEqual(hasOwnProp({}, 'isPrototypeOf'), false)
        assert.strictEqual(hasOwnProp({}, 'propertyIsEnumerable'), false)
        assert.strictEqual(hasOwnProp({}, 'toLocaleString'), false)
        assert.strictEqual(hasOwnProp({}, 'toString'), false)
        assert.strictEqual(hasOwnProp({}, 'valueOf'), false)
        assert.strictEqual(hasOwnProp({}, '__defineGetter__'), false)
        assert.strictEqual(hasOwnProp({}, '__defineSetter__'), false)
        assert.strictEqual(hasOwnProp({}, '__lookupGetter__'), false)
        assert.strictEqual(hasOwnProp({}, '__lookupSetter__'), false)
    })

    it('returns false for inherited properties', () => {
        const obj = Object.create({ foo: 'bar' })

        assert.strictEqual(hasOwnProp(obj, 'foo'), false)
    })

    it('returns true if no prop is provided', () => {
        assert.strictEqual(hasOwnProp({}), true)
    })

    it('returns true if no prop is provided', () => {
        assert.strictEqual(hasOwnProp({}), true)
    })

    it('returns true if there is actually a property called undefined', () => {
        assert.strictEqual(
            hasOwnProp(
                {
                    undefined: undefined,
                },
                'undefined',
            ),
            true,
        )
    })
})
