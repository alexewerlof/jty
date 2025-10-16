import { isFn } from './function'
import { inRange } from './number'

/**
 * Acceptable types for object property names
 */
type ObjectProp = string | number | symbol

const { hasOwnProperty } = Object
const { isArray } = Array

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
 * isObj(null) => false
 * isObj([]) => true
 * isObj(new URL) => true
 * isObj(13) => false
 * isObj(Number(13)) => false
 *
 * @param x possibly an object
 * @return true if the value is an non-null object, false otherwise
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
 *
 * @category Object
 */
export function isA<T extends new (...args: any) => any>(
    x: unknown,
    classConstructor: T,
): x is InstanceType<T> {
    return isFn(classConstructor) && x instanceof classConstructor
}

/**
 * Checks if the provided value is an array
 *
 * @see {@link isObj}
 *
 * @param x possibly a string
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 *
 * @category Object
 */
export function isArr(x: unknown, minLen = 0, maxLen?: number): x is unknown[] {
    return isArray(x) && inRange(x.length, minLen, maxLen)
}

/**
 * @internal
 * Creates a deeply nested record type from a tuple of property keys.
 */
type DeepRecord<
    K extends readonly ObjectProp[],
    V = object,
> = K extends readonly [infer Head, ...infer Tail]
    ? Head extends ObjectProp
        ? Tail extends readonly ObjectProp[]
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
 * hasPath(x, 'foo', 'bar') returns true
 * hasPath(x, 'foo', 'bar', 'baz') returns true because x.foo.bar.baz property exists
 * hasPath(x, 'foo', 'hello', 'baz') returns false because x.foo.hello property does not exist
 * hasPath(x, 'foo', 'bar', 'hello') returns false`
 *
 * @param x a value that may possibly have some properties
 * @param propNames one or more property names
 *
 * @category Object
 */
export function hasPath<K extends readonly ObjectProp[]>(
    x: unknown,
    ...propNames: readonly [...K]
): x is DeepRecord<K> {
    if (propNames.length === 0) {
        return false
    }

    let scope = x

    for (let propName of propNames) {
        if (hasProp(scope, propName)) {
            // @ts-ignore
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
export function hasOwnPath<K extends readonly ObjectProp[]>(
    x: unknown,
    ...propNames: readonly [...K]
): x is DeepRecord<K> {
    if (propNames.length === 0) {
        return false
    }

    let scope = x

    for (let propName of propNames) {
        if (hasOwnProp(scope, propName)) {
            // @ts-ignore
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
export function hasProp<K extends ObjectProp>(
    x: unknown,
    ...propNames: readonly K[]
): x is Record<K, object> {
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
export function hasOwnProp<K extends ObjectProp>(
    x: unknown,
    ...propNames: readonly K[]
): x is Record<K, any> {
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
