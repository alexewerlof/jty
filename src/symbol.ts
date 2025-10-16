/**
 * Checks if the provided value is a symbol
 *
 * This is exactly `typeof x === "symbol"` but a bit shorter.
 *
 * @param x possibly a symbol
 *
 * @example
 * isSym(Symbol()) => true
 * isSym(Symbol.iterator) => true
 *
 * isSym('symbol') => false
 * isSym(123) => false
 * isSym(null) => false
 * isSym({}) => false
 * isSym([]) => false
 *
 * @category Symbol
 */
export function isSym(x: unknown): x is symbol {
    return typeof x === 'symbol'
}
