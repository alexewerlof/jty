import { isFn } from './misc.js'
import { isNum } from './number.js'

const { hasOwnProperty } = Object

/**
 * Checks if a value is a non-null object
 *
 * @see {@link isInstance}
 * @see {@link isOwnInstance}
 * @see {@link isPromise}
 * @see {@link hasPath}
 * @see {@link hasOwnPath}
 * @see {@link hasProp}
 * @see {@link hasOwnProp}
 * @see {@link isArr}
 * @see {@link isPOJO}
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
 * Checks if a value is a Plain Old Javascript Object (POJO)
 *
 * This function returns false for Array, Map, Set, etc. Basically it only
 * returns true if `x` is a so called Plain Old Javascript Object.
 *
 * @see {@link isObj}
 * @see {@link isArr}
 *
 * @example
 * isPOJO({}) => true
 * isPOJO(Object.create(null)) => true
 * isPOJO([]) => false
 * isPOJO(new Map()) => false
 * isPOJO(new Set()) => false
 *
 * @param x possibly a POJO
 * @returns true if the value is a Plain Old Javascript Object, false otherwise
 *
 * @category Object
 */
export function isPOJO(x: unknown): x is Record<PropertyKey, unknown> {
    if (!isObj(x)) return false
    const proto = Object.getPrototypeOf(x)
    return proto === Object.prototype || proto === null
}

/**
 * Checks if a provided value is an instance of the provided class (considers inheritance)
 *
 * Uses the `instanceof` operator under the hood but does not throw for some cases
 * where JavaScript chokes (e.g. `2 instanceof NaN` throws, but `isInstance(2, NaN)` returns `false`).
 *
 * @see {@link isOwnInstance}
 *
 * @example
 * isInstance({}, Object) => true
 * isInstance(Promise.resolve(), Promise) => true
 * isInstance(/hello/i, RegExp) => true
 * isInstance('plain str', String) => false
 * isInstance(new String('str obj'), String) => true
 * isInstance(22, Number) => false
 * isInstance(new Number(33), Number) => true
 * isInstance(2, NaN) => false // Note that `2 instanceof NaN` throws
 *
 * @param x possibly an instance of a class
 * @param classConstructor a class constructor (usually starts with big letter!)
 * @throws {TypeError} if `classConstructor` is not a function.
 *
 * @category Object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInstance<T extends new (...args: any[]) => any>(
    x: unknown,
    classConstructor: T,
): x is InstanceType<T> {
    if (!isFn(classConstructor)) {
        throw new TypeError(
            `isInstance(): "classConstructor" must be a constructor function. Got ${classConstructor} (${typeof classConstructor})`,
        )
    }
    return x instanceof classConstructor
}

/**
 * Checks if a value was directly constructed by the provided class (ignores inheritance)
 *
 * Unlike {@link isInstance} which uses `instanceof` and walks the prototype chain,
 * `isOwnInstance` only returns `true` when the value's immediate prototype matches
 * `classConstructor.prototype`. This means subclass instances return `false` when
 * checked against a parent class.
 *
 * @see {@link isInstance}
 *
 * @example
 * class Animal {}
 * class Dog extends Animal {}
 * const dog = new Dog()
 *
 * isOwnInstance(dog, Dog) => true
 * isOwnInstance(dog, Animal) => false // dog's direct prototype is Dog.prototype
 * isInstance(dog, Animal) => true     // for comparison: instanceof walks the chain
 *
 * isOwnInstance({}, Object) => true
 * isOwnInstance([], Object) => false  // direct prototype is Array.prototype
 * isOwnInstance([], Array) => true
 * isOwnInstance(/hello/i, RegExp) => true
 * isOwnInstance('plain str', String) => false
 * isOwnInstance(22, Number) => false
 * isOwnInstance(Object.create(null), Object) => false
 *
 * @param x possibly a direct instance of a class
 * @param classConstructor a class constructor (usually starts with big letter!)
 * @throws {TypeError} if `classConstructor` is not a function.
 *
 * @category Object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isOwnInstance<T extends new (...args: any[]) => any>(
    x: unknown,
    classConstructor: T,
): x is InstanceType<T> {
    if (!isFn(classConstructor)) {
        throw new TypeError(
            `isOwnInstance(): "classConstructor" must be a constructor function. Got ${classConstructor} (${typeof classConstructor})`,
        )
    }
    return isObj(x) && Object.getPrototypeOf(x) === classConstructor.prototype
}

/**
 * Creates a deeply nested record type from a tuple of property keys.
 *
 * @category Object
 */
export type DeepRecord<K extends readonly PropertyKey[], V = object> = K extends readonly [infer Head, ...infer Tail]
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
 * @example
 * const x = { foo: { bar: { baz: undefined }}}
 * hasOwnPath(x, 'foo', 'bar') => true
 * hasOwnPath(x, 'foo', 'bar', 'baz') => true
 * hasOwnPath(x, 'foo', 'hello', 'baz') => false
 *
 * // Unlike hasPath, it does not follow inherited properties
 * const obj = { a: Object.create({ b: 1 }) }
 * hasOwnPath(obj, 'a', 'b') => false
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

    for (const propName of propNames) {
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
 * @example
 * hasOwnProp({ foo: 'bar' }, 'foo') => true
 * hasOwnProp({ foo: 'bar' }, 'baz') => false
 * hasOwnProp({ foo: 'bar', baz: 'cux' }, 'foo', 'baz') => true
 *
 * // Unlike hasProp, it does not find inherited properties
 * hasOwnProp({}, '__proto__') => false
 * hasOwnProp({}, 'constructor') => false
 *
 * @category Object
 */
export function hasOwnProp<K extends PropertyKey>(x: unknown, ...propNames: readonly K[]): x is Record<K, unknown> {
    if (!isObj(x)) {
        return false
    }

    for (const propName of propNames) {
        if (!hasOwnProperty.call(x, propName)) {
            return false
        }
    }

    return true
}

/**
 * Checks if a value is a Set.
 *
 * @see {@link isInstance}
 * @see {@link isEqualSet}
 *
 * @example
 * isSet(new Set()) => true
 * isSet(new Map()) => false
 * isSet([1, 2, 3]) => false
 *
 * @category Object
 */
export function isSet(x: unknown): x is Set<unknown> {
    return isInstance(x, Set)
}

/**
 * Checks if a value is a native Promise instance.
 *
 * This guard is intentionally strict and uses `instanceof Promise` semantics.
 * It does not use `.then()` / `.catch()` feature sniffing.
 *
 * Use {@link isPromiseLike} if you want to accept general thenables.
 *
 * @see {@link isInstance}
 * @see {@link isPromiseLike}
 *
 * @example
 * isPromise(Promise.resolve(123)) => true
 * isPromise(new Promise(() => {})) => true
 * isPromise({ then: () => {}, catch: () => {} }) => false
 * isPromise(42) => false
 *
 * @category Object
 */
export function isPromise(x: unknown): x is Promise<unknown> {
    return isInstance(x, Promise)
}

/**
 * Checks if a value is Promise-like (thenable).
 *
 * Returns true for native Promise instances and for values that expose a callable
 * `.then` method. This is useful when you do not care whether the value is literally
 * a Promise instance and only need awaitable behavior.
 *
 * @remarks
 * This function does not care if there is a `.catch` method or not.
 * Only presence of `.then` is sufficient to be considered Promise-like.
 *
 * @see {@link isPromise}
 * @see {@link isInstance}
 *
 * @example
 * isPromiseLike(Promise.resolve(123)) => true
 * isPromiseLike({ then: () => {} }) => true
 * isPromiseLike(() => {}) => false
 * isPromiseLike({ then: true }) => false
 *
 * @category Object
 */
export function isPromiseLike(x: unknown): x is PromiseLike<unknown> {
    if (isPromise(x)) {
        return true
    }

    if (!isObj(x) && !isFn(x)) {
        return false
    }

    const then = (x as { then?: unknown }).then
    return isFn(then)
}

/**
 * Checks if a value is a Map.
 *
 * @see {@link isInstance}
 * @see {@link isEqualMap}
 *
 * @example
 * isMap(new Map()) => true
 * isMap(new Set()) => false
 * isMap({}) => false
 *
 * @category Object
 */
export function isMap(x: unknown): x is Map<unknown, unknown> {
    return isInstance(x, Map)
}

/**
 * Checks if a value is a RegExp.
 *
 * @see {@link isInstance}
 * @see {@link isEqualRegExp}
 *
 * @example
 * isRegExp(/a/) => true
 * isRegExp(new RegExp('a')) => true
 * isRegExp('/a/') => false
 *
 * @category Object
 */
export function isRegExp(x: unknown): x is RegExp {
    return isInstance(x, RegExp)
}

/**
 * Checks if a value is a valid Date.
 *
 * Returns `false` for invalid Date objects (e.g. `new Date('not a date')`) because
 * their time value is `NaN`, making them unusable for date arithmetic and formatting.
 *
 * @see {@link isInstance}
 * @see {@link isEqualDate}
 *
 * @example
 * isDate(new Date()) => true
 * isDate(new Date('2024-01-01')) => true
 * isDate(new Date(0)) => true
 * isDate(new Date('not a date')) => false
 * isDate(Date.now()) => false
 * isDate('2022-01-01') => false
 *
 * @category Object
 */
export function isDate(x: unknown): x is Date {
    return isInstance(x, Date) && isNum(x.getTime())
}

/**
 * Checks if a value is an Error or a descendant of it.
 *
 * @see {@link isInstance}
 * @see {@link isEqualErr}
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
    return isInstance(x, Error)
}
