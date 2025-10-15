import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isNsh } from "../src/index.ts"

describe('isNsh()', () => {
    it('returns false if the provided value is not undefined or null', () => {
        assert.strictEqual(isNsh('Good morning'), false)
        assert.strictEqual(isNsh(''), false)
        assert.strictEqual(isNsh(13), false)
        assert.strictEqual(isNsh(0), false)
        assert.strictEqual(isNsh(false), false)
        assert.strictEqual(isNsh(NaN), false)
        assert.strictEqual(isNsh({}), false)
        assert.strictEqual(isNsh([]), false)
    })

    it('returns true if the provided value is undefined or null', () => {
        // @ts-expect-error
        assert.strictEqual(isNsh(), true)
        assert.strictEqual(isNsh(undefined), true)
        assert.strictEqual(isNsh(null), true)
    })
})
