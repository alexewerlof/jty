import { isPrm } from '../src'

const noop = () => 0

describe('isPrm()', () => {
    it('returns true for an object with a then() method', () => {
        expect(isPrm({
            then() {}
        })).toBe(true)
    })

    it('returns true for a native promise', () => {
        expect(isPrm(Promise.resolve())).toBe(true)
        expect(isPrm(Promise.reject())).toBe(true)
        expect(isPrm(new Promise(noop))).toBe(true)
    })

    it('returns false for null', () => {
        expect(isPrm(null)).toBe(false)
    })

    it('returns false for an object without then()', () => {
        expect(isPrm({
            catch() {}
        })).toBe(false)
    })

    it('return false for a function', () => {
        expect(isPrm(noop)).toBe(false)
    })
})