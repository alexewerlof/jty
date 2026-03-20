---
name: defensive-programming-with-jty
description: Defensive programming guidelines for TypeScript/JavaScript projects using jty for runtime type validation
---

# Defensive Programming with jty

These guidelines apply to any TypeScript/JavaScript project that depends on `jty` for runtime type checking.

## Core Principles

### 1. Never Trust External Boundaries

Never assume the type of variables or shape of objects coming from outside your code base: user input, dependencies, databases, AI-generated content, APIs, parsed JSON/YAML, query parameters, etc.

Set the type to `unknown` and **always** verify using `jty` before accessing properties or performing operations.

```typescript
import { isPOJO, isStr, isNum, hasProp } from 'jty'

function processApiResponse(data: unknown) {
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

### 2. Verify Close to Usage

Validate parameters inside the function that actually depends on them, not in a distant caller. This produces clearer stack traces and keeps type requirements co-located with the logic that needs them.

```typescript
import { isStr, isArr } from 'jty'

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

### 3. Don't Double-Verify

If a value is merely passed through to another function, let that function handle validation. Avoid redundant checks in pass-through layers — they hurt performance and create maintenance burden.

```typescript
import { isStr } from 'jty'

// BAD: both layers check the same thing
function outerFn(name: unknown) {
    if (!isStr(name)) throw new TypeError('...')
    innerFn(name)
}
function innerFn(name: unknown) {
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

Throw the appropriate standard JavaScript error subclass:

| Error Class      | When to Use                                                        | jty Example                      |
| ---------------- | ------------------------------------------------------------------ | -------------------------------- |
| `TypeError`      | Value has an unexpected type                                       | `!isStr(x)`, `!isObj(x)`         |
| `ReferenceError` | Required property is missing                                       | `!hasProp(obj, 'key')`           |
| `RangeError`     | Value falls outside expected boundary                              | `!inRange(x, 0, 10)`, `!isIdx()` |
| `SyntaxError`    | Malformed structure or failure when validating parsed strings/JSON |                                  |

### 5. Emit Meaningful Errors

Always include enough context to troubleshoot without debugging. State **what failed**, **what was expected**, and **what was actually received** (with its type when relevant).

```typescript
// BAD
throw new TypeError('Invalid input')

// GOOD
throw new TypeError(`processUser(): "email" must be a string. Got ${email} (${typeof email})`)
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
import { isInstance, isStr, isNum } from 'jty'

// Even though TypeScript says `date` is a Date, verify at runtime
// because a JavaScript caller could pass anything
export function formatDate(date: Date): string {
    if (!isInstance(date, Date)) {
        throw new TypeError(`formatDate(): "date" must be a Date. Got ${date} (${typeof date})`)
    }
    return date.toISOString()
}
```
