import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isObj } from "../src/index.ts"

describe('isObj()', () => {
    it('returns true for an object', () => {
        assert.strictEqual(isObj({}), true)
    })

    it('returns true for an array', () => {
        assert.strictEqual(isObj([]), true)
    })

    it('returns false for null', () => {
        assert.strictEqual(isObj(null), false)
    })
})