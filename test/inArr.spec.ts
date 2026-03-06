import { describe, it } from 'node:test'
import assert from 'node:assert'
import { inArr } from '../src/index.ts'

describe('inArr()', () => {
    it('returns true if the value is in the array', () => {
        assert.strictEqual(inArr(20, [10, 20, 30]), true)
        assert.strictEqual(inArr('b', ['a', 'b', 'c']), true)
    })

    it('returns false if the value is not in the array', () => {
        assert.strictEqual(inArr(40, [10, 20, 30]), false)
        assert.strictEqual(inArr('d', ['a', 'b', 'c']), false)
    })

    it('throws if arr is not an array', () => {
        assert.throws(() => inArr(1, null as any), TypeError)
        assert.throws(() => inArr(1, {} as any), TypeError)
        assert.throws(() => inArr(1, '123' as any), TypeError)
    })
})
