import { isInt } from "../src"

describe('isInt', () => {
    it('returns true when the value is an integer', () => {
        expect(isInt(17)).toBe(true)
        expect(isInt(Math.PI)).toBe(false)
        expect(isInt(0)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isInt(NaN)).toBe(false)
    })

    it('returns false for string numbers', () => {
        expect(isInt('13')).toBe(false)
    })

    it('returns false for non-numerical values', () => {
        expect(isInt('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isInt(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(isInt(Number.MIN_SAFE_INTEGER)).toBe(true)
    })

    it('checks range', () => {
        expect(isInt(19, 17, 20)).toBe(true)
        expect(isInt(19, 17, 19)).toBe(true)
        expect(isInt(19, 19, 20)).toBe(true)
        expect(isInt(19, 19)).toBe(true)
        expect(isInt(19, undefined, 19)).toBe(true)
    })

    it('returns false for non-integer numbers even when they are in range', () => {
        expect(isInt(19.1, 19)).toBe(false)
        expect(isInt(19.1, undefined, 19)).toBe(false)
    })
})