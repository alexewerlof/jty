import { describe, it } from 'node:test'
import assert from 'node:assert'
import { inRange } from '../src/index.ts'

describe('inRange()', () => {
    it('works if only min is specified', () => {
        assert.strictEqual(inRange(2, 1), true)
        assert.strictEqual(inRange(2, 3), false)
        assert.strictEqual(inRange(19, 19), true)
        assert.strictEqual(inRange(19.1, 19), true)
    })

    it('works if only max is specified', () => {
        assert.strictEqual(inRange(2, undefined, 3), true)
        assert.strictEqual(inRange(2, undefined, 1), false)
        assert.strictEqual(inRange(19.1, undefined, 19), false)
    })

    it('works when both min and max are specified', () => {
        assert.strictEqual(inRange(19, 17, 20), true)
        assert.strictEqual(inRange(19, 17, 19), true)
        assert.strictEqual(inRange(19, 19, 20), true)
    })

    it('works when the min === max', () => {
        assert.strictEqual(inRange(1, 1, 1), true)
        assert.strictEqual(inRange(3, 1, 1), false)
    })

    it('works even if the min is larger than max', () => {
        assert.strictEqual(inRange(2, 3, 1), true)
        assert.strictEqual(inRange(4, 1, 3), false)
        assert.strictEqual(inRange(0, 1, 3), false)
    })

    it('throws if min is defined but not a number', () => {
        // @ts-expect-error
        assert.throws(() => inRange(2, '1', 3), TypeError)
        // @ts-expect-error
        assert.throws(() => inRange(2, '1'), TypeError)
    })

    it('throws if max is defined but not a number', () => {
        // @ts-expect-error
        assert.throws(() => inRange(2, 1, '3'), TypeError)
        // @ts-expect-error
        assert.throws(() => inRange(2, undefined, '3'), TypeError)
    })
})
