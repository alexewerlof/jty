import { hasProp } from "../src"

describe('hasProp()', () => {
    it('returns true only if the property exist on the target', () => {
        const target = { foo: 'bar'}

        expect(hasProp(target, 'foo')).toBe(true)
        expect(hasProp(target, 'baz')).toBe(false)
    })

    it('does not care about the value of the property', () => {
        expect(hasProp({ u: undefined }, 'u')).toBe(true)
    })

    it('returns false if the target is not an object', () => {
        expect(hasProp('Hello', 'length')).toBe(false)
        expect(hasProp(3, 'toFixed')).toBe(false)
        expect(hasProp(true, 'valueOf')).toBe(false)
        expect(hasProp(undefined, 'basically')).toBe(false)
        expect(hasProp(null, 'yes')).toBe(false)
    })

    it('returns true for the getter or setter properties', () => {
        class A {
            _s: number
            get g() { return true }
            set s(val: number) { this._s = val }
        }

        expect(hasProp(new A, 'g')).toBe(true)
        expect(hasProp(new A, 's')).toBe(true)
    })

    it('can check existence of multiple properties', () => {
        const target = { foo: 'bar', baz: 'cux'}

        expect(hasProp(target, 'foo', 'baz')).toBe(true)
        // returns false if any of the properties is missing
        expect(hasProp(target, 'foo', 'what')).toBe(false)
    })

    it('supports arrays', () => {
        const target = [10, 20, 30]

        expect(hasProp(target, 0, 1)).toBe(true)
        expect(hasProp(target, 10, 11)).toBe(false)
    })

    it('supports the length property of arrays', () => {
        expect(hasProp([], 'length')).toBe(true)
    })

    it('returns true for "__proto__"', () => {
        expect(hasProp({}, '__proto__')).toBe(true)
    })

    it('returns true for other standard inherited properties', () => {
        expect(hasProp({}, 'constructor')).toBe(true)
        expect(hasProp({}, 'hasOwnProperty')).toBe(true)
        expect(hasProp({}, 'isPrototypeOf')).toBe(true)
        expect(hasProp({}, 'propertyIsEnumerable')).toBe(true)
        expect(hasProp({}, 'toLocaleString')).toBe(true)
        expect(hasProp({}, 'toString')).toBe(true)
        expect(hasProp({}, 'valueOf')).toBe(true)
        expect(hasProp({}, '__defineGetter__')).toBe(true)
        expect(hasProp({}, '__defineSetter__')).toBe(true)
        expect(hasProp({}, '__lookupGetter__')).toBe(true)
        expect(hasProp({}, '__lookupSetter__')).toBe(true)
    })

    it('supports prototypically inherited properties', () => {
        const obj = Object.create({ foo: 'bar' })

        expect(hasProp(obj, 'foo')).toBe(true)
    })
})