import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSym } from '../src/index.ts'

describe('isSym()', () => {
    it('returns true for a symbol', () => {
        assert.strictEqual(isSym(Symbol()), true)
        assert.strictEqual(isSym(Symbol('test-symbol')), true)
        assert.strictEqual(isSym(Symbol.iterator), true)
        assert.strictEqual(isSym(Symbol.asyncIterator), true)
    })

    it('returns false for non-symbols', () => {
        assert.strictEqual(isSym(Symbol), false)
        assert.strictEqual(isSym(false), false)
        assert.strictEqual(isSym(true), false)
        assert.strictEqual(isSym(NaN), false)
        assert.strictEqual(isSym(0), false)
        assert.strictEqual(isSym(''), false)
        assert.strictEqual(isSym('str'), false)
        assert.strictEqual(
            isSym(() => void 0),
            false,
        )
    })
})
