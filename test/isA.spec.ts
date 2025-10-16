import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isA } from '../src/index.ts'

describe('isA()', () => {
    it('returns true if an object is an instance of the provided class', () => {
        assert.strictEqual(isA({}, Object), true)

        class A {}
        const a = new A()

        assert.strictEqual(isA(a, A), true)
        assert.strictEqual(isA(a, Object), true)
    })

    it('returns false if the provided "class" is not a function', () => {
        // @ts-expect-error
        assert.strictEqual(isA({}, null), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, undefined), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, 'lamborghini'), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, NaN), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, false), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, 1), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, []), false)
        // @ts-expect-error
        assert.strictEqual(isA({}, {}), false)
    })

    it('works for regular expressions', () => {
        assert.strictEqual(isA(/hello/i, RegExp), true)
    })

    it('works for promises', async () => {
        const resolve = Promise.resolve()
        const reject = Promise.reject()
        assert.strictEqual(isA(resolve, Promise), true)
        assert.strictEqual(isA(reject, Promise), true)
        await Promise.allSettled([resolve, reject])
    })

    it('works for strings', () => {
        assert.strictEqual(isA('plain str', String), false)
        assert.strictEqual(isA(new String('str obj'), String), true)
    })

    it('works for numbers', () => {
        assert.strictEqual(isA(22, Number), false)
        assert.strictEqual(isA(new Number(33), Number), true)
    })
})
