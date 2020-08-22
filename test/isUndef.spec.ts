import { isUndef } from "../src"

describe('isUndef', () => {
    it('returns false if the provided value is defined', () => {
        expect(isUndef('Hej')).toBe(false)
        expect(isUndef(13)).toBe(false)
        expect(isUndef(false)).toBe(false)
        expect(isUndef(NaN)).toBe(false)
        expect(isUndef({})).toBe(false)
        expect(isUndef([])).toBe(false)
    })

    it('returns true if the provided value is not defined', () => {
        // @ts-expect-error
        expect(isUndef()).toBe(true)
        expect(isUndef(undefined)).toBe(true)
    })
})
