import { describe, it } from 'node:test'
import assert from 'node:assert'
import vm from 'node:vm'
import { isPromise } from '../src/index.js'

describe('isPromise()', () => {
    it('returns true for native Promise instances', async () => {
        const resolved = Promise.resolve(1)
        const rejected = Promise.reject(new Error('boom'))
        const pending = new Promise(() => {})

        assert.strictEqual(isPromise(resolved), true)
        assert.strictEqual(isPromise(rejected), true)
        assert.strictEqual(isPromise(pending), true)

        await Promise.allSettled([resolved, rejected])
    })

    it('returns true for Promise subclass instances', async () => {
        class MyPromise<T> extends Promise<T> {}

        const p = MyPromise.resolve(1)
        assert.strictEqual(isPromise(p), true)

        await p
    })

    it('returns false for thenables and non-promises', () => {
        assert.strictEqual(isPromise({ then: () => {}, catch: () => {} }), false)
        assert.strictEqual(isPromise({ then: () => {} }), false)
        assert.strictEqual(
            isPromise(() => Promise.resolve()),
            false,
        )
        assert.strictEqual(isPromise(null), false)
        assert.strictEqual(isPromise(undefined), false)
        assert.strictEqual(isPromise(123), false)
        assert.strictEqual(isPromise('promise'), false)
    })

    it('returns false for a Promise created in a different realm', () => {
        const crossRealmPromise = vm.runInNewContext('Promise.resolve(1)')
        assert.strictEqual(isPromise(crossRealmPromise), false)
    })
})
