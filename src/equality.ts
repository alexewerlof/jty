import { isDate, isErr, isMap, isObj, isRegExp, isSet } from './object.js'

const { hasOwnProperty } = Object
const { isArray } = Array

/**
 * Checks if two arrays are the same.
 * Two arrays are considered the same if they have the same length and their elements are strictly equal at each index.
 * This function acts as a type guard, narrowing the type of `b` to be the same as `a` if it returns `true`.
 *
 * @see {@link isArr}
 * @see {@link isEqualObj}
 *
 * @param x The first value to compare.
 * @param ref The reference array.
 * @returns `true` if the arrays are the same, `false` otherwise.
 *
 * @example
 * isEqualArr([1, 2, 3], [1, 2, 3]) => true
 * isEqualArr([1, 2, 3], [1, 2, 3, 4]) => false
 * isEqualArr([1, 2, 3, 4], [1, 2, 3]) => false
 * isEqualArr([], []) => true
 * isEqualArr([], [1, 2, 3]) => false
 * isEqualArr({}, [1, 2, 3]) => false
 * isEqualArr([1, 2, 3], [3, 2, 1]) => false
 * @throws {TypeError} if `ref` is not an array.
 *
 * @category Array
 */
export function isEqualArr<T>(x: unknown, ref: T[]): x is typeof ref {
    if (!isArray(ref)) {
        throw new TypeError(`isEqualArr(): "ref" must be an array. Got ${JSON.stringify(ref)} (${typeof ref})`)
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
 *
 * @see {@link isSet}
 * @see {@link isEqualObj}
 *
 * @param x The first value to compare.
 * @param ref The reference Set.
 * @returns `true` if the sets are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a Set.
 *
 * @example
 * isEqualSet(new Set([1, 2]), new Set([1, 2])) => true
 * isEqualSet(new Set([1, 2]), new Set([1, 3])) => false
 * isEqualSet(new Set([1, 2]), new Set([1, 2, 3])) => false
 * isEqualSet(new Set(), new Set()) => true
 *
 * @category Object
 */
export function isEqualSet<T>(x: unknown, ref: Set<T>): x is Set<T> {
    if (!isSet(ref)) {
        throw new TypeError(`isEqualSet(): "ref" must be a Set. Got ${ref} (${typeof ref})`)
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
 *
 * @see {@link isMap}
 * @see {@link isEqualObj}
 *
 * @param x The first value to compare.
 * @param ref The reference Map.
 * @returns `true` if the maps are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a Map.
 *
 * @example
 * isEqualMap(new Map([['a', 1]]), new Map([['a', 1]])) => true
 * isEqualMap(new Map([['a', 1]]), new Map([['a', 2]])) => false
 * isEqualMap(new Map([['a', 1]]), new Map([['b', 1]])) => false
 * isEqualMap(new Map(), new Map()) => true
 *
 * @category Object
 */
export function isEqualMap<T, U>(x: unknown, ref: Map<T, U>): x is Map<T, U> {
    if (!isMap(ref)) {
        throw new TypeError(`isEqualMap(): "ref" must be a Map. Got ${ref} (${typeof ref})`)
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
 *
 * @see {@link isRegExp}
 * @see {@link isEqualObj}
 *
 * @param x The first value to compare.
 * @param ref The reference RegExp.
 * @returns `true` if the regular expressions are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a RegExp.
 *
 * @example
 * isEqualRegExp(/a/g, /a/g) => true
 * isEqualRegExp(/a/i, /a/g) => false
 * isEqualRegExp(/a/, /b/) => false
 * isEqualRegExp(new RegExp('a', 'g'), /a/g) => true
 *
 * @category Object
 */
export function isEqualRegExp(x: unknown, ref: RegExp): x is RegExp {
    if (!isRegExp(ref)) {
        throw new TypeError(`isEqualRegExp(): "ref" must be a RegExp. Got ${ref} (${typeof ref})`)
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
 *
 * @see {@link isDate}
 * @see {@link isEqualObj}
 *
 * @param x The first value to compare.
 * @param ref The reference Date.
 * @returns `true` if the dates are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not a Date.
 *
 * @example
 * isEqualDate(new Date(2020, 0, 1), new Date(2020, 0, 1)) => true
 * isEqualDate(new Date(2020, 0, 1), new Date(2020, 0, 2)) => false
 *
 * @category Object
 */
export function isEqualDate(x: unknown, ref: Date): x is Date {
    if (!isDate(ref)) {
        throw new TypeError(`isEqualDate(): "ref" must be a Date. Got ${ref} (${typeof ref})`)
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
 *
 * @see {@link isErr}
 * @see {@link isEqualObj}
 *
 * @param x The first value to compare.
 * @param ref The reference Error.
 * @returns `true` if the errors are the same, `false` otherwise.
 * @throws {TypeError} if `ref` is not an Error.
 *
 * @example
 * isEqualErr(new Error('test'), new Error('test')) => true
 * isEqualErr(new Error('test'), new TypeError('test')) => false
 * isEqualErr(new Error('test'), new Error('other')) => false
 *
 * @category Object
 */
export function isEqualErr(x: unknown, ref: Error): x is Error {
    if (!isErr(ref)) {
        throw new TypeError(`isEqualErr(): "ref" must be an Error. Got ${ref} (${typeof ref})`)
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
 * @see {@link isEqualArr}
 *
 * @param x The first value to compare.
 * @param ref The reference object to compare against.
 * @returns `true` if the objects are deeply equal, `false` otherwise.
 * @throws {TypeError} if `ref` is not a non-null object.
 *
 * @example
 * isEqualObj({ a: 1, b: 2 }, { a: 1, b: 2 }) => true
 * isEqualObj({ a: 1, b: 2 }, { a: 1, c: 2 }) => false
 * isEqualObj([1, 2], [1, 2]) => true
 * isEqualObj(new Set([1]), new Set([1])) => true
 * isEqualObj(new Date('2020-01-01'), new Date('2020-01-01')) => true
 *
 * @category Object
 */
export function isEqualObj(x: unknown, ref: object): x is typeof ref {
    if (!isObj(ref)) {
        throw new TypeError(`isEqualObj(): "ref" must be an object. Got ${ref} (${typeof ref})`)
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
        return isEqualArr(x, ref)
    }

    if (ref instanceof Set) {
        return isEqualSet(x, ref)
    }

    if (ref instanceof Map) {
        return isEqualMap(x, ref)
    }

    if (ref instanceof Error) {
        return isEqualErr(x, ref)
    }

    if (ref instanceof Date) {
        return isEqualDate(x, ref)
    }

    if (ref instanceof RegExp) {
        return isEqualRegExp(x, ref)
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
 * It's used by `isEqualObj` to recursively compare values.
 *
 * @example
 * isDeepEqual(1, 1) => true
 * isDeepEqual(1, 2) => false
 * isDeepEqual('a', 'a') => true
 * isDeepEqual({ a: { b: 1 } }, { a: { b: 1 } }) => true
 * isDeepEqual({ a: 1 }, { a: 2 }) => false
 * isDeepEqual([1, [2, 3]], [1, [2, 3]]) => true
 *
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
    // isEqualObj will handle the detailed comparison.
    // We pass `y` as the second argument which is known to be an object.
    return isEqualObj(x, ref)
}
