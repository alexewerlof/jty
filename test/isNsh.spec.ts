import { isNsh } from "../src"

describe('isNsh()', () => {
    it('returns false if the provided value is not undefined or null', () => {
        expect(isNsh('Good morning')).toBe(false)
        expect(isNsh('')).toBe(false)
        expect(isNsh(13)).toBe(false)
        expect(isNsh(0)).toBe(false)
        expect(isNsh(false)).toBe(false)
        expect(isNsh(NaN)).toBe(false)
        expect(isNsh({})).toBe(false)
        expect(isNsh([])).toBe(false)
    })

    it('returns true if the provided value is undefined or null', () => {
        // @ts-expect-error
        expect(isNsh()).toBe(true)
        expect(isNsh(undefined)).toBe(true)
        expect(isNsh(null)).toBe(true)
    })
})
