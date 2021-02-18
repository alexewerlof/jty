import { isUnsh } from "../src"

describe('isUnsh()', () => {
    it('returns true if the provided value is not undefined or null', () => {
        expect(isUnsh('Good morning')).toBe(true)
        expect(isUnsh('')).toBe(true)
        expect(isUnsh(13)).toBe(true)
        expect(isUnsh(0)).toBe(true)
        expect(isUnsh(true)).toBe(true)
        expect(isUnsh(false)).toBe(true)
        expect(isUnsh(NaN)).toBe(true)
        expect(isUnsh({})).toBe(true)
        expect(isUnsh([])).toBe(true)
    })

    it('returns false if the provided value is undefined or null', () => {
        // @ts-expect-error
        expect(isUnsh()).toBe(false)
        expect(isUnsh(undefined)).toBe(false)
        expect(isUnsh(null)).toBe(false)
    })
})
