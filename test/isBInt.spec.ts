import { isBInt } from "../src"

describe('isBInt()', () => {
    it('returns true when the value is an integer', () => {
        expect(isBInt(18n)).toBe(true)
        expect(isBInt(0n)).toBe(true)
        expect(isBInt(-13n)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isBInt(NaN)).toBe(false)
    })

    it('returns false for string numbers', () => {
        expect(isBInt('21')).toBe(false)
        expect(isBInt('23n')).toBe(false)
    })

    it('returns false for non-numerical values', () => {
        expect(isBInt('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isBInt(BigInt(Number.MAX_SAFE_INTEGER))).toBe(true)
        expect(isBInt(BigInt(Number.MIN_SAFE_INTEGER))).toBe(true)
    })

    it('checks range', () => {
        expect(isBInt(18n, 17n, 20n)).toBe(true)
        expect(isBInt(18n, 17, 18n)).toBe(true)
        expect(isBInt(18n, 18n, 20)).toBe(true)
        expect(isBInt(18n, 18n)).toBe(true)
        expect(isBInt(18n, undefined, 18n)).toBe(true)
    })

    it('returns false for non-integer numbers even when they are in range', () => {
        expect(isBInt(19.1, 19)).toBe(false)
        expect(isBInt(19.1, undefined, 19)).toBe(false)
    })
})