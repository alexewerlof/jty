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

JavaScript is a highly dynamic language with famous quirks around implicit type conversions. TypeScript helps a lot **at compile-time**. In fact the illusion of type-safety can create more fragile code when interacting with APIs or external JS code at **runtime**:

- An API responds with an unexpected payload structure or values.
- A user ot AI agent submits a form with invalid input.
- Parsed JSON/YAML have drifted from the code that depends on them.
- You are interoperating with untyped 3rd-party JavaScript libraries.
- You are dealing with Typescript code that uses various escape hatches (`any`, `unknown`, or casting `as SomeType`).

If you don't validate your data at the boundaries, your application is vulnerable to cascading failures and extremely hard-to-debug behaviors.

**This is where `jty` comes in.** `jty` enables **Defensive Programming**, empowering you to validate shapes and types _at runtime_, failing early right at the boundary.

## ✨ Developer Ergonomics & Features

`jty` was designed to be a joy to write and read, focusing heavily on developer experience and AI Agent effectiveness. Written in the latest TypeScript, it provides:

- 🛡️ **TypeScript Type Guards:** Functions act as type guards. Once `jty` verifies a type, your IDE language server instantly recognizes the narrowed type structure. No more `any`!
- 🗣️ **Expressive Error Messages:** When a validation fails, `jty` empowers you to throw highly expressive exceptions explicitly logging what went wrong, what was expected, and exactly what was received. This also helps AI agents identify exactly what went wrong, what was expected and what was received, accelerating debugging and reducing token usage.
- 🧪 **Thoroughly Tested:** Fully tested against all the infamous JavaScript edge cases (like `NaN`, `null` vs `undefined`, object prototypes, inheritance, arrays, etc.).
- 📦 **Batteries Included:** Comes with TypeScript types out of the box, eliminating the need to install and update a separate `@types/...` package to work with `jty` in TypeScript repos. Zero external runtime dependencies.
- 🔌 **Universal Compatibility:** Works seamlessly with both **ESM** (`import`) and **CommonJS** (`require()`), natively supporting Node.js, Deno, Bun, and modern browsers.

## 🤖 An AI-First Library

`jty` is built with modern AI-driven development in mind.
It is an AI-first library where an embedded `SKILL.md` file is shipped alongside the codebase. This allows LLM-powered coding assistants to learn exactly how to use this library efficiently.

Plus the function names and accompanying Typedocs gives an expressive token-language to LLM and makes it easy for AI agents to discover how to use it.

**How to use our AI Skill:**

- **From `node_modules`:** Once installed locally, your agent can read `node_modules/jty/SKILL.md` directly to understand the API standards, function signatures, and best practices.
- **Using Skills.sh:** You can reference this skill in external AI tools and workflows using platforms like [skills.sh](https://skills.sh/) to seamlessly inject context into your favorite agentic tools with zero manual setup.
- **Using a pointer file**: Put a basic `.agent/skills/jty/SKILL.md` which references `node_modules/jty/SKILL.md`.

```yaml
---
name: jty
description: 'Defensive programming patterns to ensure runtime type safety using the jty library'
---
Look up [jty SKILL.md](node_modules/jty/SKILL.md)
```

---

## 🚀 Quick Start

```bash
npm install jty
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

## 🎓 Best Practices

Discover patterns for resilient JavaScript and TypeScript structures on [our Wiki](https://github.com/alexewerlof/jty/wiki/Best-Practices).

---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://www.alexewerlof.com)
