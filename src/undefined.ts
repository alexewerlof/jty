/**
 * Checks if the provided value is defined
 * This is exactly `x !== undefined` but a bit shorter
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
 * @see {@link isNsh}
 *
 * @param x any value
 *
 * @category Undefined
 */
export function isDef(x: unknown): x is Exclude<any, undefined> {
    return x !== undefined
}

/**
 * Checks if the provided value is null or undefined.
 * This is equivalent to `x == null` but is more explicit and provides a type guard.
 *
 * @example
 * // Basic usage
 * isNullish(null) => true
 * isNullish(undefined) => true
 * isNullish(0) => false
 * isNullish('') => false
 *
 * // Using as a type guard to filter out nullish values
 * const values = [1, undefined, 2, null, 3];
 * const nonNullishValues = values.filter(v => !isNullish(v));
 * // nonNullishValues is now [1, 2, 3]
 * // and its type has been narrowed to number[]
 *
 * @see {@link isDef}
 *
 * @param x any value
 *
 * @category Undefined
 */
export function isNullish(x: unknown): x is null | undefined {
    return x === null || x === undefined
}
