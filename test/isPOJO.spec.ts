import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isPOJO } from '../src/index.ts'

describe('isPOJO()', () => {
    it('returns true for an object literal', () => {
        assert.strictEqual(isPOJO({}), true)
    })

    it('returns false for Object.create(null)', () => {
        assert.strictEqual(isPOJO(Object.create(null)), false)
    })

    it('returns false for an array', () => {
        assert.strictEqual(isPOJO([]), false)
    })

    it('returns false for null', () => {
        assert.strictEqual(isPOJO(null), false)
    })

    it('returns false for a Map', () => {
        assert.strictEqual(isPOJO(new Map()), false)
    })

    it('returns false for a Set', () => {
        assert.strictEqual(isPOJO(new Set()), false)
    })

    it('returns false for a Date', () => {
        assert.strictEqual(isPOJO(new Date()), false)
    })

    it('returns false for a primitive number', () => {
        assert.strictEqual(isPOJO(123), false)
    })

    it('returns false for a string', () => {
        assert.strictEqual(isPOJO('hello'), false)
    })
})
