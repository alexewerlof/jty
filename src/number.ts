import { isDef } from './misc.js'

const { isNaN, isFinite, isInteger } = Number

/**
 * Checks if a value is a `number` (and not `NaN`).
 *
 * @see {@link isInt}
 * @see {@link isFin}
 *
 * @param x possibly a number
 *
 * @example
 * isNum(3) => true
 * isNum('3') => false
 * isNum(NaN) => false
 *
 * @category Number
 */
export function isNum(x: unknown): x is number {
    return typeof x === 'number' && !isNaN(x)
}

/**
 * Checks if a value is a finite integer
 *
 * @see {@link isNum}
 * @see {@link isFin}
 *
 * @param x possibly an integer number
 *
 * @example
 * isInt(1) => true
 * isInt(-1) => true
 * isInt(0) => true
 * isInt(1.0) => true
 * isInt(1.2) => false
 * isInt('1') => false
 * isInt(NaN) => false
 * isInt(Infinity) => false
 * isInt(null) => false
 * isInt(1n) => false
 *
 * @category Number
 */
export function isInt(x: unknown): x is number {
    return isInteger(x)
}

/**
 * Checks if a value is a finite number (float or integer but not big int)
 *
 * @see {@link isInt}
 * @see {@link isNum}
 * @see {@link isBigInt}
 *
 * @param x possibly a number
 *
 * @example
 * isFin(1) => true
 * isFin(1.1) => true
 * isFin(1n) => false
 * isFin('1') => false
 * isFin(NaN) => false
 * isFin(null) => false
 * isFin(Number.NEGATIVE_INFINITY) => false
 * isFin(Number.POSITIVE_INFINITY) => false
 * isFin(Number.EPSILON) => true
 * isFin(-0) => true
 * isFin(+0) => true
 *
 * @category Number
 */
export function isFin(x: unknown): x is number {
    return isFinite(x)
}

/**
 * Checks if a number `x` is within a given range (inclusive).
 * This function also serves as a type guard, narrowing the type to `number`.
 *
 * At least one of `min` or `max` must be provided.
 * If both `min` and `max` are provided and `min` happens to be larger than `max`, it swaps them and works gracefully.
 *
 * @param x The number to check.
 * @param min The minimum value of the range (inclusive). If undefined, only the max is checked.
 * @param max The maximum value of the range (inclusive). If undefined, only the min is checked.
 * @returns `true` if `x` is within the specified range, `false` otherwise.
 *
 * @throws {TypeError} if either `min` or `max` are defined, but are not numbers.
 * @throws {TypeError} if neither `min` nor `max` are provided. Use {@link isNum} if that's what you want to do.
 *
 * @example
 * inRange(5, 0, 10) => true
 * inRange(5, 5, 10) => true
 * inRange(5, 0, 5) => true
 * inRange(5, 4) => true
 * inRange(5, 6) => false // 5 >= 6
 * inRange(5, 10, 2) => true
 * inRange(5, undefined, 4) => false // 5 <= 4
 *
 * @category Number
 */
export function inRange(x: unknown, min?: number, max?: number): x is number {
    if (!isNum(x)) {
        return false
    }

    if (isDef(min)) {
        if (!isNum(min)) {
            throw new TypeError(`inRange(): "min" must be a number. Got ${min} (${typeof min})`)
        }

        if (isDef(max)) {
            if (!isNum(max)) {
                throw new TypeError(`inRange(): "max" must be a number. Got ${max} (${typeof max})`)
            }

            if (min > max) {
                return max <= x && x <= min
            }

            return min <= x && x <= max
        }

        return x >= min
    } else if (isDef(max)) {
        if (!isNum(max)) {
            throw new TypeError(`inRange(): "max" must be a number. Got ${max} (${typeof max})`)
        }

        return x <= max
    }
    throw new TypeError(
        `inRange(): expected at least min or max to be defined. Got min=${min} (${typeof min}) and max=${max} (${typeof max})`,
    )
}

/**
 * Checks if `x` is an integer and within a given range (inclusive).
 *
 * It first checks that `x` is an integer using {@link isInt}. If not, it returns false.
 * Then it delegates the range checking to {@link inRange}.
 *
 * @see {@link inRange}
 * @see {@link isInt}
 *
 * @param x The integer to check.
 * @param min The minimum value of the range (inclusive). If undefined, only the max is checked.
 * @param max The maximum value of the range (inclusive). If undefined, only the min is checked.
 * @returns `true` if `x` is an integer and within the specified range, `false` otherwise.
 *
 * @throws {TypeError} if either `min` or `max` are defined, but are not numbers.
 * @throws {TypeError} if neither `min` nor `max` are provided. Use {@link isInt} if that's what you want to do.
 *
 * @example
 * inRangeInt(5, 0, 10) => true
 * inRangeInt(5, 5, 10) => true
 * inRangeInt(5, 0, 5) => true
 * inRangeInt(5.5, 0, 10) => false
 *
 * @category Number
 */
export function inRangeInt(x: unknown, min?: number, max?: number): x is number {
    return isInt(x) && inRange(x, min, max)
}

/**
 * Checks if `x` is an integer and in the range for being a valid index for an array or string that has that length.
 *
 * @see {@link isInt}
 *
 * @param x The value to check if it's a valid index.
 * @param length The length of the array or string.
 *
 * @throws {TypeError} if `length` is not an integer.
 * @throws {RangeError} if `length` is less than 0.
 *
 * @returns `true` if `x` is an integer and `0 <= x < length`, `false` otherwise.
 *
 * @example
 * isIdx(0, 2) // => true
 * isIdx(1, 2) // => true
 * isIdx(2, 2) // => false
 * isIdx(-1, 2) // => false
 * isIdx(0.5, 2) // => false
 *
 * @category Number
 */
export function isIdx(x: unknown, length: unknown): x is number {
    if (!isInt(length)) {
        throw new TypeError(`isIdx(): "length" must be an integer. Got ${length} (${typeof length})`)
    }

    if (length < 0) {
        throw new RangeError(`isIdx(): "length" must be >= 0. Got ${length} (${typeof length})`)
    }

    return isInt(x) && x >= 0 && x < length
}
