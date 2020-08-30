import { isA } from "../src"

describe('isA()', () => {
    it('returns true if an object is an instance of the provided class', () => {
        expect(isA({}, Object)).toBe(true)

        class A {}
        const a = new A

        expect(isA(a, A)).toBe(true)
        expect(isA(a, Object)).toBe(true)
    })

    it('returns false if the provided "class" is not a function', () => {
        // @ts-expect-error
        expect(isA({}, null)).toBe(false)
        // @ts-expect-error
        expect(isA({}, undefined)).toBe(false)
        // @ts-expect-error
        expect(isA({}, 'lamborghini')).toBe(false)
        // @ts-expect-error
        expect(isA({}, NaN)).toBe(false)
        // @ts-expect-error
        expect(isA({}, false)).toBe(false)
        // @ts-expect-error
        expect(isA({}, 1)).toBe(false)
        // @ts-expect-error
        expect(isA({}, [])).toBe(false)
        // @ts-expect-error
        expect(isA({}, {})).toBe(false)
    })

    it('works for regular expressions', () => {
        expect(isA(/hello/i, RegExp)).toBe(true)
    })
    
    it('works for promises', () => {
        expect(isA(Promise.resolve(), Promise)).toBe(true)
        expect(isA(Promise.reject(), Promise)).toBe(true)
    })

    it('works for strings', () => {
        expect(isA('plain str', String)).toBe(false)
        expect(isA(new String('str obj'), String)).toBe(true)
    })

    it('works for numbers', () => {
        expect(isA(22, Number)).toBe(false)
        expect(isA(new Number(33), Number)).toBe(true)
    })
})