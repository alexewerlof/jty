import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isSameDate } from '../src/index.ts'

describe('isSameDate()', () => {
    it('returns true for two Date objects with the same time value', () => {
        const date1 = new Date('2024-01-01T12:00:00.000Z')
        const date2 = new Date('2024-01-01T12:00:00.000Z')
        assert.strictEqual(isSameDate(date1, date2), true)
    })

    it('returns true for the same Date object instance', () => {
        const date = new Date()
        assert.strictEqual(isSameDate(date, date), true)
    })

    it('returns false for two Date objects with different time values', () => {
        const date1 = new Date('2024-01-01T12:00:00.000Z')
        const date2 = new Date('2024-01-02T12:00:00.000Z')
        assert.strictEqual(isSameDate(date1, date2), false)
    })

    it('returns false for two different invalid Date objects', () => {
        // new Date('invalid').getTime() is NaN, and NaN !== NaN
        assert.strictEqual(isSameDate(new Date('invalid1'), new Date('invalid2')), false)
    })

    it('returns false when comparing a valid and an invalid Date object', () => {
        assert.strictEqual(isSameDate(new Date(), new Date('invalid')), false)
    })

    it('returns false for non-Date values', () => {
        const date = new Date()
        assert.strictEqual(isSameDate('2024-01-01T12:00:00.000Z', date), false)
        assert.strictEqual(isSameDate(date.getTime(), date), false)
        assert.strictEqual(isSameDate(null, date), false)
        assert.strictEqual(isSameDate({}, date), false)
    })

    it('throws a TypeError if the reference value is not a Date', () => {
        assert.throws(() => isSameDate(new Date(), null as unknown as Date), TypeError)
        assert.throws(() => isSameDate(new Date(), '2024-01-01' as unknown as Date), TypeError)
    })
})
