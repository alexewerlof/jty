/**
 * Checks if a value is a big integer number (`BigInt`) and optionally bound by a min and max (inclusive)
 *
 * @see {@link isInt}
 * @see {@link isNum}
 *
 * @param x possibly a big integer number
 *
 * @example
 * isBigInt(43567877) => false
 * isBigInt(43567877n) => true
 *
 * @category BigInt
 */
export function isBigInt(x: unknown): x is BigInt {
    return typeof x === 'bigint'
}
