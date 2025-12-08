import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isNullish } from '../src/misc'

describe('isNullish()', () => {
    it('returns true for null', () => {
        assert.strictEqual(isNullish(null), true)
    })

    it('returns true for undefined', () => {
        assert.strictEqual(isNullish(undefined), true)
    })

    it('returns false for non-nullish values', () => {
        assert.strictEqual(isNullish(0), false)
        assert.strictEqual(isNullish(''), false)
        assert.strictEqual(isNullish(false), false)
        assert.strictEqual(isNullish({}), false)
        assert.strictEqual(isNullish([]), false)
        assert.strictEqual(isNullish(NaN), false)
    })

    it('works as a type guard', () => {
        const values = [1, undefined, 2, null, 3]
        const nonNullishValues = values.filter((v) => !isNullish(v))
        assert.deepStrictEqual(nonNullishValues, [1, 2, 3])
    })
})
