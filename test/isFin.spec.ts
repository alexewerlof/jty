import { isFin } from "../src"

describe('isFin()', () => {
    it('returns true for a number or BigInt', () => {
        expect(isFin(1)).toBe(true)
        expect(isFin(1.1)).toBe(true)
        expect(isFin(-1)).toBe(true)
        expect(isFin(-1.1)).toBe(true)
        expect(isFin(0)).toBe(true)
        expect(isFin(1n)).toBe(true)
        expect(isFin(-1n)).toBe(true)
    })

    it('returns false for non finite values', () => {
        expect(isFin('1')).toBe(false)
        expect(isFin('1n')).toBe(false)
        expect(isFin(NaN)).toBe(false)
        expect(isFin(null)).toBe(false)
        expect(isFin(Infinity)).toBe(false)
        expect(isFin(-Infinity)).toBe(false)
    })


    it('works for BigInt and numerical bounds', () => {
        expect(isFin(1, 1n, 1n))
        expect(isFin(1, 0n, 2n))
        expect(isFin(1, -2n, 3))
        expect(isFin(1, -3, 4n))
        expect(isFin(1n, -4n, 5n))
        expect(isFin(1n, -5n, 6))
        expect(isFin(1n, -6, 7n))
    })
})