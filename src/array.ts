import { inRangeInt, isIdx } from './number.js'

const { isArray } = Array

/**
 * Checks if the provided value is an array.
 *
 * @see {@link isObj}
 *
 * @param x The value to check.
 *
 * @returns `true` if `x` is an array, `false` otherwise.
 *
 * @category Array
 *
 * @example
 * // Basic validation
 * isArr([]) // => true
 * isArr([1, 2, 3]) // => true
 * isArr({}) // => false
 */
export function isArr(x: unknown): x is unknown[] {
    return isArray(x)
}

/**
 * Checks if the provided value is an array AND its length is in a boundary (inclusive).
 * If `min` and `max` are the same, it tests for exact length.
 *
 * @see {@link isArr}
 * @see {@link isSym}
 *
 * @param x possibly an array
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 *
 * @throws {TypeError} if `minLen` or `maxLen` are defined but are not numbers. Delegates to `inRangeInt()`.
 *
 * @example
 * isArrLen([1, 2, 3], 2, 4) => true
 * isArrLen([1, 2, 3], 5, 10) => false
 * isArrLen([1, 2, 3], 3, 3) => true
 * isArrLen([1, 2, 3], 3) => true // The length is at least 3
 * isArrLen([1, 2, 3], undefined, 3) => true // The length is at most 3
 * isArrLen([1, 2, 3], 1, 2) => false
 * isArrLen(null, 1, 4) => false
 *
 * @category Array
 */
export function isArrLen(x: unknown, minLen = 0, maxLen?: number): x is unknown[] {
    if (!isArr(x)) {
        return false
    }

    return inRangeInt(x.length, minLen, maxLen)
}

/**
 * Checks if `x` is a valid array index for `arr`.
 *
 * @see {@link isArr}
 * @see {@link isInt}
 * @see {@link isStrIdx}
 *
 * @param x The value to check if it's a valid index.
 * @param arr The array to check against.
 *
 * @throws {TypeError} if `arr` is not an array.
 *
 * @returns `true` if `x` is a valid index for `arr`, `false` otherwise.
 *
 * @example
 * isArrIdx(1, ['a', 'b']) => true
 * isArrIdx(2, ['a', 'b']) => false
 * isArrIdx(-1, ['a', 'b']) => false
 * isArrIdx(0.5, ['a', 'b']) => false
 *
 * @category Array
 */
export function isArrIdx(x: unknown, arr: readonly unknown[]): x is number {
    if (!isArr(arr)) {
        throw new TypeError(`isArrIdx(): "arr" must be an array. Got ${arr} (${typeof arr})`)
    }

    return isIdx(x, arr.length)
}

/**
 * Checks if a value is present in an array.
 *
 * @see {@link isArr}
 * @see {@link isArrIdx}
 *
 * @param x The value to search for.
 * @param arr The array to search in.
 *
 * @throws {TypeError} if `arr` is not an array.
 *
 * @returns `true` if `x` is in `arr`, `false` otherwise.
 *
 * @example
 * inArr(1, [1, 2, 3]) // => true
 * inArr(4, [1, 2, 3]) // => false
 *
 * @category Array
 */
export function inArr<T>(x: unknown, arr: readonly T[]): x is T {
    if (!isArr(arr)) {
        throw new TypeError(`inArr(): "arr" must be an array. Got ${arr} (${typeof arr})`)
    }

    return arr.includes(x as T)
}
