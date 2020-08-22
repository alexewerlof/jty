import { isFn } from '../src'

const noop = () => void 0

describe('isFn', () => {
    it('returns true for a function', () => {
        expect(isFn(noop)).toBe(true)
    })
    
    it('returns true for a method', () => {
        class Dog {
            bark() {
                return 'woof'
            }
        }
        const dog = new Dog
        expect(isFn(dog.bark)).toBe(true)
    })

    it('returns false for an object', () => {
        expect(isFn({})).toBe(false)
    })

    it('returns true for arrow functions', () => {
        expect(isFn(() => void 0)).toBe(true)
    })
})
