import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isDate } from '../src/index.ts'

describe('isDate()', () => {
    it('returns true for valid Date objects', () => {
        assert.strictEqual(isDate(new Date()), true)
        assert.strictEqual(isDate(new Date('2024-01-01T00:00:00.000Z')), true)
        assert.strictEqual(isDate(new Date(0)), true)
        assert.strictEqual(isDate(new Date(1704067200000)), true)
    })

    it('returns false for invalid Date objects', () => {
        assert.strictEqual(isDate(new Date('not a real date')), false)
        assert.strictEqual(isDate(new Date('garbage')), false)
        assert.strictEqual(isDate(new Date(NaN)), false)
    })

    it('returns false for non-Date values', () => {
        assert.strictEqual(isDate('2024-01-01'), false)
        assert.strictEqual(isDate(1704067200000), false)
        assert.strictEqual(isDate(null), false)
        assert.strictEqual(isDate(undefined), false)

        // Other primitives
        assert.strictEqual(isDate(true), false)
        assert.strictEqual(isDate(false), false)
        assert.strictEqual(isDate(''), false)
        assert.strictEqual(isDate(42), false)
        assert.strictEqual(isDate(0), false)
        assert.strictEqual(isDate(NaN), false)
        assert.strictEqual(isDate(Infinity), false)
        assert.strictEqual(isDate(-Infinity), false)
        assert.strictEqual(isDate(Symbol('a')), false)
        assert.strictEqual(isDate(1n), false)

        // Objects
        assert.strictEqual(isDate({}), false)
        assert.strictEqual(isDate([]), false)
        assert.strictEqual(isDate(/a/), false)
        assert.strictEqual(isDate(new Error()), false)
        assert.strictEqual(
            isDate(() => {}),
            false,
        )

        // Object that looks like a Date
        const fakeDate = {
            getTime: () => 0,
            toISOString: () => '1970-01-01T00:00:00.000Z',
        }
        assert.strictEqual(isDate(fakeDate), false)
    })
})
