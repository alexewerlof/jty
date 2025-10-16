/**
 * Checks if a value is a function
 *
 * This is exactly liker `typeof x === "function"` but a bit shorter
 *
 * If you are using TypeScript and you know the function signature, you can provide the generic `T` for your guard.
 * @param x possibly a function (including static methods but not getters or setters)
 *
 * @example
 * isFn(() => void) => true
 * isFn(Array.isArray) => true
 * isFn(function () {}) => true
 * isFn(Function) => true
 * isFn(HTMLElement) => true
 *
 * @category Function
 */
export function isFn<T extends Function>(x: unknown): x is T {
    return typeof x === 'function'
}
