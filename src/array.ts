import { inRange, isInt } from './number'

const { isArray } = Array

/**
 * Checks if the provided value is an array, optionally checking if its length is within a given range.
 *
 * @see {@link isObj}
 *
 * @param x The value to check.
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 *
 * @returns `true` if `x` is an array and its length is within the specified range, `false` otherwise.
 *
 * @category Array
 *
 * @example
 * // Basic validation
 * isArr([]) // => true
 * isArr([1, 2, 3]) // => true
 * isArr({}) // => false
 *
 * @example
 * // With length validation
 * isArr([1, 2], 2) // => true
 * isArr([1, 2], 3) // => false
 * isArr([1, 2], 1, 2) // => true
 */
export function isArr(x: unknown, minLen = 0, maxLen?: number): x is unknown[] {
    return isArray(x) && inRange(x.length, minLen, maxLen)
}

/**
 * Checks if `x` is a valid array index for `arr`.
 *
 * @see {@link isArr}
 * @see {@link isInt}
 *
 * @param arr The array to check against.
 * @param x The value to check if it's a valid index.
 *
 * @throws {TypeError} if `arr` is not an array.
 *
 * @returns `true` if `x` is a valid index for `arr`, `false` otherwise.
 *
 * @example
 * isArrIdx(['a', 'b'], 1) => true
 * isArrIdx(['a', 'b'], 2) => false
 * isArrIdx(['a', 'b'], -1) => false
 * isArrIdx(['a', 'b'], 0.5) => false
 *
 * @category Array
 */
export function isArrIdx(arr: unknown, x: number): x is number {
    if (!isArr(arr)) {
        throw new TypeError(`isArrIdx(): "arr" must be an array. Got ${arr} (${typeof arr})`)
    }

    return isInt(x) && x >= 0 && x < arr.length
}
