import { hasOProp } from "../src"

describe('hasOProp()', () => {
    it('returns true only if the property exist on the target', () => {
        const target = { foo: 'bar'}

        expect(hasOProp(target, 'foo')).toBe(true)
        expect(hasOProp(target, 'baz')).toBe(false)
    })

    it('does not care about the value of the property', () => {
        expect(hasOProp({ u: undefined }, 'u')).toBe(true)
    })

    it('returns false if the target is not an object', () => {
        expect(hasOProp('Hello', 'length')).toBe(false)
        expect(hasOProp(3, 'toFixed')).toBe(false)
        expect(hasOProp(true, 'valueOf')).toBe(false)
        expect(hasOProp(undefined, 'basically')).toBe(false)
        expect(hasOProp(null, 'yes')).toBe(false)
    })

    it('returns false for the getter or setter properties', () => {
        class A {
            _s: number
            get g() { return true }
            set s(val: number) { this._s = val }
        }

        expect(hasOProp(new A, 'g')).toBe(false)
        expect(hasOProp(new A, 's')).toBe(false)
    })

    it('can check existence of multiple properties', () => {
        const target = { foo: 'bar', baz: 'cux'}

        expect(hasOProp(target, 'foo', 'baz')).toBe(true)
        // returns false if any of the properties is missing
        expect(hasOProp(target, 'foo', 'what')).toBe(false)
    })

    it('supports arrays', () => {
        const target = [10, 20, 30]

        expect(hasOProp(target, 0, 1)).toBe(true)
        expect(hasOProp(target, 10, 11)).toBe(false)
    })

    it('supports the length property of arrays', () => {
        expect(hasOProp([], 'length')).toBe(true)
    })

    it('returns false for "__proto__"', () => {
        expect(hasOProp({}, '__proto__')).toBe(false)
    })

    it('returns false for other standard inherited properties', () => {
        expect(hasOProp({}, 'constructor')).toBe(false)
        expect(hasOProp({}, 'hasOwnProperty')).toBe(false)
        expect(hasOProp({}, 'isPrototypeOf')).toBe(false)
        expect(hasOProp({}, 'propertyIsEnumerable')).toBe(false)
        expect(hasOProp({}, 'toLocaleString')).toBe(false)
        expect(hasOProp({}, 'toString')).toBe(false)
        expect(hasOProp({}, 'valueOf')).toBe(false)
        expect(hasOProp({}, '__defineGetter__')).toBe(false)
        expect(hasOProp({}, '__defineSetter__')).toBe(false)
        expect(hasOProp({}, '__lookupGetter__')).toBe(false)
        expect(hasOProp({}, '__lookupSetter__')).toBe(false)
    })

    it('returns false for inherited properties', () => {
        const obj = Object.create({ foo: 'bar' })

        expect(hasOProp(obj, 'foo')).toBe(false)
    })
})