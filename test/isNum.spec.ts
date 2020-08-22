import { isNum } from '../src'

describe('isNum', () => {
    it('returns true when the value is a number', () => {
        expect(isNum(17)).toBe(true)
        expect(isNum(Math.PI)).toBe(true)
        expect(isNum(0)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isNum(NaN)).toBe(false)
    })

    it('returns false for string numbers', () => {
        expect(isNum('13')).toBe(false)
        expect(isNum('2', 1, 3)).toBe(false)
    })

    it('returns false for non-numerical values', () => {
        expect(isNum('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isNum(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(isNum(Number.MIN_SAFE_INTEGER)).toBe(true)
    })

    it('works if only min is specified', () => {
        expect(isNum(2, 1)).toBe(true)
        expect(isNum(2, 3)).toBe(false)
        expect(isNum(19, 19)).toBe(true)
        expect(isNum(19.1, 19)).toBe(true)
    })

    it('works if only min is specified', () => {
        expect(isNum(2, undefined, 3)).toBe(true)
        expect(isNum(2, undefined, 1)).toBe(false)
        expect(isNum(19.1, undefined, 19)).toBe(false)
    })

    it('works when both min and max are specified', () => {
        expect(isNum(19, 17, 20)).toBe(true)
        expect(isNum(19, 17, 19)).toBe(true)
        expect(isNum(19, 19, 20)).toBe(true)
    })

    it('works when the min === max', () => {
        expect(isNum(1, 1, 1)).toBe(true)
        expect(isNum(3, 1, 1)).toBe(false)
    })

    it('returns false if the min and max are misplaced', () => {
        expect(isNum(2, 3, 1)).toBe(false)
    })
})
