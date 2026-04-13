import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isPromiseLike } from '../src/index.js'

describe('isPromiseLike()', () => {
    it('returns true for Promise instances', () => {
        assert.strictEqual(isPromiseLike(Promise.resolve(1)), true)
    })

    it('returns true for thenable objects and functions', () => {
        assert.strictEqual(isPromiseLike({ then: () => {} }), true)
        assert.strictEqual(isPromiseLike({ then: async () => 1 }), true)

        const thenableFn = () => {}
        thenableFn.then = () => {}
        assert.strictEqual(isPromiseLike(thenableFn), true)
    })

    it('returns false for values without callable then', () => {
        assert.strictEqual(isPromiseLike({}), false)
        assert.strictEqual(isPromiseLike({ then: true }), false)
        assert.strictEqual(
            isPromiseLike(() => {}),
            false,
        )
        assert.strictEqual(isPromiseLike(null), false)
        assert.strictEqual(isPromiseLike(undefined), false)
        assert.strictEqual(isPromiseLike('promise-like'), false)
        assert.strictEqual(isPromiseLike(123), false)
    })
})
