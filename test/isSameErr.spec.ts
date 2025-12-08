import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameErr } from '../src/index'

describe('isSameErr()', () => {
    it('returns true for the same Error object instance', () => {
        const err = new Error('test')
        assert.strictEqual(isSameErr(err, err), true)
    })

    it('returns true for two Error objects with the same name and message', () => {
        const err1 = new Error('Something went wrong')
        const err2 = new Error('Something went wrong')
        assert.strictEqual(isSameErr(err1, err2), true)
    })

    it('returns true for two subclass Error objects with the same name and message', () => {
        const err1 = new TypeError('Invalid type')
        const err2 = new TypeError('Invalid type')
        assert.strictEqual(isSameErr(err1, err2), true)
    })

    it('returns false for two Error objects with different messages', () => {
        const err1 = new Error('Message 1')
        const err2 = new Error('Message 2')
        assert.strictEqual(isSameErr(err1, err2), false)
    })

    it('returns false for two Error objects with different names (types)', () => {
        const err1 = new Error('Generic error')
        const err2 = new TypeError('Generic error')
        assert.strictEqual(isSameErr(err1, err2), false)
    })

    it('returns false when one value is not an Error', () => {
        const err = new Error('test')
        assert.strictEqual(isSameErr('test', err), false)
        assert.strictEqual(isSameErr(null, err), false)
        assert.strictEqual(isSameErr({}, err), false)
    })

    it('does not compare stack traces', () => {
        const err1 = new Error('Same message')
        const err2 = new Error('Same message')
        assert.notStrictEqual(err1.stack, err2.stack) // Stacks are different
        assert.strictEqual(isSameErr(err1, err2), true) // But they are considered the same
    })

    it('throws a TypeError if the reference value is not an Error', () => {
        assert.throws(() => isSameErr(new Error(), null as unknown as Error), TypeError)
        assert.throws(() => isSameErr(new Error(), 'error' as unknown as Error), TypeError)
    })
})
