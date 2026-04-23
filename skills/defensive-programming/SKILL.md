---
name: defensive-programming
description: Defensive programming guidelines for TypeScript/JavaScript projects using jty for runtime type validation. Use this skill when you want to ensure your code is robust and fails gracefully with meaningful errors when it encounters unexpected input or conditions.
license: MIT
---

# Defensive Programming with jty

These guidelines apply to any TypeScript/JavaScript project that depends on `jty` for runtime type checking.

## Core Principles

### 1. Never Trust External Boundaries

Never assume the type of variables or shape of objects coming from outside your code base: user input, dependencies, databases, AI-generated content, external APIs, parsed JSON/YAML, query parameters, etc.
Just because there's a typescript `interface` or `type` declaration doesn't mean that those external systems respect that.

So assume the type is `unknown` and **always** verify using `jty` before accessing properties or performing operations.

```typescript
import { isPOJO, isStr, isNum, hasProp } from 'jty'

function processAPIResponse(data: unknown) {
    if (!isPOJO(data)) {
        throw new TypeError(`Expected a plain object. Got ${data} (${typeof data})`)
    }
    if (!hasProp(data, 'name', 'age')) {
        throw new ReferenceError('Response is missing required properties "name" and/or "age"')
    }
    if (!isStr(data.name)) {
        throw new TypeError(`"name" must be a string. Got ${data.name} (${typeof data.name})`)
    }
    if (!isNum(data.age)) {
        throw new TypeError(`"age" must be a number. Got ${data.age} (${typeof data.age})`)
    }
    // Safe to use data.name and data.age here
}
```

If the validation code is repeated, create a guard:

```typescript
import { isPOJO, isStr, isNum, hasProp } from 'jty'

interface APIResponse {
    name: string
    age: number
}

function isValidAPIResponse(data: unknown): data is APIResponse {
    return isPOJO(data) && hasProp(data, 'name', 'age') && isStr(data.name) && isNum(data.age)
}

function processAPIResponse(data: unknown) {
    if (!isValidAPIResponse(data)) {
        throw new TypeError(`Unexpected API response: ${JSON.stringify(data)}`)
    }
    // Safe to use data.name and data.age here
}
```

Use the provided guards to narrow down a type to expected ranges.

For example:

```typescript
import { isStr, isStrLen } from 'jty'

const id: unknown = 'sk_0123456789'

// Returns true as long as id is a string
isStr(id)
// Checks that id is a string between 10-64 character long (inclusive)
isStrLen(id, 10, 64)
```

The validation is not limited to TypeScript types. In combination with JavaScript functions, we can narrow down the expectations.

For example:

```typescript
import { isStrLen } from 'jty'

const id: unknown = 'sk-abc123'

// Checks that id is less than 256 characters, starts with a specific prefix, and contains only alphanumeric characters and hyphens
isStrLen(id, undefined, 256) && id.startsWith('sk-') && /^[A-Za-z0-9-]+$/.test(id)
```

### 2. Verify Close to Usage

Validate parameters inside the function that actually depends on them, not in a distant caller. This produces clearer stack traces and keeps type requirements co-located with the logic that needs them.

```typescript
import { isArr } from 'jty'

// BAD: caller validates, callee assumes
function caller(items: unknown) {
    if (!isArr(items)) throw new TypeError('...')
    process(items) // process() blindly trusts the caller
}

// GOOD: callee validates what it needs
function process(items: unknown) {
    if (!isArr(items)) {
        throw new TypeError(`process(): "items" must be an array. Got ${items} (${typeof items})`)
    }
    // ...
}
```

There are exceptions for performance reasons. For example, if a function is called in a tight loop and the caller already validates the input, it may be acceptable to skip validation in the callee. But this should be the exception, not the norm, and should be clearly documented.

```typescript
import { isArr } from 'jty'
// Acceptable if process() is called in a tight loop and caller already validates
function caller(items: unknown, options: { id: string }) {
    if (!isArr(items)) throw new TypeError('...')
    if (!isPOJO(options) || !hasProp(options, 'id')) throw new TypeError('...')
    for (let i = 0; i < items.length; i++) {
        process(items[i], options) // process() trusts the caller for performance reasons
    }
}
function process(item: unknown, options: { id: string }) {
    if (!isNum(item)) {
        throw new TypeError(`process(): "item" must be a number. Got ${item} (${typeof item})`)
    }
    // don't validate options
}
```

#### 2.1 Verify when setting state

The only exception to "Verify Close to Usage" is when setting state (e.g. class properties). In those cases, validate the input at the point of setting the state to ensure that the internal state of the system is always valid.

```typescript
import { isStr } from 'jty'

class User {
    private _name: string
    private readonly _age: number

    constructor(name: unknown, age: unknown) {
        this.name = name
        if (!inRangeInt(age, 0, 150)) {
            throw new TypeError(
                `User.constructor(): "age" must be a number between 0 and 150. Got ${age} (${typeof age})`,
            )
        }
        this._age = age
    }

    set name(name: unknown) {
        if (!isStr(name)) {
            throw new TypeError(`User.name(): "name" must be a string. Got ${name} (${typeof name})`)
        }
        this._name = name
    }

    get name() {
        return this._name
    }
}
```

### 3. Don't Double-Verify

If a value is merely passed through to another function, let that function handle validation. Avoid redundant checks in pass-through layers — they hurt performance and create maintenance burden.

```typescript
import { isStr } from 'jty'

// BAD: both layers check the same thing
function outerFnBad(name: unknown) {
    if (!isStr(name)) throw new TypeError('...')
    innerFnBad(name)
}
function innerFnBad(name: unknown) {
    if (!isStr(name)) throw new TypeError('...')
    // ...
}

// GOOD: only innerFn validates since it uses the value
function outerFn(name: unknown) {
    innerFn(name)
}
function innerFn(name: unknown) {
    if (!isStr(name)) {
        throw new TypeError(`innerFn(): "name" must be a string. Got ${name} (${typeof name})`)
    }
    // ...
}
```

### 4. Use Standard Error Classes

Throw the appropriate standard JavaScript error subclass because they add extra context about what type of expectation we had and what type of fix applies (e.g. guide the developer or AI agent to diagnose why the received type or reference was wrong):

| Error Class      | When to Use                                                        | jty Example                      |
| ---------------- | ------------------------------------------------------------------ | -------------------------------- |
| `TypeError`      | Value has an unexpected type                                       | `!isStr(x)`, `!isObj(x)`         |
| `ReferenceError` | Required property is missing                                       | `!hasProp(obj, 'key')`           |
| `RangeError`     | Value falls outside expected boundary                              | `!inRange(x, 0, 10)`, `!isIdx()` |
| `SyntaxError`    | Malformed structure or failure when validating parsed strings/JSON |                                  |

### 5. Emit Meaningful Errors

A good error message should answer these questions:

1. **What failed?** - Which variable, property, or operation was the issue?
2. **What was expected?** - What type, shape, or value range did we expect?
3. **What was actually received?** - What value did we get instead, and what type is it?
4. **Optional: How to fix it?** - Ideally, it should highlight common pitfalls and offer a suggestion for how to fix the issue as well.

```typescript
// BAD: it misses context
throw new TypeError('Invalid input')

// GOOD: it says where the error happened, what was expected and what was received
throw new TypeError(
    `processId(): "id" must be a string. Got ${id} (${typeof id}).\nDid you forget to encode it from a URL parameter or parse it from JSON?`,
)
```

### 6. Use Error Chaining with `cause`

Exceptions traverse function boundaries, making it hard to understand why an operation failed when the error originates from a deeply nested call. Use `cause` to add context at intermediate layers:

```typescript
import { isStr } from 'jty'

async function fetchUserProfile(userId: unknown) {
    if (!isStr(userId)) {
        throw new TypeError(`fetchUserProfile(): "userId" must be a string. Got ${userId} (${typeof userId})`)
    }
    try {
        const response = await fetch(`/api/users/${encodeURIComponent(userId)}`)
        return await response.json()
    } catch (err) {
        throw new Error(`Failed to fetch profile for user "${userId}"`, { cause: err })
    }
}
```

### 7. Protect Against Missing TypeScript Guarantees

Although code is written in TypeScript, it may be called from JavaScript where type checking is absent. Also, when working with Small Language Models (SLMs) for code generation, we cannot be sure they follow all type constraints. Always verify and fail with meaningful error messages.

```typescript
import { isInstance } from 'jty'

// Even though TypeScript says `date` is a Date, verify at runtime
// because a JavaScript caller could pass anything
export function formatDate(date: Date): string {
    if (!isInstance(date, Date)) {
        throw new TypeError(`formatDate(): "date" must be a Date. Got ${date} (${typeof date})`)
    }
    return date.toISOString()
}
```

### 8. Use pure stateless functions whenever possible

Pure functions do not rely on or modify external state, making them easier to test, debug, and reason about. They also work better with AI agents since they don't have side effects that can lead to unexpected behaviors.

```typescript
// BAD: relies on external state
let config = { maxItems: 10 }
function isValidItemCount(count: unknown) {
    if (!isNum(count)) {
        throw new TypeError(`"count" must be a number. Got ${count} (${typeof count})`)
    }
    return count >= 0 && count <= config.maxItems
}

// GOOD: pure function with explicit parameters
function isValidItemCount(count: unknown, maxItems: number) {
    if (!isNum(count)) {
        throw new TypeError(`"count" must be a number. Got ${count} (${typeof count})`)
    }
    if (!isNum(maxItems)) {
        throw new TypeError(`"maxItems" must be a number. Got ${maxItems} (${typeof maxItems})`)
    }
    return count >= 0 && count <= maxItems
}
```

### 8.1 Use classes when the state is consistent and persistent

If a state doesn't change that often, use a class instead of expecting it in every invocation:

```typescript
import { isStr } from 'jty'

// GOOD: class encapsulates the state and related behavior
class ItemValidator {
    private readonly maxItems: number
    constructor(maxItems: unknown) {
        if (!isNum(maxItems)) {
            throw new TypeError(`"maxItems" must be a number. Got ${maxItems} (${typeof maxItems})`)
        }
        this.maxItems = maxItems
    }
    isValidItemCount(count: unknown) {
        if (!isNum(count)) {
            throw new TypeError(`"count" must be a number. Got ${count} (${typeof count})`)
        }
        return count >= 0 && count <= this.maxItems
    }
}
```

### 9. Avoid inheritance and prefer composition

Inheritance can lead to tight coupling and fragile code. Prefer composition of functions and objects to achieve the desired behavior without creating complex class hierarchies.

Composition allows for more testable, flexible, and reusable code, as you can mix and match behaviors without being constrained by an inheritance structure.

A system composed of smaller parts is easier to verify.

### 10. Test depth first

A system is composed of smaller components. A code base is composed of smaller code constructs (functions, modules, directories, etc.).

Always:

1. Start by unit testing each component first to fail early at a granular level and fix issues in isolation in smaller context.
2. Continue by integration testing the system composed of those components
3. Finish off by smoke testing the most critical or common use cases for the system
4. As a bonus you can continuously run the smoke tests against the production deploy to identify any service degradation or disruption.

### 10. Don't fight the library, framework or platform

It is tempting to create workarounds when the library, framework or platform doesn't provide a way to address edge cases. But often those workarounds are more complex and less efficient than just rethinking your solution or switching the library or framework to something more fit to purpose, if possible.

### 11. Prioritize the right trade-offs

Engineering is the art of trade-offs. There are many big or small decisions against a list of alternatives.

In general follow these priorities:

1. Security
2. Reliability (including scalability, correctness, and predictability)
3. Usability (Accessibility & UX)
4. Maintainability (including readability, debuggability, and ease of onboarding new developers or AI agents)
5. Brevity (code length)
6. Affordability (cost of running the code)
7. Performance

The way to use this list is to ask yourself: "Does this make the code more performant at the cost of making it less secure?"
You should be able to confidently defend you choices by stating: "This change makes the code shorter but it hurts performance and that's OK".

The priorities are different based on product (e.g. a game may prioritize performance over maintainability and use complex code). The priority can even vary in the same code base (e.g. a piece of code that runs in a sandbox may prioritize maintainability over security).

When unsure, ask the human for help because in all likelihood, they haven't put all the requirements in the words, and not everything they have put in words is available in the context. Err on the side of asking approval instead of going YOLO and guess.
