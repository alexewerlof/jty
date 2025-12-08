![JTY Logo](https://docs.google.com/drawings/d/e/2PACX-1vQIhQsuZNdChXABMD7m3Iq2GMc38tQ4ILQObLcrIBEkH5oZmV07lf9j1uxtNz6dN6wwZonAZMAGO3zn/pub?w=200)

[![GitHub license](https://img.shields.io/github/license/alexewerlof/jty)](https://github.com/alexewerlof/jty/blob/master/LICENSE.md)
[![npm version](https://img.shields.io/npm/v/jty.svg)](https://www.npmjs.com/package/jty)
[![GitHub stars](https://img.shields.io/github/stars/alexewerlof/jty)](https://github.com/alexewerlof/jty/stargazers)
[![Deploy documentation to GitHub Pages](https://github.com/alexewerlof/jty/actions/workflows/gh-pages.yml/badge.svg?branch=master)](https://github.com/alexewerlof/jty/actions/workflows/gh-pages.yml)
[![GitHub issues](https://img.shields.io/github/issues/alexewerlof/jty)](https://github.com/alexewerlof/jty/issues)
[![Vulnerabilities](https://snyk.io/test/github/alexewerlof/jty/badge.svg)](https://snyk.io/test/github/alexewerlof/jty)
[![Downloads](https://img.shields.io/npm/dm/jty.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jty&from=2020-01-01)

# jty - the tiny JavaScript type checker

A minimalistic, zero-dependency library for runtime type checking in JavaScript and TypeScript.
It helps you write safer, more reliable code by verifying types before usage and fail gracefully instead of crashing.

**Fail early with a good error rather than continue with the wrong assumption**

- No dependencies
- Minimalistic: complements what's available in JavaScript
- Comes with TypeScript support out of the box
- Unified, solid and predictable behavior for all functions:
    - All functions return `true` or `false`
    - Only `throw` for developer errors
    - Never mutates any parameter
    - Short expressive names to reduce boilerplate
    - Small code that's easy to understand and audit
- Thoroughly tested
- Works in Node.js, Deno, Bun, and modern browsers
- High performance

`jty` makes no assumption about how you handle anomalies. You throw an error or use it in conditional statements.

# API docs

https://alexewerlof.github.io/jty/

## Why?

- For **JavaScript**, `jty` helps verify function/method contracts and fail early with [good error messages](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) instead of continuing on wrong assumption and producing wrong results (which is hard to debug due to [implicit type conversion quirks](https://2ality.com/2013/04/quirk-implicit-conversion.html))
- For **TypeScript**, `jty` helps guarantee type safely when called from JavaScript code (also provides reliability against abusing TypeScript's escape hatches like `as` and `any`). _TypeScript may create a false sense of type safety, specially when interoperating with external systems that are not in TypeScript like APIs or other JavaScript code._
- For **REST APIs**, `jty` helps verify the shape of the API response before processing `*`
- For **JSON/YML**, `jty` helps verify the shape of the objects (like configs or `manifest.json`) programmatically with minimal ceremonies and code that's easy to read `*`

`*` Technically you can solve these problems with [JSON Schema validators](https://json-schema.org/implementations.html#validator-javascript), but:

- It requires learning a DSL instead of using play JavaScript
- The DSL is parsed at runtime (or compiled to generated JS code beforehand to avoid the performance penalty)
- Usually relies on externalized specifications as opposed to failing at the location where the data is used (see "Best Practices")

# How to use it?

```bash
$ npm i jty
```

```js
// In your JS file
import { isStr } from 'jty'

if (isStr('Hello world!', 3)) {
    console.log('Success')
} else {
    throw new TypeError('Expected an string with at least 3 characters')
}
```

If you use TypeScript, many of these functions work as [type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html):

```TypeScript
const a = { foo: 13 }

if (hasPath(a, 'bar', 'baz')) {
  // `a.foo` is valid, as well as `a.bar` and `a.bar.baz`
}
```

Let's say you have a function that is supposed to double a number:

```js
function double(n) {
    return n + n
}
double(1) // 2
double(13) // 26
```

But this function happily accepts strings which is not desired:

```js
double('13') // '1313'
```

Using `jty` we can verify the input before using it:

```js
import { isNum } from 'jty'

function double(n) {
    if (!isNum(n)) {
        throw new TypeError(`Expected a number but got ${n}`)
    }
    return n + n
}

double(13) // 26
double('13') // throws 'Expected a number but got 13'
double(NaN) // throws 'Expected a number but got NaN'
```

## More advanced case

Let's say you're using an API that returns an array (e.g. https://jsonplaceholder.typicode.com/posts).
You can verify that the API response is what you expect using a simple piece of code:

```js
import { isArr, hasProp, isInt, isStr, isStrLen } from './index'

function verifyResponseShape(responseJson: unknown) {
    if (!isArr(responseJson)) {
        throw new TypeError(`Expected the response to be an array. Got ${responseJson} (${typeof responseJson})`)
    }
    for (let i = 0; i < responseJson.length; i++) {
        const post = post[i]
        if (!hasProp(post, 'userId', 'id', 'title', 'body')) {
            throw new Error(`Post ${i} is missing a required property`)
        }
        // Now Typescript knows that your code has these properties
        if (!isInt(post.userId)) {
            throw new Error(`Post ${i} does not have a positive integer userId`)
        }
        if (!isInt(post.id) || post.id < 0) {
            throw new Error(`Post ${i} does not have a positive integer id`)
        }
        if (!isStr(post.title)) {
            throw new TypeError(`Post ${i} misses a title string`)
        }
        if (!isStrLen(post.body, 10, 200)) {
            throw new RangeError(`Post ${i} has an invalid body: ${post.body}`)
        }
    }
    return responseJson
}
```

# Best practices

[On the wiki](https://github.com/alexewerlof/jty/wiki/Best-Practices)

---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://www.alexewerlof.com)
