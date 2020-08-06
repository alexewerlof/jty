# JTY - Javascript typecheck

A minimalistic library for writing safer code. It came out of a few years of programming JavaScript and TypeScript where I wrote these functions over and over to ensure reliable code.

* Allows JavaScript code to verify its contracts and fail early with [good error messages](https://medium.com/hackernoon/what-makes-a-good-error-710d02682a68) instead of continuing on wrong assumption and producing wrong results (which is hard to debug due to [implicit type conversion quirks](https://2ality.com/2013/04/quirk-implicit-conversion.html))
* Allows TypeScript code to be used safely when called from JavaScript code (also provides reliability against abusing TypeScript's escape hatches like `as` and `any`)

It has a solid and minimalistic API surface that provides useful functions for basic type checking.

* All functions return `true` or `false` (no one `throw`s)
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

Every value should be validated close to where it is used.
This usually means at the start of the functions.

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

## `isObj(x)`

Returns true if `x` is a non-null object.

```js
isObj({})      // true
isObj(null)    // flase
isObj([])      // true
isObj(new URL) // true
```

## `isFn(x)`

Returns true if `x` is a function (including class methods, arrow functions, result of `new Function()`, etc.).

## `isNum(x, min?, max?)`

Returns true if `x` is a finite number.
* If `min` is a number, it'll also check that `x >= min`
* If `max` is a number, it'll also check that `x <= max` (note that it is an inclusive range)

```js
isNum(3)  // true
isNum(3, 3) // true
isNum(3, 10)  // false
isNum(3, 3, 5)  // true
isNum(3, 10, 15)  // false
isNum(3, undefined, 5) // true
isNum('3') // false
isNum(NaN) // false
```

## `isInt(x, min?, max?)`

Returns true if `x` is an integer number.
* If `min` is a number, it'll also check that `x >= min`
* If `max` is a number, it'll also check that `x <= max` (note that it is an inclusive range)

```js
isInt(3)    // true
isInt(3.14) // false
```

## `isBool(x)`

Returns true if `x` is a boolean (`x` can only hold the values `true` or `false`)

## `isStr(x, minLength?, maxLength?)`

Returns true if `x` is a string.

* If `minLength` is a number, it'll also check that `x.length >= minLength`
* If `maxLength` is a number, it'll also check that `x.length <= maxLength` (note that it is an inclusive range)

## `isArr(x, minLength?, maxLength?)`

Returns true if `x` is an array (`Array.isArray()`).

* If `minLength` is a number, it'll also check that `x.length >= minLength`
* If `maxLength` is a number, it'll also check that `x.length <= maxLength` (note that it is an inclusive range)

## `isIdx(target, x)`

Returns true if `target` is an array or string and `x` represents a valid index to it (`0 <= x && x < target.length`)

## `isDef(x)`

Returns true if `x` is defined (`x !== undefined`)

## `isUndef(x)`

The opposite of `isDef()`. Returns true if `x === undefined`

## `hasProp(x, ...propNames)`

Returns true if `x` is an object and the property path specified in `propNames` exists.

### Examples

```js
const a = {
    b: {
        c: [0, 1, 2]
    }
}
hasProp(a, 'b', 'c', 0) // returns true
hasProp(a, 'b', 'c', '1') // returns true
hasProp(a, 'b', 'c', 'd') // returns false
```

## `hasOProp(x, ...propNames)`

Same as `hasProp()` but only returns true if all prop names are own properties (hence the `O` in the name). This is the safer way to check the existence of usernames in an object without mistakenly returning `true` for `constructor` or other prototypically-inherited properties.

### Example

```js
const users = {
    'alex': '123456'
}
const name = 'alex'

hasProp(a, name) // returns true
hasProp(a, 'constructor') // returns true
hasOProp(a, 'constructor') // returns false
```

---

Made in Sweden 🇸🇪 by [Alex Ewerlöf](https://twitter.com/alexewerlof)
