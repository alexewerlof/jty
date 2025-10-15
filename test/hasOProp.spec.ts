import { describe, it } from 'node:test'
import assert from 'node:assert'
import { hasOProp } from "../src/index.ts"

describe('hasOProp()', () => {
    it('returns true only if the property exist on the target', () => {
        const target = { foo: 'bar'}

        assert.strictEqual(hasOProp(target, 'foo'), true)
        assert.strictEqual(hasOProp(target, 'baz'), false)
    })

    it('does not care about the value of the property', () => {
        assert.strictEqual(hasOProp({ u: undefined }, 'u'), true)
    })

    it('returns false if the target is not an object', () => {
        assert.strictEqual(hasOProp('Hello', 'length'), false)
        assert.strictEqual(hasOProp(3, 'toFixed'), false)
        assert.strictEqual(hasOProp(true, 'valueOf'), false)
        assert.strictEqual(hasOProp(undefined, 'basically'), false)
        assert.strictEqual(hasOProp(null, 'yes'), false)
    })

    it('returns false for the getter or setter properties', () => {
        class A {
            _s: number
            get g() { return true }
            set s(val: number) { this._s = val }
        }

        assert.strictEqual(hasOProp(new A, 'g'), false)
        assert.strictEqual(hasOProp(new A, 's'), false)
    })

    it('can check existence of multiple properties', () => {
        const target = { foo: 'bar', baz: 'cux'}

        assert.strictEqual(hasOProp(target, 'foo', 'baz'), true)
        // returns false if any of the properties is missing
        assert.strictEqual(hasOProp(target, 'foo', 'what'), false)
    })

    it('supports arrays', () => {
        const target = [10, 20, 30]

        assert.strictEqual(hasOProp(target, 0, 1), true)
        assert.strictEqual(hasOProp(target, 10, 11), false)
    })

    it('supports the length property of arrays', () => {
        assert.strictEqual(hasOProp([], 'length'), true)
    })

    it('returns false for "__proto__"', () => {
        assert.strictEqual(hasOProp({}, '__proto__'), false)
    })

    it('returns false for other standard inherited properties', () => {
        assert.strictEqual(hasOProp({}, 'constructor'), false)
        assert.strictEqual(hasOProp({}, 'hasOwnProperty'), false)
        assert.strictEqual(hasOProp({}, 'isPrototypeOf'), false)
        assert.strictEqual(hasOProp({}, 'propertyIsEnumerable'), false)
        assert.strictEqual(hasOProp({}, 'toLocaleString'), false)
        assert.strictEqual(hasOProp({}, 'toString'), false)
        assert.strictEqual(hasOProp({}, 'valueOf'), false)
        assert.strictEqual(hasOProp({}, '__defineGetter__'), false)
        assert.strictEqual(hasOProp({}, '__defineSetter__'), false)
        assert.strictEqual(hasOProp({}, '__lookupGetter__'), false)
        assert.strictEqual(hasOProp({}, '__lookupSetter__'), false)
    })

    it('returns false for inherited properties', () => {
        const obj = Object.create({ foo: 'bar' })

        assert.strictEqual(hasOProp(obj, 'foo'), false)
    })

    it('returns true if no prop is provided', () => {
        assert.strictEqual(hasOProp({}), true)
    })


    it('returns true if no prop is provided', () => {
        assert.strictEqual(hasOProp({}), true)
    })

    it('returns true if there is actually a property called undefined', () => {
        assert.strictEqual(hasOProp({
            undefined: undefined
        }, 'undefined'), true)
    })
})
