/**
 * Checks if the provided value is boolean (basically `true` or `false`)
 *
 * This is exactly `typeof x === "boolean"` but a bit shorter
 *
 * @param x possibly a boolean value
 *
 * @example
 * isBool(true) => true
 * isBool(false) => true
 * isBool('true') => false
 * isBool(undefined) => false
 * isBool(null) => false
 *
 * @category Boolean
 */
export function isBool(x: unknown): x is boolean {
    return typeof x === 'boolean'
}
