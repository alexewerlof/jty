import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isDef } from "../src/index.ts"

describe('isDef()', () => {
    it('returns true if the provided value is defined', () => {
        assert.strictEqual(isDef('Hej'), true)
        assert.strictEqual(isDef(''), true)
        assert.strictEqual(isDef(13), true)
        assert.strictEqual(isDef(false), true)
        assert.strictEqual(isDef(NaN), true)
        assert.strictEqual(isDef({}), true)
        assert.strictEqual(isDef([]), true)
    })

    it('returns false if the provided value is not defined', () => {
        // @ts-expect-error
        assert.strictEqual(isDef(), false)
        assert.strictEqual(isDef(undefined), false)
    })
})
