import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isStr } from '../src/index.ts'

describe('isStr()', () => {
    it('returns true for a string', () => {
        assert.strictEqual(isStr('Hello'), true)
    })

    it('returns false for a non-string value', () => {
        assert.strictEqual(isStr(null), false)
    })

    it('returns true for an empty string when no minimum length is specified', () => {
        assert.strictEqual(isStr(''), true)
    })
})
