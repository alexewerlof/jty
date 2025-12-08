import { isDate, isErr, isMap, isObj, isRegExp, isSet } from './object'

const { hasOwnProperty } = Object
const { isArray } = Array

/**
 * Checks if two arrays are the same.
 * Two arrays are considered the same if they have the same length and their elements are strictly equal at each index.
 * This function acts as a type guard, narrowing the type of `b` to be the same as `a` if it returns `true`.
 *
 * @param x The first value to compare.
 * @param ref The reference array.
 * @returns `true` if the arrays are the same, `false` otherwise.
 *
 * @example
 * const refArr = [1, 2, 3];
 * const unknownArr: unknown = [1, 2, 3];
 * isSameArr([1, 2, 3], [1, 2, 3]) => true
 * isSameArr([1, 2, 3], [1, 2, 3, 4]) => false
 * isSameArr([1, 2, 3, 4], [1, 2, 3]) => false
 * isSameArr([1, 2, 3], []) => true
 * isSameArr([], [1, 2, 3]) => false
 * isSameArr({}, [1, 2, 3]) => false
 * isSameArr([1, 2, 3], [3, 2, 1]) => false
 * @throws {TypeError} if `ref` is not an array.
 *
 * @category Array
 */
export function isSameArr<T>(x: unknown, ref: T[]): x is typeof ref {
    if (!isArray(ref)) {
        throw new TypeError(`isSameArr(): "ref" must be an array. Got ${JSON.stringify(ref)}`)
    }

    if (!isArray(x)) {
        return false
    }

    if (x === ref) {
        return true
    }

    return x.length === ref.length && x.every((v, i) => v === ref[i])
}

/**
 * Checks if two `Set` objects are the same.
 * @param x The first value to compare.
 * @param ref The reference Set.
 * @returns `true` if the sets are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a Set.
 */
export function isSameSet<T>(x: unknown, ref: Set<T>): x is Set<T> {
    if (!isSet(ref)) {
        throw new TypeError(`isSameSet(): "ref" must be a Set. Got ${ref} (${typeof ref})`)
    }

    if (x === ref) {
        return true
    }

    if (!isSet(x)) {
        return false
    }

    if (x.size !== ref.size) {
        return false
    }

    for (const value of ref) {
        if (!x.has(value)) {
            return false
        }
    }

    return true
}

/**
 * Checks if two `Map` objects are the same.
 * @param x The first value to compare.
 * @param ref The reference Map.
 * @returns `true` if the maps are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a Map.
 */
export function isSameMap<T, U>(x: unknown, ref: Map<T, U>): x is Map<T, U> {
    if (!isMap(ref)) {
        throw new TypeError(`isSameMap(): "ref" must be a Map. Got ${ref} (${typeof ref})`)
    }

    if (x === ref) {
        return true
    }

    if (!isMap(x)) {
        return false
    }

    if (x.size !== ref.size) {
        return false
    }

    for (const [key, value] of ref) {
        if (!x.has(key) || x.get(key) !== value) {
            return false
        }
    }

    return true
}

/**
 * Checks if two `RegExp` objects are the same.
 * @param x The first value to compare.
 * @param ref The reference RegExp.
 * @returns `true` if the regular expressions are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a RegExp.
 */
export function isSameRegExp(x: unknown, ref: RegExp): x is RegExp {
    if (!isRegExp(ref)) {
        throw new TypeError(`isSameRegExp(): "ref" must be a RegExp. Got ${ref} (${typeof ref})`)
    }

    if (x === ref) {
        return true
    }

    if (!isRegExp(x)) {
        return false
    }

    return x.source === ref.source && x.flags === ref.flags
}

/**
 * Checks if two `Date` objects are the same.
 * @param x The first value to compare.
 * @param ref The reference Date.
 * @returns `true` if the dates are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a Date.
 */
export function isSameDate(x: unknown, ref: Date): x is Date {
    if (!isDate(ref)) {
        throw new TypeError(`isSameDate(): "ref" must be a Date. Got ${ref} (${typeof ref})`)
    }

    if (x === ref) {
        return true
    }

    if (!isDate(x)) {
        return false
    }

    return x.getTime() === ref.getTime()
}

/**
 * Checks if two `Error` objects are the same.
 * @param x The first value to compare.
 * @param ref The reference Error.
 * @returns `true` if the errors are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not an Error.
 */
export function isSameErr(x: unknown, ref: Error): x is Error {
    if (!isErr(ref)) {
        throw new TypeError(`isSameErr(): "ref" must be an Error. Got ${ref} (${typeof ref})`)
    }

    if (x === ref) {
        return true
    }

    if (!isErr(x)) {
        return false
    }

    return x.name === ref.name && x.message === ref.message
}

/**
 * Performs a deep equality comparison between two values (including objects) to determine if they are equivalent.
 * It recursively compares the properties of objects and elements of arrays.
 *
 * This function handles:
 * - Primitive values (compared with `===`)
 * - Plain objects
 * - Arrays
 * - `Date` objects (compared by their time value)
 * - `RegExp` objects (compared by their source and flags)
 * - `Map` and `Set` objects (compared by their contents)
 * - Plain Old Javascript Objects (POJOs)
 *
 * Note: For `Set` and `Map` objects, a shallow comparison is performed on their contents.
 * This function does not handle circular references and may lead to a stack overflow with
 * deeply nested or circular structures. This function is a wrapper around `isDeepEqual`.
 *
 * @see {@link isObj}
 * @see {@link isSameArr}
 *
 * @param x The first value to compare.
 * @param ref The reference object to compare against.
 * @returns `true` if the objects are deeply equal, `false` otherwise.
 * @throws {TypeError} if `ref` is not a non-null object.
 *
 * @category Object
 */
export function isSameObj(x: unknown, ref: object): x is typeof ref {
    if (!isObj(ref)) {
        throw new TypeError(`isSameObj(): "ref" must be an object. Got ${ref} (${typeof ref})`)
    }

    if (x === ref) {
        return true
    }

    if (!isObj(x)) {
        return false
    }

    if ('constructor' in ref && x?.constructor !== ref.constructor) {
        return false
    }

    if (isArray(ref)) {
        return isSameArr(x, ref)
    }

    if (ref instanceof Set) {
        return isSameSet(x, ref)
    }

    if (ref instanceof Map) {
        return isSameMap(x, ref)
    }

    if (ref instanceof Error) {
        return isSameErr(x, ref)
    }

    if (ref instanceof Date) {
        return isSameDate(x, ref)
    }

    if (ref instanceof RegExp) {
        return isSameRegExp(x, ref)
    }

    const xKeys = Object.keys(x)
    const refKeys = Object.keys(ref)

    if (xKeys.length !== refKeys.length) {
        return false
    }

    for (const xKey of xKeys) {
        if (!hasOwnProperty.call(ref, xKey) || !isDeepEqual((x as any)[xKey], (ref as any)[xKey])) {
            return false
        }
    }

    return true
}

/**
 * A general-purpose deep equality comparison function.
 * It's used by `isSameObj` to recursively compare values.
 * @category Object
 */
export function isDeepEqual(x: unknown, ref: unknown): boolean {
    // Strict equality check for primitives and same object instances
    if (x === ref) {
        return true
    }

    // If x or y is not an object, they can't be deeply equal (unless they are ===)
    if (!isObj(x) || !isObj(ref)) {
        return false
    }

    // At this point, x and y are non-null objects.
    // isSameObj will handle the detailed comparison.
    // We pass `y` as the second argument which is known to be an object.
    return isSameObj(x, ref)
}
