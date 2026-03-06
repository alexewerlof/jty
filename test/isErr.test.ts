import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isErr } from '../src/index.ts'

describe('isErr()', () => {
    it('returns true for an Error object', () => {
        assert.strictEqual(isErr(new Error()), true)
    })

    it('returns true for subclasses of Error', () => {
        assert.strictEqual(isErr(new TypeError()), true)
        assert.strictEqual(isErr(new RangeError()), true)
        assert.strictEqual(isErr(new SyntaxError()), true)
    })

    it('returns true for custom Error classes', () => {
        class CustomError extends Error {}
        assert.strictEqual(isErr(new CustomError('custom message')), true)
    })

    it('returns false for non-Error values', () => {
        assert.strictEqual(isErr('Error'), false)
        assert.strictEqual(isErr({ name: 'Error', message: 'This is an error-like object' }), false)
        assert.strictEqual(isErr(null), false)
        assert.strictEqual(isErr(undefined), false)
        assert.strictEqual(isErr({}), false)
        assert.strictEqual(isErr(123), false)
    })
})
