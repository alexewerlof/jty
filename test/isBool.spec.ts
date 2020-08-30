import { isBool } from "../src"

describe('isBool()', () => {
    it('returns true if the provided value is boolean', () => {
        expect(isBool(true)).toBe(true)
        expect(isBool(false)).toBe(true)
    })

    it('returns false for any non-boolean value', () => {
        expect(isBool('')).toBe(false)
        expect(isBool(0)).toBe(false)
        expect(isBool(null)).toBe(false)
        // @ts-expect-error
        expect(isBool()).toBe(false)
        expect(isBool(undefined)).toBe(false)
    })
})