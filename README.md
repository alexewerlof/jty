# JTY - Javascript typecheck

A minimal type checking library that I developed over a few years of programming JavaScript.
It has a solid and minimalistic API surface that provides useful functions for basic type checking.

* All functions return `true` or `false` (no one `throw`s)
* It is resistent to monkey patching or malicious prototype overriding
* It comes with TypeScript support out of the box.
* Thoroughly tested for edge cases
* Works in Node and Browsers (CommonJS out of the box)

# API

## `isObj(x)`

Returns true if `x` is a non-null object.

## `isFn(x)`

Returns true if `x` is a function (including class methods, arrow functions, result of `new Function()`, etc.).

## `isNum(x, min?, max?)`

Returns true if `x` is a finite number.
* If `min` is a number, it'll also check that `x.length >= min`
* If `max` is a number, it'll also check that `x.length <= max` (note that it is an inclusive range)

## `isInt(x, min?, max?)`

Returns true if `x` is an integer number.
* If `min` is a number, it'll also check that `x.length >= min`
* If `max` is a number, it'll also check that `x.length <= max` (note that it is an inclusive range)

## `isBool(x)`

Returns true if `x` is a boolean

## `isStr(x, minLength?, maxLength?)`

Returns true if `x` is a string.
* If `minLength` is a number, it'll also check that `x.length >= minLength`
* If `maxLength` is a number, it'll also check that `x.length <= maxLength` (note that it is an inclusive range)

## `isArr(x, minLength?, maxLength?)`

Returns true if `x` is an array (`Array.isArray()`).
* If `minLength` is a number, it'll also check that `x.length >= minLength`
* If `maxLength` is a number, it'll also check that `x.length <= maxLength` (note that it is an inclusive range)

## `isIdx(x, idx)`

Returns true if `x` is an array or string and `idx` represents a valid index to it (`0 <= idx && idx < x.length`)

## `isDef(x)`

Returns true if `x` is defined (`x !== undefined`)

## `isUndef(x)`

The opposite of `isDef()`. Returns true if `x === undefined`

## `hasProp(x, ...propNames)`

Reutnrs true if `x` is an object and the property path specified in `propNames` exists.

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