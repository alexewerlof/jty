import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isInstance } from '../src/index.ts'

describe('isInstance()', () => {
    it('returns true if an object is an instance of the provided class', () => {
        assert.strictEqual(isInstance({}, Object), true)

        class A {}
        const a = new A()

        assert.strictEqual(isInstance(a, A), true)
        assert.strictEqual(isInstance(a, Object), true)
    })

    it('throws if the provided "class" is not a function', () => {
        // @ts-expect-error
        assert.throws(() => isInstance({}, null), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, undefined), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, 'lamborghini'), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, NaN), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, false), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, 1), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, []), TypeError)
        // @ts-expect-error
        assert.throws(() => isInstance({}, {}), TypeError)
    })

    it('works for regular expressions', () => {
        assert.strictEqual(isInstance(/hello/i, RegExp), true)
    })

    it('works for promises', async () => {
        const resolve = Promise.resolve()
        const reject = Promise.reject()
        assert.strictEqual(isInstance(resolve, Promise), true)
        assert.strictEqual(isInstance(reject, Promise), true)
        await Promise.allSettled([resolve, reject])
    })

    it('works for strings', () => {
        assert.strictEqual(isInstance('plain str', String), false)
        assert.strictEqual(isInstance(new String('str obj'), String), true)
    })

    it('works for numbers', () => {
        assert.strictEqual(isInstance(22, Number), false)
        assert.strictEqual(isInstance(new Number(33), Number), true)
    })
})
