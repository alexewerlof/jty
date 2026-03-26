![JTY Logo](https://docs.google.com/drawings/d/e/2PACX-1vQIhQsuZNdChXABMD7m3Iq2GMc38tQ4ILQObLcrIBEkH5oZmV07lf9j1uxtNz6dN6wwZonAZMAGO3zn/pub?w=200)

[![GitHub license](https://img.shields.io/github/license/alexewerlof/jty)](https://github.com/alexewerlof/jty/blob/master/LICENSE.md)
[![npm version](https://img.shields.io/npm/v/jty.svg)](https://www.npmjs.com/package/jty)
[![GitHub stars](https://img.shields.io/github/stars/alexewerlof/jty)](https://github.com/alexewerlof/jty/stargazers)
[![Documentation](https://github.com/alexewerlof/jty/actions/workflows/gh-pages.yml/badge.svg?branch=master)](https://github.com/alexewerlof/jty/actions/workflows/gh-pages.yml)
[![GitHub issues](https://img.shields.io/github/issues/alexewerlof/jty)](https://github.com/alexewerlof/jty/issues)
[![Vulnerabilities](https://snyk.io/test/github/alexewerlof/jty/badge.svg)](https://snyk.io/test/github/alexewerlof/jty)
[![Downloads](https://img.shields.io/npm/dm/jty.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jty&from=2020-01-01)

# jty - Just a Tiny Runtime Type Checker

A minimalistic, ergonomic, AI friendly, zero-dependency library for runtime type checking and defensive programming in JavaScript and TypeScript.

It helps you write safer, more reliable code by verifying types before usage and failing gracefully instead of bringing your application down with cryptic errors. **Fail early with a good error rather than continue with the wrong assumption.**

## 🤔 Why `jty`? Didn't TypeScript Solve This?

JavaScript is a highly dynamic language with famous quirks around implicit type conversions. TypeScript helps a lot **at compile-time**. However, compile time type safety creates an illusion that hurts runtime type safety:

- An API responds with an unexpected structure or values.
- You are interoperating with untyped 3rd-party JavaScript libraries.
- Parsed JSON/YAML have drifted from the code that depends on them.
- A user or AI agent submits a form with invalid input.
- You are dealing with Typescript code that uses various escape hatches (`any`, `unknown`, or casting `as SomeType`).

If you don't validate the data at those boundaries, your application is vulnerable to cascading failures and extremely hard-to-debug behaviors.

**This is where `jty` comes in.** `jty` enables [**Defensive Programming**](./defensive-programming.md), empowering you to validate shapes and types _at runtime_, failing early right at the boundary and generating context-rich exceptions that facilitates AI-driven debugging and maintanance.

### How about `zod`, `chai`, etc?

- [zod](https://zod.dev/): a larger library with its own DSL. JTY is tiny and uses plain pure functions that serve as typescript guards. When you detect an edge case, JTY give you the control to decide what error message to throw or how to gracefully degrade.
- [chai](https://www.chaijs.com/): is a rich BDD/TDD library with assertions that throw pre-defined error messages. JTY give you the control to validate data and throw the appropriate exception with expressive contextful error messages.
- [expect](https://jestjs.io/docs/expect) is part of the Jest test library. JTY doesn't eliminate the need for solid tests. JTY is meant to be inside your runtime code while Jest is meant to verify the behavior before shipping the code.
- [should.js](https://shouldjs.github.io/) is another elaborate DSL. JTY aims to be as small as possible and doesn't make any effort to be a QA framework or comply to BDD/TDD.
- [node:assert](https://nodejs.org/api/assert.html) is a great built-in feature of node. If your code only targets Node, you should skip JTY and try to stick to what's provided by the platform. But if you're targetting other runtimes, JTY can bring a set of minimalistic type guards to your code.

## 🚀 Quick Start

```bash
npm install jty
```

**Bonus**: install the skills:

```bash
npx skills add alexewerlof/jty  --skill jty
npx skills add alexewerlof/jty  --skill defensive-programming
```

### Basic Usage

Use `jty` to easily validate variables and surface descriptive errors.

```js
import { isStr } from 'jty'

function greet(name) {
    if (!isStr(name)) {
        throw new TypeError(`Expected "name" to be a string. Got ${name} (${typeof name})`)
    }
    console.log(`Hello, ${name}!`)
}

greet('Alice') // Hello, Alice!
greet(13) // TypeError: Expected "name" to be a string. Got 13 (number)
```

### Advanced Schema Validation with Type Guarding

Let's validate a complex API response payload. `jty` gracefully scopes properties so the TypeScript compiler can perfectly infer them.

```typescript
import { isArr, hasProp, isInt, isStr, isStrLen } from 'jty'

function verifyResponseShape(responseJson: unknown) {
    if (!isArr(responseJson)) {
        throw new TypeError(`Expected an array. Got ${responseJson} (${typeof responseJson})`)
    }

    for (let i = 0; i < responseJson.length; i++) {
        const post = responseJson[i]

        // Ensure the base properties exist!
        if (!hasProp(post, 'userId', 'id', 'title', 'body')) {
            throw new Error(`Post ${i} is missing required properties`)
        }

        // Type Guards active! TS now knows post has 'userId', 'id', 'title', and 'body'

        if (!isInt(post.userId) || post.userId < 0) {
            throw new TypeError(`Post ${i} does not have a positive integer userId`)
        }
        if (!isInt(post.id) || post.id < 0) {
            throw new TypeError(`Post ${i} does not have a positive integer id`)
        }
        if (!isStr(post.title)) {
            throw new TypeError(`Post ${i} is missing a valid title string`)
        }
        if (!isStrLen(post.body, 10, 200)) {
            throw new RangeError(`Post ${i} has an invalid body length. Got: ${post.body}`)
        }
    }

    // Everything is verified.
    return responseJson
}
```

## 📖 API Documentation

Explore all available methods and exhaustive examples on our interactive documentation.

[Read the API Docs](https://alexewerlof.github.io/jty/)

## ✨ Developer Ergonomics & Features

`jty` was designed to be a joy to write and read, focusing heavily on developer experience and AI Agent effectiveness. Written in the latest TypeScript, it provides:

- 🛡️ **TypeScript Type Guards:** Functions act as type guards. Once `jty` verifies a type, your IDE language server instantly recognizes the narrowed type structure. No more `any`!
- 🗣️ **Expressive Error Messages:** When a validation fails, `jty` empowers you to throw highly expressive exceptions explicitly logging what went wrong, what was expected, and exactly what was received. This also helps AI agents identify exactly what went wrong, what was expected and what was received, accelerating debugging and reducing token usage.
- 🧪 **Thoroughly Tested:** Fully tested against all the infamous JavaScript edge cases (like `NaN`, `null` vs `undefined`, object prototypes, inheritance, arrays, etc.).
- 📦 **Batteries Included:** Comes with TypeScript types out of the box, eliminating the need to install and update a separate `@types/...` package to work with `jty` in TypeScript repos. Zero external runtime dependencies. The accompanying SKILLs helps your AI agent efficiently use this tiny library according to [defensive programming best practices](./defensive-programming.md).
- 🔌 **Universal Compatibility:** Works seamlessly with both **ESM** (`import`), **CommonJS** (`require()`) and globals while natively supporting Node.js, Deno, Bun, and modern browsers.

## 🤖 An AI-First Library

`jty` is built with modern AI-driven development in mind.
It is an AI-first library where an embedded `SKILL.md` file is shipped alongside the codebase. This allows LLM-powered coding assistants to learn exactly how to use this library efficiently.

Plus the function names and accompanying Typedocs gives an expressive token-language to LLM and makes it easy for AI agents to discover how to use it.

**How to use the AI SKILL:**

- **From `node_modules`:** Once installed locally, your agent can read `node_modules/jty/skill/*/SKILL.md` directly to understand the API standards, function signatures, and best practices. You can also drag that file manually to any chat that requires it.
- **Using Skills.sh:** You can reference this skill in external AI tools and workflows using platforms like [skills.sh](https://skills.sh/) to seamlessly inject context into your favorite agentic tools with zero manual setup: `npx skills add alexewerlof/jty`.
- **Using a pointer file**: Put a basic `.agent/skills/jty/SKILL.md` which references `node_modules/jty/SKILL.md`.

```yaml
---
name: jty
description: 'Defensive programming patterns to ensure runtime type safety using the jty library'
---
Look up [jty SKILL.md](node_modules/jty/skills/jty/SKILL.md)
```

---

## 🎓 Best Practices

Discover patterns for resilient JavaScript and TypeScript structures on [our Wiki](https://github.com/alexewerlof/jty/wiki/Best-Practices).

---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://www.alexewerlof.com)
