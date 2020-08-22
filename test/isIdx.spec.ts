import { isIdx } from "../src"

describe('isIdx', () => {
    it('checks if a value is a valid index for an array', () => {
        const arr = [10, 20, 30]
        expect(isIdx(0, arr)).toBe(true)
        expect(isIdx(1, arr)).toBe(true)
        expect(isIdx(2, arr)).toBe(true)
        expect(isIdx(3, arr)).toBe(false)
        expect(isIdx(-1, arr)).toBe(false)
        expect(isIdx(1.1, arr)).toBe(false)
    })

    it('returns false for non-array objects', () => {
        expect(isIdx(0, { 0: 'zero' } as unknown as any[])).toBe(false)
    })

    it('returns false for non numerical indices', () => {
        expect(isIdx('0', [10, 20, 30])).toBe(false)
    })
    
    it('works correctly for strings', () => {
        const str = 'Boy'
        expect(isIdx(0, str)).toBe(true)
        expect(isIdx(1, str)).toBe(true)
        expect(isIdx(2, str)).toBe(true)
        expect(isIdx(3, str)).toBe(false)
        expect(isIdx(-1, str)).toBe(false)
        expect(isIdx(1.1, str)).toBe(false)
    })
})