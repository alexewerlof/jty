import { describe, it } from 'node:test'
import assert from 'node:assert'
import { inRangeInt } from '../src/index.js'

describe('inRangeInt()', () => {
    it('works if only min is specified', () => {
        assert.strictEqual(inRangeInt(2, 1), true)
        assert.strictEqual(inRangeInt(2, 3), false)
        assert.strictEqual(inRangeInt(19, 19), true)
    })

    it('works if only max is specified', () => {
        assert.strictEqual(inRangeInt(2, undefined, 3), true)
        assert.strictEqual(inRangeInt(2, undefined, 1), false)
    })

    it('works when both min and max are specified', () => {
        assert.strictEqual(inRangeInt(19, 17, 20), true)
        assert.strictEqual(inRangeInt(19, 17, 19), true)
        assert.strictEqual(inRangeInt(19, 19, 20), true)
    })

    it('works when the min === max', () => {
        assert.strictEqual(inRangeInt(1, 1, 1), true)
        assert.strictEqual(inRangeInt(3, 1, 1), false)
    })

    it('works even if the min is larger than max', () => {
        assert.strictEqual(inRangeInt(2, 3, 1), true)
        assert.strictEqual(inRangeInt(4, 1, 3), false)
        assert.strictEqual(inRangeInt(0, 1, 3), false)
    })

    it('returns false if x is not an integer', () => {
        assert.strictEqual(inRangeInt(2.5, 1, 3), false)
        assert.strictEqual(inRangeInt('2', 1, 3), false)
    })

    it('throws if min is defined but not a number', () => {
        // @ts-expect-error
        assert.throws(() => inRangeInt(2, '1', 3), TypeError)
        // @ts-expect-error
        assert.throws(() => inRangeInt(2, '1'), TypeError)
    })

    it('throws if max is defined but not a number', () => {
        // @ts-expect-error
        assert.throws(() => inRangeInt(2, 1, '3'), TypeError)
        // @ts-expect-error
        assert.throws(() => inRangeInt(2, undefined, '3'), TypeError)
    })
})
