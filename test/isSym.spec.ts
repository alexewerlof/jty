import { isSym } from "../src"

describe('isSym()', () => {
    it('returns true for a symbol', () => {
        expect(isSym(Symbol())).toBe(true)
        expect(isSym(Symbol('test-symbol'))).toBe(true)
        expect(isSym(Symbol.iterator)).toBe(true)
        expect(isSym(Symbol.asyncIterator)).toBe(true)
    })
    
    it('returns false for non-symbols', () => {
        expect(isSym(Symbol)).toBe(false)
        expect(isSym(false)).toBe(false)
        expect(isSym(true)).toBe(false)
        expect(isSym(NaN)).toBe(false)
        expect(isSym(0)).toBe(false)
        expect(isSym('')).toBe(false)
        expect(isSym('str')).toBe(false)
        expect(isSym(() => void 0)).toBe(false)
    })
})
