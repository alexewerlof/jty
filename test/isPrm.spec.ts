import { describe, it } from 'node:test'
import assert from 'node:assert'
import { isPrm } from "../src/index.ts"

const noop = () => 0

describe('isPrm()', () => {
    it('returns true for an object with a then() method', () => {
        assert.strictEqual(isPrm({
            then() {}
        }), true)
    })

    it('returns true for a native promise', async () => {
        assert.strictEqual(isPrm(Promise.resolve()), true)
        const rejected = Promise.reject()
        assert.strictEqual(isPrm(rejected), true)
        assert.strictEqual(isPrm(new Promise(noop)), true)
        rejected.catch(noop) // prevent unhandled rejection
    })

    it('returns false for null', () => {
        assert.strictEqual(isPrm(null), false)
    })

    it('returns false for an object without then()', () => {
        assert.strictEqual(isPrm({
            catch() {}
        }), false)
    })

    it('return false for a function', () => {
        assert.strictEqual(isPrm(noop), false)
    })
})