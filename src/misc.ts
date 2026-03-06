/**
 * Checks if the provided value is defined
 * This is a type-safe equivalent to `x !== undefined`.
 *
 * @example
 * // Basic usage
 * isDef(0); // => true
 * isDef(null); // => true
 * isDef(''); // => true
 * isDef(undefined); // => false
 *
 * // Using as a type guard to filter an array
 * const values = [1, 2, undefined, 3, undefined];
 * const definedValues = values.filter(isDef);
 * // definedValues is now [1, 2, 3]
 * // and its type has been narrowed to number[]
 *
 * @see {@link isNullish}
 *
 * @param x The value to check.
 *
 * @category Undefined
 */
export function isDef<T>(x: T | undefined): x is T {
    return x !== undefined
}

/**
 * Checks if the provided value is null or undefined.
 * This is equivalent to `x == null` but is more explicit and provides a type guard.
 *
 * @example
 * // Basic usage
 * isNullish(null); // => true
 * isNullish(undefined); // => true
 * isNullish(0); // => false
 * isNullish(''); // => false
 *
 * // Using as a type guard to filter out nullish values
 * const values = [1, undefined, 2, null, 3];
 * const nonNullishValues = values.filter(v => !isNullish(v));
 * // nonNullishValues is now [1, 2, 3]
 * // and its type has been narrowed to number[]
 *
 * @see {@link isDef}
 *
 * @param x The value to check.
 *
 * @category Undefined
 */
export function isNullish(x: unknown): x is null | undefined {
    return x === null || x === undefined
}

/**
 * Checks if the provided value is boolean (basically `true` or `false`)
 *
 * This is a type-safe equivalent to `typeof x === 'boolean'`.
 *
 * @param x The value to check.
 *
 * @example
 * isBool(true); // => true
 * isBool(false); // => true
 * isBool('true'); // => false
 * isBool(undefined); // => false
 * isBool(null); // => false
 *
 * @category Boolean
 */
export function isBool(x: unknown): x is boolean {
    return typeof x === 'boolean'
}

/**
 * Checks if a value is a function
 *
 * This is a type-safe equivalent to `typeof x === 'function'`.
 *
 * If you are using TypeScript and you know the function signature, you can provide the generic `T` for your guard.
 * @param x The value to check. It can be any value, including static methods, but not getters or setters.
 *
 * @example
 * isFn(() => {}); // => true
 * isFn(Array.isArray); // => true
 * isFn(function () {}); // => true
 * isFn(Function); // => true
 * isFn(HTMLElement); // => true
 *
 * @category Function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFn<T extends (...args: any[]) => any>(x: unknown): x is T {
    return typeof x === 'function'
}

/**
 * Checks if the provided value is a symbol
 *
 * This is a type-safe equivalent to `typeof x === 'symbol'`.
 *
 * @param x The value to check.
 *
 * @example
 * isSym(Symbol()); // => true
 * isSym(Symbol.iterator); // => true
 *
 * isSym('symbol'); // => false
 * isSym(123); // => false
 * isSym(null); // => false
 * isSym({}); // => false
 * isSym([]); // => false
 *
 * @category Symbol
 */
export function isSym(x: unknown): x is symbol {
    return typeof x === 'symbol'
}

/**
 * Checks if a value is a `BigInt`.
 *
 * @see {@link isInt}
 * @see {@link isNum}
 *
 * @param x The value to check.
 *
 * @example
 * isBigInt(43567877); // => false
 * isBigInt(43567877n); // => true
 *
 * @category BigInt
 */
export function isBigInt(x: unknown): x is bigint {
    return typeof x === 'bigint'
}
