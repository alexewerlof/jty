# JTY - JavaScript typecheck

A minimalistic library for writing safer code. It came out of a few years of programming JavaScript and TypeScript where I wrote these functions over and over to ensure reliable code.

* Helps JavaScript code to verify its contracts and fail early with [good error messages](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) instead of continuing on wrong assumption and producing wrong results (which is hard to debug due to [implicit type conversion quirks](https://2ality.com/2013/04/quirk-implicit-conversion.html))
* Helps TypeScript code to be used safely when called from JavaScript code (also provides reliability against abusing TypeScript's escape hatches like `as` and `any`)

It has a solid and minimalistic API surface that provides useful functions for basic type checking.

* No dependencies
* Complements what's available in JavaScript
* All functions return `true` or `false` (none of them `throw`s in any condition)
* It is resistent to monkey patching or malicious prototype overriding
* It comes with TypeScript support out of the box.
* Thoroughly tested for edge cases
* Works in Node and Browsers (CommonJS out of the box)
* High performance

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

If you use TypeScript, many of these functions work as guards:

```TypeScript
const a = { foo: 13 }
if (hasPath(a, 'bar', 'baz')) {
  // `a.foo` is valid, as well as `a.bar` and `a.baz`
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
    assert(isNum(n))
    return n + n
}
```

# API

[On Github Pages](https://userpixel.github.io/jty/)

# Tips

* Every value should be validated **close to where it is used**. This usually means that the functions should validate the parameters that the logic in their own body depends on.
* **ALWAYS** validate the shape and values of any input from external systems (users, other servers, even local JSON files that are not validated against a schema and/or don't live in the same repo as your code)
* If you're using TypeScript, use [type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) to programmatically ensure the shape of a value (particularly objects)
* If you are writing TypeScript code that is going to be called from JavaScript, always verify the input of the user-facing APIs
* Use JavaScript's own language constructs whenever it makes sense
  - `['possibleValue1', 'possibleValue2'].includes(x)` to check if `x` is any of the possible values (kinda like TypeScript's [union types](https://www.typescriptlang.org/docs/handbook/advanced-types.html))
  - [`someArray.every(item => checkItemFormat(item))`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) to check that all elements of an array have a certain shape
  - `isStr(x) || isInt(x)` check OR to ensure that a value is of either types
  - [`a instanceOf A`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) ensure that `a` is an instance of the class `A`
  - Use the [`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) operator with caution: `user in objectWithOneKeyPerUser` returns `true` if the `user` is `'constructor'` (use `hasOProp()` instead)
  - Use `console.assert()` 
* Don't check the shape of objects that are guaranteed to have a certain form. For example in `function f(...props) { if (Array.isArr(props)) ... }`, `props` is guaranteed to be an array per JavaScript language specification.
* If a function merely forwards a parameter to an inner function where it's used, it's best for the inner function to validates it.
* A [good error message](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) should have enough information to facilitate inspection and troubleshooting.
* When throwing an error, use an appropriate JavaScript standard `Error` subclass:
  - `TypeError` when a value has an unexpected type
  - `ReferenceError` when a property is missing from an object
  - `RangeError` when a value is outside the expected range
  - `SyntaxError` when there is a syntax error (usually comes handy when parsing a string, using regular expressions or validating JSON)
  - [See more Error types on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://twitter.com/alexewerlof)
