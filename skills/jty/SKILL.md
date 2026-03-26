---
name: jty
description: Guides for how to use JTY, a minimal, AI friendly, zero-dependency TypeScript type-checking library with runtime type guards and developer ergonomy. Use this skill when you want to validate variables, function parameters, or complex data structures at runtime in a TypeScript/JavaScript project. Typically when dealing with external user input, untyped 3rd-party libraries, or when you want to fail gracefully with good errors instead of cryptic exceptions.
license: MIT
---

# jty — JavaScript/TypeScript Type Guards

`jty` is a minimal, zero-dependency, AI friendly, library for runtime type checking with developer ergonomy in mind.
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

| Function                  | Check                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `isArr(x)`                | Is `x` an array?                                                                         |
| `isArrLen(x, min?, max?)` | Is `x` an array with length in `[min, max]`?                                             |
| `isArrIdx(x, arr)`        | Is `x` a valid index for array `arr`? Throws if `arr` isn't an array.                    |
| `inArr(x, arr)`           | Is `x` an element of `arr`? Throws if `arr` isn't an array. Narrows `x` to element type. |

### Objects

| Function                        | Check                                                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `isObj(x)`                      | Is `x` a non-null object? (includes arrays, maps, sets, etc.)                                                                    |
| `isPOJO(x)`                     | Is `x` a plain object literal? (`false` for arrays, maps, `Object.create(null)`, etc.)                                           |
| `isInstance(x, Constructor)`    | Is `x` an instance of `Constructor`? Considers inheritance. Throws if `Constructor` isn't a function.                            |
| `isInstance(x, Promise)`        | Strict Promise-instance check via `instanceof Promise`.                                                                          |
| `isOwnInstance(x, Constructor)` | Is `x` a **direct** instance of `Constructor`? Returns `false` for subclass instances. Throws if `Constructor` isn't a function. |
| `isPromise(x)`                  | Is `x` literally a native `Promise` instance? Strict check; does not sniff `.then()` / `.catch()`.                               |
| `isPromiseLike(x)`              | Is `x` awaitable (`PromiseLike`) by checking for a callable `.then` method?                                                      |
| `hasProp(x, ...keys)`           | Does object `x` have all listed properties? (includes inherited)                                                                 |
| `hasOwnProp(x, ...keys)`        | Same as `hasProp` but only own properties.                                                                                       |
| `hasPath(x, ...keys)`           | Does `x` have a nested property path? (includes inherited)                                                                       |
| `hasOwnPath(x, ...keys)`        | Same as `hasPath` but only own properties.                                                                                       |
| `isSet(x)`                      | Is `x` a `Set`?                                                                                                                  |
| `isMap(x)`                      | Is `x` a `Map`?                                                                                                                  |
| `isRegExp(x)`                   | Is `x` a `RegExp`?                                                                                                               |
| `isDate(x)`                     | Is `x` a valid `Date`? (`false` for `new Date('invalid')`)                                                                       |
| `isErr(x)`                      | Is `x` an `Error` (or subclass)?                                                                                                 |

Promise checks in jty:

- Use `isPromise(x)` (or `isInstance(x, Promise)`) when you need a strict native Promise instance.
- Use `isPromiseLike(x)` when you only care that the value is awaitable and has a callable `.then`.

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
    if (!isArrLen(data, 1)) {
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

## AI Agent Guidelines: Defensive Programming

When writing TypeScript or JavaScript code in a project that uses `jty`, follow the defensive programming guidelines in [defensive-programming.md](defensive-programming.md).

Key principles:

1. **Never trust external boundaries** — set types from external sources to `unknown` and verify with `jty`
2. **Verify close to usage** — validate inside the function that depends on the value, not in a distant caller
3. **Don't double-verify** — if a value is only passed through, let the consuming function validate it
4. **Use standard error classes** — `TypeError` for wrong types, `ReferenceError` for missing properties, `RangeError` for out-of-bounds, `SyntaxError` for malformed structures
5. **Emit meaningful errors** — state what failed, what was expected, what was received (with type)
6. **Chain errors with `cause`** — add context at intermediate layers to aid debugging
7. **Protect against missing TypeScript guarantees** — runtime callers may be JavaScript or AI-generated code
