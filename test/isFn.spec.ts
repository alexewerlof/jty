import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isFn } from '../src/index.ts'

const noop = () => void 0

describe('isFn()', () => {
    it('returns true for a function', () => {
        assert.strictEqual(isFn(noop), true)
    })
    
    it('returns true for a method', () => {
        class Dog {
            bark() {
                return 'woof'
            }
        }
        const dog = new Dog
        assert.strictEqual(isFn(dog.bark), true)
    })

    it('returns false for an object', () => {
        assert.strictEqual(isFn({}), false)
    })

    it('returns true for arrow functions', () => {
        assert.strictEqual(isFn(() => void 0), true)
    })
})