import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isEqualDate } from '../src/index.ts'

describe('isEqualDate()', () => {
    it('returns true for two Date objects with the same time value', () => {
        const date1 = new Date('2024-01-01T12:00:00.000Z')
        const date2 = new Date('2024-01-01T12:00:00.000Z')
        assert.strictEqual(isEqualDate(date1, date2), true)
    })

    it('returns true for the same Date object instance', () => {
        const date = new Date()
        assert.strictEqual(isEqualDate(date, date), true)
    })

    it('returns false for two Date objects with different time values', () => {
        const date1 = new Date('2024-01-01T12:00:00.000Z')
        const date2 = new Date('2024-01-02T12:00:00.000Z')
        assert.strictEqual(isEqualDate(date1, date2), false)
    })

    it('returns false for two different invalid Date objects', () => {
        // new Date('invalid').getTime() is NaN, and NaN !== NaN
        assert.strictEqual(isEqualDate(new Date('invalid1'), new Date('invalid2')), false)
    })

    it('returns false when comparing a valid and an invalid Date object', () => {
        assert.strictEqual(isEqualDate(new Date(), new Date('invalid')), false)
    })

    it('returns false for non-Date values', () => {
        const date = new Date()
        assert.strictEqual(isEqualDate('2024-01-01T12:00:00.000Z', date), false)
        assert.strictEqual(isEqualDate(date.getTime(), date), false)
        assert.strictEqual(isEqualDate(null, date), false)
        assert.strictEqual(isEqualDate({}, date), false)
    })

    it('throws a TypeError if the reference value is not a Date', () => {
        assert.throws(() => isEqualDate(new Date(), null as unknown as Date), TypeError)
        assert.throws(() => isEqualDate(new Date(), '2024-01-01' as unknown as Date), TypeError)
    })
})
