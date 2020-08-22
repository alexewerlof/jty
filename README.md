# JTY - Javascript typecheck

A minimalistic library for writing safer code. It came out of a few years of programming JavaScript and TypeScript where I wrote these functions over and over to ensure reliable code.

* Allows JavaScript code to verify its contracts and fail early with [good error messages](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) instead of continuing on wrong assumption and producing wrong results (which is hard to debug due to [implicit type conversion quirks](https://2ality.com/2013/04/quirk-implicit-conversion.html))
* Allows TypeScript code to be used safely when called from JavaScript code (also provides reliability against abusing TypeScript's escape hatches like `as` and `any`)

It has a solid and minimalistic API surface that provides useful functions for basic type checking.

* All functions return `true` or `false` (no one `throw`s in any condition)
* It is resistent to monkey patching or malicious prototype overriding
* It comes with TypeScript support out of the box.
* Thoroughly tested for edge cases
* Works in Node and Browsers (CommonJS out of the box)

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

If you use TypeScript many of these functions work as guards:

```typescript
const a = { foo: 13 }
if (hasPath(a, 'bar', 'baz')) {
  // a.foo is valid, as well as a.bar and a.baz
}
```

### Tips

* Every value should be validated close to where it is used.
* This usually means that the functions should validate the parameters that the logic in their own body depends on.
* If a function merely forwards a parameter to an inner function where it's used, it's best for the inner function to validates it.
* A [good error message](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) should have enough information to facilitate inspection and troubleshooting.
* When throwing an error, use an appropriate JavaScript standard `Error` subclass:
  - `TypeError` when a value has an unexpected type
  - `ReferenceError` when a property is missing from an object
  - `RangeError` when a value is outside the expected range
  - `SyntaxError` when there is a syntax error (usually comes handy when parsing a string, using regular expressions or validating JSON)
  - [See more Error types on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

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
    assert(isNum(n))
    return n + n
}
```

# API

[On Github Pages](https://userpixel.github.io/jty/)

---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://twitter.com/alexewerlof)
