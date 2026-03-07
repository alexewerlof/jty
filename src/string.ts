import { inRangeInt, isIdx } from './number.js'

/**
 * Checks if the provided value is a string
 * This is sugar for `typeof x === 'string'`
 *
 * @param x possibly a string
 *
 * @example
 * isStr('hello') => true
 * isStr('') => true
 * isStr(123) => false
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
 * @throws {TypeError} if `minLen` or `maxLen` are defined but are not numbers. Delegates to `inRangeInt()`.
 *
 * @example
 * isStrLen('Hello', 2, 10) => true
 * isStrLen('Hello', 5, 10) => true // 'Hello'.length is 5
 * isStrLen('Exact', 5, 5) => true
 * isStrLen('Hello', 5) => true // The length is at least 5
 * isStrLen('Hello', undefined, 5) => true // The length is at most 5
 * isStrLen('Too long', 1, 4) => false
 * isStrLen(null, 1, 4) => false
 *
 * @category String
 */
export function isStrLen(x: unknown, minLen = 0, maxLen?: number): x is string {
    if (!isStr(x)) {
        return false
    }

    return inRangeInt(x.length, minLen, maxLen)
}

/**
 * Checks if `x` is a valid string index for `str`.
 *
 * @see {@link isStr}
 * @see {@link isInt}
 * @see {@link isStrIdx}
 *
 * @param x The value to check if it's a valid index.
 * @param str The string to check against.
 *
 * @throws {TypeError} if `str` is not a string.
 *
 * @returns `true` if `x` is a valid index for `str`, `false` otherwise.
 *
 * @example
 * isStrIdx(0, 'ab') // => true
 * isStrIdx(1, 'ab') // => true
 * isStrIdx(2, 'ab') // => false
 * isStrIdx(-1, 'ab') // => false
 * isStrIdx(0.5, 'ab') // => false
 *
 * @category String
 */
export function isStrIdx(x: unknown, str: string): x is number {
    if (!isStr(str)) {
        throw new TypeError(`isStrIdx(): "str" must be a string. Got ${str} (${typeof str})`)
    }

    return isIdx(x, str.length)
}
