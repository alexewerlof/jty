---
name: jty
description: A minimal, AI friendly, zero-dependency TypeScript type-checking library with runtime type guards and developer ergonomy
---

# jty — JavaScript/TypeScript Type Guards

`jty` is a minimal, zero-dependency library for runtime type checking.
Every function returns `true`/`false` and acts as a TypeScript [type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), narrowing the type of the checked value.

## Installation

```bash
npm i jty
```

## Import

```typescript
// Import specific functions (recommended — tree-shakeable)
import { isStr, isNum, isArr, hasProp } from 'jty'

// Or import everything
import * as jty from 'jty'
```

## jty API patterns

1. **First parameter is always `x`** — the value being checked
2. **Returns `boolean`** — `true` if the check passes, `false` otherwise
3. **Never throws for `x`** — invalid `x` returns `false`
4. **Throws only for invalid references** — e.g. `isArrIdx(1, 'not an array')` throws `TypeError` because it's likely a programming error
5. **Type guards** — after a truthy check, TypeScript narrows the type of `x`

## Function Reference

### Primitives

| Function       | Check                                | Type guard               |
| -------------- | ------------------------------------ | ------------------------ |
| `isStr(x)`     | `typeof x === 'string'`              | `x is string`            |
| `isNum(x)`     | `typeof x === 'number' && !isNaN(x)` | `x is number`            |
| `isInt(x)`     | `Number.isInteger(x)`                | `x is number`            |
| `isFin(x)`     | `Number.isFinite(x)`                 | `x is number`            |
| `isBool(x)`    | `typeof x === 'boolean'`             | `x is boolean`           |
| `isSym(x)`     | `typeof x === 'symbol'`              | `x is symbol`            |
| `isBigInt(x)`  | `typeof x === 'bigint'`              | `x is BigInt`            |
| `isDef(x)`     | `x !== undefined`                    | `x is T` (generic)       |
| `isNullish(x)` | `x === null \|\| x === undefined`    | `x is null \| undefined` |
| `isFn(x)`      | `typeof x === 'function'`            | `x is T` (generic)       |

### Strings

| Function                  | Check                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| `isStrLen(x, min?, max?)` | Is `x` a string with length in `[min, max]`?                           |
| `isStrIdx(x, str)`        | Is `x` a valid index for string `str`? Throws if `str` isn't a string. |

### Numbers

| Function                    | Check                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------- |
| `inRange(x, min?, max?)`    | Is `x` a number in `[min, max]`? At least one bound required. Throws if bounds aren't numbers. |
| `inRangeInt(x, min?, max?)` | Same as `inRange` but also checks `x` is an integer.                                           |
| `isIdx(x, length)`          | Is `x` an integer in `[0, length)`? Throws if `length` isn't a non-negative integer.           |

### Arrays

| Function               | Check                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `isArr(x, min?, max?)` | Is `x` an array with length in `[min, max]`?                                             |
| `isArrIdx(x, arr)`     | Is `x` a valid index for array `arr`? Throws if `arr` isn't an array.                    |
| `inArr(x, arr)`        | Is `x` an element of `arr`? Throws if `arr` isn't an array. Narrows `x` to element type. |

### Objects

| Function                 | Check                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `isObj(x)`               | Is `x` a non-null object? (includes arrays, maps, sets, etc.)                          |
| `isPOJO(x)`              | Is `x` a plain object literal? (`false` for arrays, maps, `Object.create(null)`, etc.) |
| `isA(x, Constructor)`    | Is `x` an instance of `Constructor`? Throws if `Constructor` isn't a function.         |
| `hasProp(x, ...keys)`    | Does object `x` have all listed properties? (includes inherited)                       |
| `hasOwnProp(x, ...keys)` | Same as `hasProp` but only own properties.                                             |
| `hasPath(x, ...keys)`    | Does `x` have a nested property path? (includes inherited)                             |
| `hasOwnPath(x, ...keys)` | Same as `hasPath` but only own properties.                                             |
| `isSet(x)`               | Is `x` a `Set`?                                                                        |
| `isMap(x)`               | Is `x` a `Map`?                                                                        |
| `isRegExp(x)`            | Is `x` a `RegExp`?                                                                     |
| `isDate(x)`              | Is `x` a valid `Date`? (`false` for `new Date('invalid')`)                             |
| `isErr(x)`               | Is `x` an `Error` (or subclass)?                                                       |

### Equality Comparisons

All `isEqual*` functions take `(x, ref)` where `ref` is the reference value.
They throw `TypeError` if `ref` is not the expected type.

| Function                | Comparison                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------- |
| `isEqualArr(x, ref)`    | Same length, same elements at each index (strict `===`)                                      |
| `isEqualSet(x, ref)`    | Same size, same values                                                                       |
| `isEqualMap(x, ref)`    | Same size, same key-value pairs (strict `===`)                                               |
| `isEqualRegExp(x, ref)` | Same `source` and `flags`                                                                    |
| `isEqualDate(x, ref)`   | Same `getTime()` value                                                                       |
| `isEqualErr(x, ref)`    | Same `name` and `message`                                                                    |
| `isEqualObj(x, ref)`    | Deep equality — dispatches to the appropriate `isEqual*` for known types, recurses for POJOs |
| `isDeepEqual(x, ref)`   | General-purpose: uses `===` for primitives, `isEqualObj` for objects                         |

## Usage Patterns

### Basic type checking

```typescript
import { isStr, isNum } from 'jty'

function greet(name: unknown) {
    if (!isStr(name)) {
        throw new TypeError(`Expected a string, got ${typeof name}`)
    }
    // TypeScript knows `name` is a string here
    return `Hello, ${name.toUpperCase()}!`
}
```

### Validating API responses

```typescript
import { isArr, isPOJO, isStr } from 'jty'

function validateUsers(data: unknown): data is { name: string }[] {
    if (!isArr(data, 1)) {
        throw new TypeError(`Expected a non-empty array. Got: ${typeof data}`)
    }
    for (let i = 0; i < data.length; i++) {
        const item = data[i]
        // Ensure it's a plain object
        if (!isPOJO(item)) {
            throw new TypeError(`Item ${i} is not a POJO. Got: ${item} (${typeof item})`)
        }
        // If TypeScript is in strict mode, you might optionally use hasProp(item, 'name') here
        if (!isStr(item.name)) {
            throw new TypeError(`Item ${i} has invalid "name". Got ${item.name} (${typeof item.name})`)
        }
    }

    // Type guards must explicitly return true if no errors were thrown
    return true
}
```

### Composition

You can create your own type guards by composing new functions from jty primitives:

```typescript
const VALID_ROLES = ['system', 'user', 'assistant']
function isMessage(x: unknown): x is { role: string; content: string } {
    return hasProps(x, 'role', 'content') && inArr(x.role, VALID_ROLES) && isStr(x.content)
}
function isMessagesArr(x: unknown): x is { role: string; content: string }[] {
    return isArr(x) && x.every(isMessage)
}
```

### Filtering with type narrowing

```typescript
import { isDef, isNum } from 'jty'

const values = [1, undefined, 2, undefined, 3]
const defined = values.filter(isDef)
// defined: number[] (not (number | undefined)[])
```

### Deep nested property access

```typescript
import { hasPath } from 'jty'

function getCity(config: unknown): string {
    if (hasPath(config, 'user', 'address', 'city')) {
        return config.user.address.city // TypeScript knows the full path exists
    }
    return 'Unknown'
}
```

### Comparing values

```typescript
import { isEqualObj, isDeepEqual } from 'jty'

const config1 = { theme: 'dark', sizes: [10, 20] }
const config2 = { theme: 'dark', sizes: [10, 20] }

isDeepEqual(config1, config2) // true — deep recursive comparison
isDeepEqual(config1, config2.sizes) // false — different types
```

## AI Agent Guidelines: Best Practices & Defensive Programming

When writing TypeScript or JavaScript code using `jty`, follow these defensive programming best practices:

1. **Verify External Inputs:** ALWAYS validate the shape and values of input from external origins (e.g., API payloads, user forms, AI-generated tools calls, parsed JSON/YAML) at the application constraints boundaries before processing.
2. **Fail Fast and Locally:** Validate parameters close to where the code logic depends on them. Validating arguments directly inside the function that uses them produces clearer stack traces and isolates type requirements, simplifying refactoring. If a function merely passes an argument to another one, the latter should do the type checking to keep the logic localized to where it's used and reduce the burden of maintaining it in different places.
3. **Use Standard Error Classes:** Throw the appropriate standard JavaScript error subclass:
    - `TypeError`: When a value has an unexpected type (e.g. `!isStr(x)` or `!isObj(x)`).
    - `ReferenceError`: When a required property is missing (e.g. `!hasProp(obj, 'key')`).
    - `RangeError`: When a value falls outside of an expected boundary (e.g. `!inRange(x, 0, 10)` or `!isArrIdx(i, arr)`).
    - `SyntaxError`: For malformed structures or failures when validating parsed strings/JSON.
4. **Construct Expressive Error Messages:** Always write detailed exceptions that provide enough context to troubleshoot without debugging. State exactly **what failed**, **what was expected**, and **what was actually received** alongside its type (when relevant and helpful for debugging).
5. **Protect Function Signatures:** If you are writing TypeScript exported primitives that might be called from plain JavaScript, verify the inputs of those user-facing APIs. Never blindly rely on TypeScript's compile-time guarantees for runtime values.
