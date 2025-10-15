import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isUndef } from "../src/index.ts"

describe('isUndef()', () => {
    it('returns false if the provided value is defined', () => {
        assert.strictEqual(isUndef('Hej'), false)
        assert.strictEqual(isUndef(13), false)
        assert.strictEqual(isUndef(false), false)
        assert.strictEqual(isUndef(NaN), false)
        assert.strictEqual(isUndef({}), false)
        assert.strictEqual(isUndef([]), false)
    })

    it('returns true if the provided value is not defined', () => {
        // @ts-expect-error
        assert.strictEqual(isUndef(), true)
        assert.strictEqual(isUndef(undefined), true)
    })
})
