import { inRange } from './number'

/**
 * Checks if the provided value is a string
 * This is sugar for `typeof x === 'string'`
 *
 * @param x possibly a string
 *
 * @example
 * isStr('hello') => true
 * isStr('') => true
 *
 * @category String
 */
export function isStr(x: unknown): x is string {
    return typeof x === 'string'
}

/**
 * Checks if the provided value is a string AND its length is in a boundary (inclusive).
 * If `min` and `max` are the same, it tests for exact length.
 *
 * @see {@link isStr}
 * @see {@link isSym}
 *
 * @param x possibly a string
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 *
 * @throws {TypeError} any of `min` or `max` are defined but are not numbers.
 * @throws {TypeError} if neither `min` nor `max` are provided.
 * @throws {RangeError} if both `min` and `max` are provided and `min > max`.
 *
 * @example
 * isStrLen('Hello', 2, 10) => true
 * isStrLen('Hello', 5, 10) => true // 'Hello'.length is 5
 * isStrLen('Hello', 10, 10) => true
 * isStrLen('Hello', 5) => true // The length is at least 5
 * isStrLen('Hello', undefined, 5) => true // The length is at most 10
 *
 * @category String
 */
export function isStrLen(x: unknown, minLen = 0, maxLen?: number): x is string {
    if (typeof x !== 'string') {
        return false
    }

    return inRange(x.length, minLen, maxLen)
}
