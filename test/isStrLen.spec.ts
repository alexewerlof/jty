import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isStrLen } from '../src/index.ts'

describe('isStrLen()', () => {
    it('can match the length', () => {
        assert.strictEqual(isStrLen('', 0), true)
        assert.strictEqual(isStrLen('', 1), false)
        assert.strictEqual(isStrLen('H', 0, 1), true)
        assert.strictEqual(isStrLen('H', 1), true)
        assert.strictEqual(isStrLen('H', 2), false)
        assert.strictEqual(isStrLen('Hi', 1), true)
        assert.strictEqual(isStrLen('Hi', 2), true)
        assert.strictEqual(isStrLen('Hi', 3), false)
    })

    it('can match length range', () => {
        const str = 'Hello'
        assert.strictEqual(isStrLen(str, undefined, 6), true)
        assert.strictEqual(isStrLen(str, 0, 6), true)
        assert.strictEqual(isStrLen(str, -1, 6), true)
        assert.strictEqual(isStrLen(str, -1.1, 5.1), true)
        assert.strictEqual(isStrLen(str, 5, 6), true)
        assert.strictEqual(isStrLen(str, 5, 5), true)
        assert.strictEqual(isStrLen(str, 4, 6), true)
        assert.strictEqual(isStrLen(str, 4, 5), true)
        assert.strictEqual(isStrLen(str, undefined, 5), true)
    })

    it('throws if the max is less than min', () => {
        const str = 'Hello'
        assert.throws(() => isStrLen(str, 6, 3))
    })
})
