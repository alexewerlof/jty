This repo contains a Javascript type checking library that is primarily published to NPM at https://www.npmjs.com/package/jty

# Development

- The code is in the latest version of Typescript
- The code should run in both modern browsers, and backend runtimes like Node.js, Deno.js, and Bun.js

# Keeping docs in sync

Whenever the code changes, ensure the following files are updated to reflect the new state:

- **`AGENTS.md`** (this file) — maintainer-facing. Update the source file organization table, naming conventions, error message format examples, or any other section that references specific functions, patterns, or behaviors that changed.
- **`SKILL.md`** — consumer-facing, shipped with the npm package. Update the function reference tables, usage patterns, and examples to match the current API.

Specifically, when you:
- **Add a function**: add it to the source file organization table in this file, and to the appropriate function reference table in `SKILL.md`.
- **Remove a function**: remove it from both files.
- **Rename a function**: update both files and ensure the test file is renamed to match.
- **Change a function's behavior**: update the documentation, examples, and tests. Update `SKILL.md` if the description or usage patterns are affected.
- **Add a new source file**: add it to the source file organization table and to `index.ts`. Add the new category to `SKILL.md`.


# Structure

- The API surface is implemented in `./src` as TypeScript files
- Each function is elaborately tested in a dedicated test file named `./test/FUNC_NAME.spec.ts` (the filename must exactly match the function name)
- Use only the Node.js native test framework
- `./src/index.ts` is a barrel file that re-exports everything via `export * from './module.js'`. New functions are added to their category file and automatically exported. Only edit `index.ts` when adding a new category file.
- Internal imports between source files must use the `.js` extension (ESM resolution): `import { isInt } from './number.js'`

## Source file organization

Source files are organized by the type category they primarily check:

| File | Category | Functions |
|---|---|---|
| `array.ts` | Array | `isArr`, `isArrIdx`, `inArr` |
| `number.ts` | Number | `isNum`, `isInt`, `isFin`, `inRange`, `inRangeInt`, `isIdx` |
| `string.ts` | String | `isStr`, `isStrLen`, `isStrIdx` |
| `object.ts` | Object | `isObj`, `isPOJO`, `isA`, `hasProp`, `hasOwnProp`, `hasPath`, `hasOwnPath`, `isSet`, `isMap`, `isRegExp`, `isDate`, `isErr` |
| `misc.ts` | Miscellaneous primitives | `isDef`, `isNullish`, `isBool`, `isFn`, `isSym`, `isBigInt` |
| `equality.ts` | Equality comparisons | `isEqualArr`, `isEqualSet`, `isEqualMap`, `isEqualRegExp`, `isEqualDate`, `isEqualErr`, `isEqualObj`, `isDeepEqual` |

# API design

- All functions take an `x: unknown` as the first parameter and are type guards. See `isArr()` for example. Exception: some functions use a generic parameter for better type narrowing (e.g. `isDef<T>(x: T | undefined): x is T`).
- The goal is to help TypeScript and various IDEs recognize the type of `x` once a check is passed.
- The return of the function should have an **explicit** return type annotation `x is ...` that most accurately represents the type of `x` if the function returns true. Never rely on inferred return types.
- No function should throw an error for values of `x`. If the type of `x` is not what the function expects, it should return `false`.
- Only throw an exception when it is likely a programming error. For example, if references are provided for a function (e.g. `min` and `max` for `inRange()` or `arr` in `isArrIdx`), throw appropriate error (`TypeError`, `RangeError`, ... and if nothing else fits, `Error`).
- The exception text should clearly mention:
    - What went wrong?
    - Where did the error happen?
    - What was the expectation?
    - What did we get instead and its type.

## Naming conventions

Function names follow these prefixes:

| Prefix | Meaning | Examples |
|---|---|---|
| `is` | Type-narrowing check returning `x is T` | `isStr`, `isNum`, `isArr`, `isObj` |
| `has` | Object property/path existence check | `hasProp`, `hasPath` |
| `in` | Containment or range check | `inRange`, `inArr` |
| `isEqual` | Shallow equality comparison against a reference | `isEqualArr`, `isEqualSet` |
| `hasOwn` | Same as `has` but for own properties only | `hasOwnProp`, `hasOwnPath` |

## Reference parameter contract

Some functions take a second parameter that acts as a **reference** (e.g. `ref` in `isEqual*`, `arr` in `isArrIdx`, `length` in `isIdx`):

- `x` is always the value being checked → invalid `x` returns `false`
- Other parameters are references/constraints → invalid reference **throws** (programming error)

## Error message format

All `throw` messages follow a consistent template:

```
functionName(): "paramName" must be description. Got ${value} (${typeof value})
```

Examples:
- `isArrIdx(): "arr" must be an array. Got ${arr} (${typeof arr})`
- `isIdx(): "length" must be an integer. Got ${length} (${typeof length})`

## `isEqual*` function pattern

All `isEqual*` functions follow this structure:

1. Validate `ref` — throw `TypeError` if invalid
2. Check referential equality (`x === ref`) — return `true` early
3. Type-check `x` — return `false` if wrong type
4. Compare values — perform the actual comparison

# Documentation

We use TypeDoc for documentation.
The documentation is published using Github Actions as Github Pages.
The documentation audience is JavaScript/TypeScript front-end or backend developers who may use this library from NPM or Github.

- Make sure that the documentation is accurately reflecting the implementation
- Make sure that the examples represent all important and interesting use cases.
- There should always be an `@example` section.
- Make sure that all the examples also appear in the tests
- Ensure that the cases where the function may throw are documented with `@throws`
- The documentation for each function should have a `@category NAME` tag to make it easier to find. The valid categories are: `Array`, `Number`, `String`, `Object`, `Undefined`, `Boolean`, `Function`, `Symbol`, `BigInt`
- Use `@see {@link ...}` tag to introduce relevant functions

# Testing

Every test file follows this structure:

```typescript
import { describe, it } from 'node:test'
import assert from 'node:assert'
import { functionName } from '../src/index.ts'

describe('functionName()', () => {
    it('returns true for ...', () => {
        assert.strictEqual(functionName(validInput), true)
    })

    it('returns false for ...', () => {
        assert.strictEqual(functionName(invalidInput), false)
    })

    // For functions that throw on invalid references:
    it('throws ErrorType for invalid reference', () => {
        // @ts-expect-error
        assert.throws(() => functionName(x, badRef), ErrorType)
    })
})
```

Key rules:
- Always import from `../src/index.ts` (not from individual module files)
- Use `assert.strictEqual` for all boolean checks
- Use `assert.throws` with the error constructor class for throw cases
- Use `@ts-expect-error` before lines that intentionally violate TypeScript types
- The `describe()` label must match `functionName()` exactly (including parentheses)

# Formatting

When generating code, respect [Prettier Configurations](./.prettierrc.json) which uses: single quotes, no semicolons, trailing commas, 4-space indentation, 120 char print width.

# Your suggestion

- Skip flattery and praising my question with sentences like "That's a very insightful question" or "What an excellent observation".
- Get to the point as quick as possible with as few words as possible.
- Be honest and challenge my assumptions. Be frank and to the point.
- Please don't modify the code directly unless explicitly instructed to.
- Teach the concepts and let the user figure out how to use them in the code as they see fit.
- Focus on principals, teaching, and learning instead of solving the immediate problem at hand.
- When referring to new concepts, make sure to include links to references like MDN (mozilla developer network), RFCs, or even StackOverflow.
- Don't make up stuff. Say "I don't know" if you are not sure.
- Most engineering questions depend on many factors and are the result of trade-offs. Please ask clarifying questions before answering my questions. If there are alternatives with cons and pros, mention them.

# Publishing

- The code published to npm registry using `npm publish`
- The published package should work with JavaScript using:
    - Bulk import: `import * as jty from 'jty'`
    - Specific function import: `import { isStr } from 'jty'`
- The TypeScript types should be accessible at the default location where the developer tooling expects to find them.

# Dependencies

- The library has **zero runtime dependencies**.
- DevDependencies: `typescript`, `tsx` (for running TS tests), `prettier`, `typedoc`, `@types/node`.
- Do not introduce any runtime dependencies.
