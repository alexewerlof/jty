/**
 * @internal
 * A string used to lookup object constructors because it compresses better
 */
const CONSTRUCTOR = 'constructor'

const { 
  /**
   * @internal
   * A reference to the object.hasOwnProperty() avoiding possible monkey-patching
   */
  hasOwnProperty
} = {} as any

const {
  /**
   * @internal
   * A reference to the Number.isFinite() avoiding possible monkey-patching
   */
  isFinite, 
  /**
   * @internal
   * A reference to the Number.isInteger() avoiding possible monkey-patching
   */
  isInteger
} = (0)[CONSTRUCTOR]  as unknown as {
  isFinite: (x: unknown) => x is number
  isInteger: (x: unknown) => x is number
}

const { 
  /**
   * @internal
   * A reference to the Array.isArray() avoiding possible monkey-patching
   */
  isArray
} = [][CONSTRUCTOR] as unknown as {
  isArray: (x: unknown) => x is Array<unknown>
}

/**
 * Acceptable types for object property names
 */
type ObjectProp = string | number | symbol

/**
 * Number or BigInt
 */
type FiniteNumber = number | BigInt

/**
 * Checks if the provided value is defined
 * This is exactly `x !== undefined` but a bit shorter
 * 
 * @see [[isUndef]]
 * @see [[isUnsh]]
 * 
 * @param x any value
 */
export function isDef(x: unknown): x is Exclude<any, undefined> {
  return x !== undefined;
}

/**
 * Checks if the provided value is defined
 * 
 * This is exactly `x === undefined` but a bit shorter
 * 
 * @see [[isDef]]
 * @see [[isNsh]]
 * 
 * @param x any value
 */
export function isUndef(x: unknown): x is undefined {
  return x === undefined;
}

/**
 * Checks if the provided value is "nullish" (`null` or `undefined`)
 * 
 * This is similar to how the nullish coalescing operator (`??`) works
 * 
 * @see [[isUndef]]
 * @see [[isUnsh]]
 * 
 * @param x any value
 */
export function isNsh(x: unknown): x is (null | undefined) {
  return x === undefined || x === null;
}

/**
 * Checks if the provided value is not "nullish" (`null` or `undefined`)
 * 
 * This is similar to how the nullish coalescing operator (`??`) works
 * 
 * @see [[isDef]]
 * @see [[isNsh]]
 * 
 * @param x any value
 */
export function isUnsh(x: unknown): x is NonNullable<any> {
  return x !== undefined && x !== null;
}

/**
 * Checks if a provided value is an instance of the provided class
 * 
 * This does not throw for some cases where JavaScript chokes ()
 * 
 * @example `isA({}, Object) => true`
 * @example `isA(/hello/i, RegExp) => true`
 * @example `isA(Promise.resolve, Promise) => true`
 * @example `isA('plain str', String) => false`
 * @example `isA(new String('str obj'), String) => true`
 * @example `isA(22, Number) => false`
 * @example `isA(new Number(33), Number) => true`
 * @example
 * `2 instanceof NaN` throws a `TypeError` but `isA(2, NaN)` returns `false`
 * 
 * @param x possibly an instance of a class
 * @param classConstructor a class constructor (usually starts with big letter!)
 */
export function isA<T extends new (...args: any) => any>(x: unknown, classConstructor: T): x is InstanceType<T> {
  return isFn(classConstructor) && x instanceof classConstructor;
}

/**
 * Checks if the provided value is boolean (basically `true` or `false`)
 * 
 * This is exactly `typeof x === "boolean"` but a bit shorter
 * 
 * @param x possibly a boolean value
 */
export function isBool(x: unknown): x is boolean {
  return typeof x === "boolean";
}

/**
 * Checks if the provided value is a symbol
 * 
 * This is exactly `x === "symbol"` but a bit shorter
 * 
 * @param x possibly a symbol
 */
export function isSym(x: unknown): x is symbol {
  return typeof x === 'symbol'
}

/**
 * Checks if a value is a non-null object
 * 
 * @see [[isA]]
 * @see [[hasPath]]
 * @see [[hasOPath]]
 * @see [[hasProp]]
 * @see [[hasOProp]]
 * @see [[isArr]]
 * 
 * @example `isObj({})` => `true`
 * @example `isObj(null)` => `false`
 * @example `isObj([])` => `true`
 * @example `isObj(new URL)` => `true`
 * @example `isObj(13)` => `false`
 * @example `isObj(Number(13))` => `false`
 * 
 * @param x possibly an object
 * @return true if the value is an non-null object, false otherwise
 */
export function isObj(x: unknown): x is Exclude<object, null> {
  return x !== null && typeof x === 'object'
}

/**
 * Checks if a value is a function
 * 
 * This is exactly liker `typeof x === "function"` but a bit shorter
 * 
 * If you are using TypeScript and you know the function signature, you can provide the generic `T` for your guard.
 * @param x possibly a function (including static methods but not getters or setters)
 * @return true if the value is a function, false otherwise
 */
export function isFn<T extends Function>(x: unknown): x is T {
  return typeof x === 'function'
}

/**
 * Checks if a value is a Promise
 * 
 * Similar to Node's [`isPromise()`](https://nodejs.org/api/util.html#util_util_types_ispromise_value) 
 * but returns true even for non-native promises that match a promise signature.
 * @param x possibly a promise
 * @returns true if the value is an instance of `Promise` or an object with a `then()` method, false otherwise
 */
export function isPrm<T extends any>(x: unknown): x is Promise<T> {
  return isA(x, Promise) || (isObj(x) && isFn((x as Promise<any>).then))
}

/**
 * This is an internal function that checks if a value is a number or BigInt.
 * The end-user API is isFin()
 * 
 * @param x a value
 * @returns true if the value is a number or BigInt
 */
function isN(x: unknown): x is FiniteNumber {
  return isFinite(x) || typeof x === 'bigint'
}

/**
 * Checks if a value is a number or BigInt and optionally bound by a min and max (inclusive)
 * 
 * @see [[isInt]]
 * @see [[isNum]]
 * @see [[isBInt]]
 * 
 * @example `isFin(1)` => `true`
 * @example `isFin(1n)` => `true`
 * @example `isFin('1')` => `false`
 * @example `isFin('1n')` => `false`
 * @example `isFin(NaN)` => `false`
 * @example `isFin(null)` => `false`
 * @example `isFin(Infinity)` => `false`
 * @example `isFin(-Infinity)` => `false`
 * @example `isFin(-0)` => `true`
 * @example `isFin(+0)` => `true`
 * 
 * @param x possibly a number or BigInt
 * 
 * @returns true if the value is either a number or a BigInt
 */
export function isFin(x: unknown, min?: FiniteNumber, max?: FiniteNumber): x is FiniteNumber {
  if (!isN(x)) {
    return false
  }

  if (isN(min)) {

    if (isN(max)) {
      // Both min and max are set
      return min <= x && x <= max
    } else {
      // only min is set
      return min <= x
    }

  } else if (isN(max)) {
    // only max is set
    return x <= max
  }
  
  return isUndef(min) && isUndef(max)
}

/**
 * Checks if a value is a finite number and optionally bound by a min and max (inclusive)
 * 
 * @see [[isInt]]
 * 
 * @example `isNum(3)` => `true`
 * @example `isNum(3, 3)` => `true`
 * @example `isNum(3, 10)` => `false`
 * @example `isNum(3, 3, 3)` => `true`
 * @example `isNum(3, 10, 15)` => `false`
 * @example `isNum(3, undefined, 5)` => `true`
 * @example `isNum('3')` => `false`
 * @example `isNum(NaN)` => `false`
 * 
 * @param x possibly a number
 * @param min the minimum possible value (inclusive). If this is not a finite number, the lower bound will not be checked
 * @param max the maximum possible value (inclusive). If this is not a finite number, the upper bound will not be checked
 */
export function isNum(x: unknown, min?: number, max?: number): x is FiniteNumber {
  return typeof x === 'number' && isFin(x, min, max)
}

/**
 * Checks if a value is a finite integer number and optionally bound by a min and max (inclusive)
 * 
 * @see [[isNum]]
 * 
 * @example `isInt(3.14)` => `false`
 * @example `isInt(3)` => `true`
 * 
 * @param x possibly an integer number
 * @param min the minimum possible value (inclusive). If this is not a finite number, the lower bound will not be checked
 * @param max the maximum possible value (inclusive). If this is not a finite number, the upper bound will not be checked
 */
export function isInt(x: unknown, min?: number, max?: number): x is number {
  return isInteger(x) && isNum(x, min, max);
}

/**
 * Checks if a value is a finite big integer number (`BigInt`) and optionally bound by a min and max (inclusive)
 * 
 * @see [[isInt]]
 * @see [[isNum]]
 * 
 * @example `isBInt(43567877)` => `false`
 * @example `isBInt(43567877n)` => `true`
 * 
 * @param x possibly a big integer number
 * @param min the minimum possible value (inclusive). If this is not a finite number, the lower bound will not be checked
 * @param max the maximum possible value (inclusive). If this is not a finite number, the upper bound will not be checked
 */
export function isBInt(x: unknown, min?: FiniteNumber, max?: FiniteNumber): x is BigInt {
  return typeof x === 'bigint' && isFin(x, min, max)
}

/**
 * Checks if the provided value is a string and optionally checks whether its length is in a boundary (inclusive)
 * 
 * @see [[isSym]]
 * @see [[isUnsh]]
 * 
 * @param x possibly a string
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 */
export function isStr(x: unknown, minLen = 0, maxLen?: number): x is string {
  return typeof x === 'string' && isNum(x.length, minLen, maxLen)
}

/**
 * Checks if the provided value is an array and optionally checks whether its length is in a boundary (inclusive)
 * 
 * @see [[isObj]]
 *
 * @param x possibly a string
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 */
export function isArr(x: unknown, minLen = 0, maxLen?: number): x is unknown[] {
  return isArray(x) && isNum(x.length, minLen, maxLen)
}

/**
 * Checks if x is a non-null object that has all the provided properties
 * 
 * @see [[isObj]]
 * @see [[hasOProp]]
 * @see [[hasPath]]
 * @see [[hasOPath]]
 * 
 * @example given `a = { b: undefined, c:[0, 1, 2]}`
 * * `hasProp(a, 'b')` => `true`
 * * `hasProp(a, 'b', 'c')` => `true` because both `a.b` and `a.c` properties exist
 * * `hasProp(a.c, '0', 1, 'length')` => `true` because `a.c` is an array that has all those properties
 * 
 * @param x an object
 * @param propNames one or more property names
 */
export function hasProp<K extends ObjectProp>(x: unknown, ...propNames: readonly K[]): x is Record<K, object> {
  if (!isObj(x)) {
    return false
  }
  
  for (let propName of propNames) {
    if (!(propName in x)) {
      return false
    }
  }

  return true
}

/**
 * Same as [[hasProp]] but checks for own properties (not inherited properties)
 * 
 * @see [[isObj]]
 * @see [[hasProp]]
 * @see [[hasPath]]
 * @see [[hasOPath]]

 * @param x an object
 * @param propNames one or more property names
 */
export function hasOProp<K extends ObjectProp>(
  x: unknown,
  ...propNames: readonly K[]
): x is Record<K, any> {
  if (!isObj(x)) {
    return false
  }
  
  for (let propName of propNames) {
    if (!hasOwnProperty.call(x, propName)) {
      return false
    }
  }

  return true
}

/**
 * Checks if the provided value has the a path of properties
 * 
 * @see [[isObj]]
 * @see [[hasProp]]
 * @see [[hasOProp]]
 * @see [[hasOPath]]
 *
 * @example given `x = { foo: { bar: { baz: undefined }}}`
 * 
 * * `hasPath(x, 'foo', 'bar')` returns `true`
 * * `hasPath(x, 'foo', 'bar', 'baz')` returns `true` because `x.foo.bar.baz` property exists
 * * `hasPath(x, 'foo', 'hello', 'baz')` returns `false` because `x.foo.hello` property does not exist
 * * `hasPath(x, 'foo', 'bar', 'hello')` returns `false`
 * 
 * @param x a value that may possibly have some properties
 * @param propNames one or more property names
 */
export function hasPath<K extends ObjectProp[]>(x: unknown, ...propNames: readonly [...K]): x is 
  Record<K[0], 
  Record<K[1], 
  Record<K[2], 
  Record<K[3], 
  Record<K[4], 
  Record<K[5], 
  Record<K[6], 
  Record<K[7], 
  Record<K[8], 
  Record<K[9], 
  object>>>>>>>>>> {
  if (propNames.length === 0) {
    return false
  }
  
  let scope = x

  for (let propName of propNames) {
    if (hasProp(scope, propName)) {
      // @ts-ignore
      scope = scope[propName]
    } else {
      return false
    }
  }

  return true
}

/**
 * Similar to [[hasPath]] but only works for own properties (not inherited properties)
 *
 * @see [[isObj]]
 * @see [[hasProp]]
 * @see [[hasOProp]]
 * @see [[hasPath]]
 * 
 * @param x a value that may possibly have some properties
 * @param propNames one or more property names
 */
export function hasOPath<K extends ObjectProp[]>(x: unknown, ...propNames: readonly [...K]): x is
  Record<K[0],
  Record<K[1], 
  Record<K[2], 
  Record<K[3], 
  Record<K[4], 
  Record<K[5], 
  Record<K[6], 
  Record<K[7], 
  Record<K[8], 
  Record<K[9], 
  object>>>>>>>>>> {
  if (propNames.length === 0) {
    return false
  }
  
  let scope = x

  for (let propName of propNames) {
    if (hasOProp(scope, propName)) {
      // @ts-ignore
      scope = scope[propName]
    } else {
      return false
    }
  }
  
  return true
}
