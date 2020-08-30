import { isArr } from "../src"

describe('isArr()', () => {
    it('returns true for an array', () => {
        expect(isArr([])).toBe(true)
    })

    it('can check the minimum acceptable length', () => {
        expect(isArr(['a', 'b', 'c'], 3)).toBe(true)
        expect(isArr(['a', 'b', 'c'], 4)).toBe(false)
    })

    it('returns false for a non-array value', () => {
        expect(isArr({})).toBe(false)
    })

    it('checks the len range', () => {
        const arr2 = [1, 2]
        expect(isArr(arr2, undefined)).toBe(true)
        expect(isArr(arr2, 0)).toBe(true)
        expect(isArr(arr2, 1)).toBe(true)
        expect(isArr(arr2, 2)).toBe(true)
        expect(isArr(arr2, 2, 3)).toBe(true)
        expect(isArr(arr2, 2, 10)).toBe(true)
        expect(isArr(arr2, 0, 3)).toBe(true)
        expect(isArr(arr2, 0, 2)).toBe(true)
    })
})