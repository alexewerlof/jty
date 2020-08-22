import { isStr } from "../src"

describe('isStr', () => {
    it('returns true for a string', () => {
        expect(isStr('Hello')).toBe(true)
    })

    it('returns false for a non-string value', () => {
        expect(isStr(null)).toBe(false)
    })

    it('returns true for an empty string when no minimum length is specified', () => {
        expect(isStr('')).toBe(true)
    })

    it('can match the length', () => {
        expect(isStr('', 0)).toBe(true)
        expect(isStr('', 1)).toBe(false)
        expect(isStr('H', 0, 1)).toBe(true)
        expect(isStr('H', 1)).toBe(true)
        expect(isStr('H', 2)).toBe(false)
        expect(isStr('Hi', 1)).toBe(true)
        expect(isStr('Hi', 2)).toBe(true)
        expect(isStr('Hi', 3)).toBe(false)
    })

    it('can match length range', () => {
        const str = 'Hello'
        expect(isStr(str, undefined, 6)).toBe(true)
        expect(isStr(str, 0, 6)).toBe(true)
        expect(isStr(str, -1, 6)).toBe(true)
        expect(isStr(str, -1.1, 5.1)).toBe(true)
        expect(isStr(str, 5, 6)).toBe(true)
        expect(isStr(str, 4, 6)).toBe(true)
        expect(isStr(str, 4, 5)).toBe(true)
        expect(isStr(str, undefined, 5)).toBe(true)
    })

    it('does not choke if the max is less than min', () => {
        const str = 'Hello'
        expect(isStr(str, 6, 5)).toBe(false)
        expect(isStr(str, 6, 4)).toBe(false)
        expect(isStr(str, 5, 4)).toBe(false)
    })
})
