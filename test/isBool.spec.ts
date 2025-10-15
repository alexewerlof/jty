import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isBool } from "../src/index.ts"

describe('isBool()', () => {
    it('returns true if the provided value is boolean', () => {
        assert.strictEqual(isBool(true), true)
        assert.strictEqual(isBool(false), true)
    })

    it('returns false for any non-boolean value', () => {
        assert.strictEqual(isBool(''), false)
        assert.strictEqual(isBool(0), false)
        assert.strictEqual(isBool(null), false)
        // @ts-expect-error
        assert.strictEqual(isBool(), false)
        assert.strictEqual(isBool(undefined), false)
    })
})
