import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isUnsh } from "../src/index.ts"

describe('isUnsh()', () => {
    it('returns true if the provided value is not undefined or null', () => {
        assert.strictEqual(isUnsh('Good morning'), true)
        assert.strictEqual(isUnsh(''), true)
        assert.strictEqual(isUnsh(13), true)
        assert.strictEqual(isUnsh(0), true)
        assert.strictEqual(isUnsh(true), true)
        assert.strictEqual(isUnsh(false), true)
        assert.strictEqual(isUnsh(NaN), true)
        assert.strictEqual(isUnsh({}), true)
        assert.strictEqual(isUnsh([]), true)
    })

    it('returns false if the provided value is undefined or null', () => {
        // @ts-expect-error
        assert.strictEqual(isUnsh(), false)
        assert.strictEqual(isUnsh(undefined), false)
        assert.strictEqual(isUnsh(null), false)
    })
})
