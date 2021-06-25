![JTY Logo](https://docs.google.com/drawings/d/e/2PACX-1vQIhQsuZNdChXABMD7m3Iq2GMc38tQ4ILQObLcrIBEkH5oZmV07lf9j1uxtNz6dN6wwZonAZMAGO3zn/pub?w=200)

[![Build Status](https://travis-ci.org/userpixel/jty.svg?branch=master)](https://travis-ci.org/userpixel/jty)
[![GitHub issues](https://img.shields.io/github/issues/userpixel/jty)](https://github.com/userpixel/jty/issues)
[![GitHub forks](https://img.shields.io/github/forks/userpixel/jty)](https://github.com/userpixel/jty/network)
[![GitHub stars](https://img.shields.io/github/stars/userpixel/jty)](https://github.com/userpixel/jty/stargazers)
[![GitHub license](https://img.shields.io/github/license/userpixel/jty)](https://github.com/userpixel/jty/blob/master/LICENSE.md)
[![Vulnerabilities](https://snyk.io/test/github/userpixel/jty/badge.svg)](https://snyk.io/test/github/userpixel/jty)
[![Downloads](https://img.shields.io/npm/dm/jty.svg?style=flat-square)](http://npm-stat.com/charts.html?package=jty&from=2020-01-01)

# jty - the tiny JavaScript type checker

A minimalistic library for writing safer code. It came out of a few years of programming JavaScript and TypeScript where I wrote these functions over and over to ensure code reliability.

**Fail early with a good error rather than continue with the wrong assumption**

* Minimalistic: complements what's available in JavaScript
* No dependencies
* Unified, solid and predictable behavior for all functions:
  - All functions return `true` or `false` (none of them `throw`s in any condition)
  - Never mutates any parameter
  - Never throws exceptions
  - Short expressive names to minify better
  - Has short code that's easy to understand and audit
* Resistent to monkey patching or malicious [prototype pollution](https://medium.com/node-modules/what-is-prototype-pollution-and-why-is-it-such-a-big-deal-2dd8d89a93c)
* Comes with TypeScript support out of the box
* Thoroughly tested for edge cases
* Works in Node and Browsers (CommonJS out of the box)
* High performance

`jty` makes no assumption about how you handle anomalies. You throw an error or use it in conditional statements. This is the bare minimum for type detection, not an assertion library.

👉 [**See API docs**](https://userpixel.github.io/jty/)

## Why?

* For **JavaScript**, `jty` helps verify function/method contracts and fail early with [good error messages](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) instead of continuing on wrong assumption and producing wrong results (which is hard to debug due to [implicit type conversion quirks](https://2ality.com/2013/04/quirk-implicit-conversion.html))
* For **TypeScript**, `jty` helps guarantee type safely when called from JavaScript code (also provides reliability against abusing TypeScript's escape hatches like `as` and `any`). _TypeScript may create a false sense of type safety, specially when interoperating with external systems that are not in TypeScript like APIs or other JavaScript code._
* For **REST APIs**, `jty` helps verify the shape of the API response at response reception `§`
* For **JSON/YML**, `jty` helps verify the shape of the objects (like configs or `manifest.json`) inside the code `§`

`§` Technically you can solve these problems with [JSON Schema validators](https://json-schema.org/implementations.html#validator-javascript), but:

* It requires learning a DSL instead of using play JavaScript
* The DSL is parsed at runtime (or compiled to generated JS code beforehand to avoid the performance penalty)
* Usually relies on externalized specifications as opposed to failing at the location where the data is used (see "Best Practices")

# How to use it?

```bash
$ npm i jty
```

```js
// In your JS file
const { isStr } = require('jty')

if (isStr('Hello world!', 3)) {
    console.log('Success')
} else {
    throw new TypeError('Expected an string with at least 3 characters')
}
```

If you use TypeScript, many of these functions work as [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards):

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
double(1)  // 2
double(13) // 26
```

But this function happily accepts strings which is not desired:

```js
double('13') // '1313'
```

Using `jty` we can verify the input before using it:

```js
const { isNum } = require('jty')

function double(n) {
    if (isNum(n)) {
        return n + n
    }
    throw new TypeError(`Expected a number but got ${n}`)
}

double(13)   // 26
double('13') // throws 'Expected a number but got 13'
double(NaN)  // throws 'Expected a number but got NaN'
```

You can also use the assertion library of your choice to make the code shorter and more readable:

```js
// Node assert: https://nodejs.org/api/assert.html
const assert = require('assert')
const { isNum } = require('jty')

function double(n) {
    assert(isNum(n), 'double() number input')
    return n + n
}
```

# API

[On Github Pages](https://userpixel.github.io/jty/)

# Best practices

[On the wiki](https://github.com/userpixel/jty/wiki/Best-Practices)


---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://twitter.com/alexewerlof)
