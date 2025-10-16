import { isArr } from './object'
import { isDef } from './undefined'

const { isNaN, isFinite, isInteger } = Number

/**
 * Checks if a value is a number
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
    return !isNaN(x) && typeof x === 'number'
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
 * Checks if a value is a finite number
 *
 * @see {@link isInt}
 * @see {@link isNum}
 * @see {@link isBigInt}
 *
 * @param x possibly a number
 *
 * @example
 * isFin(1) => true
 * isFin(1n) => false
 * isFin('1') => false
 * isFin(NaN) => false
 * isFin(null) => false
 * isFin(Number.NEGATIVE_INFINITY) => false
 * isFin(Number.POSITIVE_INFINITY) => false
 * isFin(Number.EPSILON) => true
 * isFin(-0) => true
 * isFin(+0) => true`
 *
 * @category Number
 */
export function isFin(x: unknown): x is number {
    return isFinite(x)
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
 * @example
 * isArrIdx(['a', 'b'], 1) => true
 * isArrIdx(['a', 'b'], 2) => false
 * isArrIdx(['a', 'b'], -1) => false
 * isArrIdx(['a', 'b'], 0.5) => false
 *
 * @category Number
 */
export function isArrIdx(arr: unknown, x: number): x is number {
    if (!isArr(arr)) {
        throw new TypeError(
            `isArrIdx(): "arr" must be an array. Got ${arr} (${typeof arr})`,
        )
    }

    return isInt(x) && x >= 0 && x < arr.length
}

/**
 * Checks if a number `x` is within a given range (inclusive).
 * Note that if `x` is not a number, this will throw.
 * Use other functions to check if you got a number or not.
 *
 * At least one of `min` or `max` must be provided.
 *
 * @param x The number to check.
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 *
 * @throws {TypeError} if `x` is not a number.
 * @throws {TypeError} any of `min` or `max` are defined but are not numbers.
 * @throws {TypeError} if neither `min` nor `max` are provided.
 * @throws {RangeError} if both `min` and `max` are provided and `min > max`.
 *
 * @example
 * inRange(5, 0, 10) => true
 * inRange(5, 5, 10) => true
 * inRange(5, 0, 5) => true
 * inRange(5, 6) => false // checks if 5 >= 6
 * inRange(5, undefined, 4) => false // checks if 5 <= 4
 * inRange(5, 5, 5) => true
 *
 * @category Number
 */
export function inRange(x: number, min?: number, max?: number): x is number {
    if (!isNum(x)) {
        throw new TypeError(
            `inRange(): "x" must be a number. Got ${x} (${typeof x})`,
        )
    }

    let rangeType = 0
    if (isDef(min)) {
        if (!isNum(min)) {
            throw new TypeError(
                `inRange(): "min" must be a number. Got ${min} (${typeof min})`,
            )
        }

        rangeType |= 0x10
    }
    if (isDef(max)) {
        if (!isNum(max)) {
            throw new TypeError(
                `inRange(): "max" must be a number. Got ${max} (${typeof max})`,
            )
        }

        rangeType |= 0x01
    }

    switch (rangeType) {
        case 0x11:
            if (min > max) {
                throw new RangeError(
                    `inRange(): "min" must be less than or equal to "max". Got min=${min} and max=${max}`,
                )
            }
            return min <= x && x <= max
        case 0x10:
            return min <= x
        case 0x01:
            return x <= max
        default:
            throw new TypeError(
                `inRange(): expected at least min or max to be defined. Got min=${min} and max=${max}`,
            )
    }
}
