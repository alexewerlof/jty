import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isOwnInstance } from '../src/index.ts'

describe('isOwnInstance()', () => {
    it('returns true for a direct instance of a class', () => {
        class A {}
        const a = new A()
        assert.strictEqual(isOwnInstance(a, A), true)
        assert.strictEqual(isOwnInstance({}, Object), true)
    })

    it('returns false for an inherited instance (parent class)', () => {
        class Animal {}
        class Dog extends Animal {}
        const dog = new Dog()

        assert.strictEqual(isOwnInstance(dog, Dog), true)
        assert.strictEqual(isOwnInstance(dog, Animal), false)
        assert.strictEqual(isOwnInstance(dog, Object), false)
    })

    it('returns false for primitives', () => {
        assert.strictEqual(isOwnInstance('hello', String), false)
        assert.strictEqual(isOwnInstance(42, Number), false)
        assert.strictEqual(isOwnInstance(true, Boolean), false)
        assert.strictEqual(isOwnInstance(null, Object), false)
        assert.strictEqual(isOwnInstance(undefined, Object), false)
    })

    it('works for built-in classes', () => {
        assert.strictEqual(isOwnInstance(/hello/i, RegExp), true)
        assert.strictEqual(isOwnInstance(new Date(), Date), true)
        assert.strictEqual(isOwnInstance(new Error(), Error), true)
        assert.strictEqual(isOwnInstance(new Map(), Map), true)
        assert.strictEqual(isOwnInstance(new Set(), Set), true)
        assert.strictEqual(isOwnInstance([], Array), true)
    })

    it('returns false when checking built-in subclass against parent', () => {
        assert.strictEqual(isOwnInstance([], Object), false)
        assert.strictEqual(isOwnInstance(new TypeError(), Error), false)
        assert.strictEqual(isOwnInstance(new RangeError(), Error), false)
    })

    it('returns false for Object.create(null)', () => {
        assert.strictEqual(isOwnInstance(Object.create(null), Object), false)
    })

    it('works for wrapper objects', () => {
        assert.strictEqual(isOwnInstance(new String('str'), String), true)
        assert.strictEqual(isOwnInstance(new Number(42), Number), true)
        assert.strictEqual(isOwnInstance(new Boolean(true), Boolean), true)
    })

    it('throws TypeError if classConstructor is not a function', () => {
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, null), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, undefined), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, 'lamborghini'), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, NaN), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, false), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, 1), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, []), TypeError)
        // @ts-expect-error
        assert.throws(() => isOwnInstance({}, {}), TypeError)
    })
})
