import { isFn } from './misc.js'

const { hasOwnProperty } = Object

/**
 * Checks if a value is a non-null object
 *
 * @see {@link isA}
 * @see {@link hasPath}
 * @see {@link hasOwnPath}
 * @see {@link hasProp}
 * @see {@link hasOwnProp}
 * @see {@link isArr}
 *
 * @example
 * isObj({}) => true
 * isObj(Object.create(null)) => true
 * isObj(null) => false
 * isObj([]) => true
 * isObj(new URL) => true
 * isObj(13) => false
 * isObj(Number(13)) => false
 * isObj(new Number(14)) => true
 *
 * @param x possibly an object
 * @returns true if the value is an non-null object, false otherwise
 *
 * @category Object
 */
export function isObj(x: unknown): x is Exclude<object, null> {
    return Boolean(x) && typeof x === 'object'
}

/**
 * Checks if a provided value is an instance of the provided class
 *
 * This does not throw for some cases where JavaScript chokes ()
 *
 * @example
 * isA({}, Object) => true
 * isA(Promise.resolve, Promise) => true
 * isA(/hello/i, RegExp) => true
 * isA('plain str', String) => false
 * isA(new String('str obj'), String) => true
 * isA(22, Number) => false
 * isA(new Number(33), Number) => true
 * isA(2, NaN) => false // Note that `2 instanceof NaN` throws
 *
 * @param x possibly an instance of a class
 * @param classConstructor a class constructor (usually starts with big letter!)
 * @throws {TypeError} if `classConstructor` is not a function.
 *
 * @category Object
 */
export function isA<T extends new (...args: any) => any>(x: unknown, classConstructor: T): x is InstanceType<T> {
    if (!isFn(classConstructor)) {
        throw new TypeError(`Expected a constructor function. Got ${classConstructor} (${typeof classConstructor})`)
    }
    return x instanceof classConstructor
}

/**
 * @internal
 * Creates a deeply nested record type from a tuple of property keys.
 */
type DeepRecord<K extends readonly PropertyKey[], V = object> = K extends readonly [infer Head, ...infer Tail]
    ? Head extends PropertyKey
        ? Tail extends readonly PropertyKey[]
            ? { [P in Head]: DeepRecord<Tail, V> }
            : V
        : V
    : V

/**
 * Checks if the provided value has the a path of properties
 *
 * @see {@link isObj}
 * @see {@link hasProp}
 * @see {@link hasOwnProp}
 * @see {@link hasOwnPath}
 *
 * @example
 * const x = { foo: { bar: { baz: undefined }}}
 * hasPath(x, 'foo', 'bar') => true
 * hasPath(x, 'foo', 'bar', 'baz') => true
 * hasPath(x, 'foo', 'hello', 'baz') => false
 * hasPath(x, 'foo', 'bar', 'hello') => false
 *
 * @param x a value that may possibly have some properties
 * @param propNames one or more property names
 *
 * @category Object
 */
export function hasPath<K extends readonly PropertyKey[]>(
    x: unknown,
    ...propNames: readonly [...K]
): x is DeepRecord<K> {
    if (propNames.length === 0) {
        return false
    }

    let scope: unknown = x

    for (const propName of propNames) {
        if (isObj(scope) && hasProp(scope, propName)) {
            scope = scope[propName]
        } else {
            return false
        }
    }

    return true
}

/**
 * Similar to {@link hasPath} but only works for own properties (not inherited properties)
 *
 * @see {@link isObj}
 * @see {@link hasProp}
 * @see {@link hasOwnProp}
 * @see {@link hasPath}
 *
 * @param x a value that may possibly have some properties
 * @param propNames one or more property names
 *
 * @category Object
 */
export function hasOwnPath<K extends readonly PropertyKey[]>(
    x: unknown,
    ...propNames: readonly [...K]
): x is DeepRecord<K> {
    if (propNames.length === 0) {
        return false
    }

    let scope: unknown = x

    for (const propName of propNames) {
        if (isObj(scope) && hasOwnProp(scope, propName)) {
            scope = scope[propName]
        } else {
            return false
        }
    }

    return true
}

/**
 * Checks if x is a non-null object that has all the provided properties
 *
 * @see {@link isObj}
 * @see {@link hasOwnProp}
 * @see {@link hasPath}
 * @see {@link hasOwnPath}
 *
 * @param x an object
 * @param propNames one or more property names
 *
 * @example
 * const a = { b: undefined, c:[0, 1, 2]}
 * hasProp(a, 'b') => true
 * hasProp(a, 'b', 'c') => true // both `a.b` and `a.c` properties exist
 * hasProp(a.c, '0', 1, 'length') => true // `a.c` is an array that has all those properties
 *
 * @category Object
 */
export function hasProp<K extends PropertyKey>(x: unknown, ...propNames: readonly K[]): x is Record<K, unknown> {
    if (!isObj(x)) {
        return false
    }

    for (let propName of propNames) {
        if (!(propName in x)) {
            return false
        }
    }

    return true
}

/**
 * Same as {@link hasProp} but checks for own properties (not inherited properties)
 *
 * @see {@link isObj}
 * @see {@link hasProp}
 * @see {@link hasPath}
 * @see {@link hasOwnPath}
 *
 * @param x an object
 * @param propNames one or more property names
 *
 * @category Object
 */
export function hasOwnProp<K extends PropertyKey>(x: unknown, ...propNames: readonly K[]): x is Record<K, any> {
    if (!isObj(x)) {
        return false
    }

    for (let propName of propNames) {
        if (!hasOwnProperty.call(x, propName)) {
            return false
        }
    }

    return true
}

/**
 * Checks if a value is a Set.
 *
 * @example
 * isSet(new Set()) => true
 * isSet(new Map()) => false
 * isSet([1, 2, 3]) => false
 *
 * @category Object
 */
export function isSet(x: unknown) {
    return isA(x, Set)
}

/**
 * Checks if a value is a Map.
 *
 * @example
 * isMap(new Map()) => true
 * isMap(new Set()) => false
 * isMap({}) => false
 *
 * @category Object
 */
export function isMap(x: unknown) {
    return isA(x, Map)
}

/**
 * Checks if a value is a RegExp.
 *
 * @example
 * isRegExp(/a/) => true
 * isRegExp(new RegExp('a')) => true
 * isRegExp('/a/') => false
 *
 * @category Object
 */
export function isRegExp(x: unknown): x is RegExp {
    return isA(x, RegExp)
}

/**
 * Checks if a value is a Date.
 *
 * @example
 * isDate(new Date()) => true
 * isDate(Date.now()) => false
 * isDate('2022-01-01') => false
 *
 * @category Object
 */
export function isDate(x: unknown): x is Date {
    return isA(x, Date)
}

/**
 * Checks if a value is an Error or a descendant of it.
 *
 * @example
 * class MyError extends Error {}
 * isErr(new MyError()) => true
 * isErr(new Error()) => true
 * isErr(new TypeError()) => true
 * isErr({ message: 'error' }) => false
 *
 * @category Object
 */
export function isErr(x: unknown): x is Error {
    return isA(x, Error)
}
