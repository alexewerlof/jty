import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSet } from '../src/index.ts'

describe('isSet()', () => {
    it('returns true for a Set object', () => {
        assert.strictEqual(isSet(new Set()), true)
        assert.strictEqual(isSet(new Set([1, 2, 3])), true)
    })

    it('returns false for non-Set values', () => {
        assert.strictEqual(isSet(new Map()), false)
        assert.strictEqual(isSet([]), false)
        assert.strictEqual(isSet({}), false)
        assert.strictEqual(isSet(null), false)
        assert.strictEqual(isSet(undefined), false)
        assert.strictEqual(isSet('Set'), false)
        assert.strictEqual(isSet(123), false)
        assert.strictEqual(isSet(true), false)
    })
})
