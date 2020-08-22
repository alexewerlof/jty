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
 * Checks if the provided value is defined
 * Also see [[isUndef]]
 * 
 * @param x any value
 */
export function isDef(x: unknown): boolean {
  return x !== undefined;
}

/**
 * Checks if the provided value is defined
 * Also see [[isDef]]
 * 
 * @param x any value
 */
export function isUndef(x: unknown): x is undefined {
  return x === undefined;
}

/**
 * Checks if a value is a non-null object
 * 
 * @example `isObj({})` => `true`
 * @example `isObj(null)` => `false`
 * @example `isObj([])` => `true`
 * @example `isObj(new URL)` => `true`
 * 
 * @param x possibly an object
 */
export function isObj(x: unknown): x is object {
  return x !== null && typeof x === 'object'
}

/**
 * Checks if a value is a function
 * 
 * @param x possibly a function (including static methods but not getters/setters)
 */
export function isFn<T extends Function>(x: unknown): x is T {
  return typeof x === 'function'
}

/**
 * Checks if a value is a finite number and optionally bound by a min and max
 * 
 * @example `isNum(3)` => `true`
 * @example `isNum(3, 3)` => `true`
 * @example `isNum(3, 10)` => `false`
 * @example `isNum(3, 3, 5)` => `true`
 * @example `isNum(3, 10, 15)` => `false`
 * @example `isNum(3, undefined, 5)` => `true`
 * @example `isNum('3')` => `false`
 * @example `isNum(NaN)` => `false`
 * 
 * @param x possibly a number
 * @param min the minimum possible value (inclusive). If this is not a finite number, the lower bound will not be checked
 * @param max the maximum possible value (inclusive). If this is not a finite number, the upper bound will not be checked
 */
export function isNum(x: unknown, min?: number, max?: number): x is number {
  if (!isFinite(x)) {
    return false
  }

  if (isFinite(min)) {

    if (isFinite(max)) {
      // Both min and max are set
      return min <= x && x <= max
    } else {
      // only min is set
      return min <= x
    }

  } else if (isFinite(max)) {
    // only max is set
    return x <= max
  }
  
  return isUndef(min) && isUndef(max)
}

/**
 * Checks if a value is a finite integer number and optionally bound by a min and max.
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
 * Checks if the provided value is boolean (basically `true` or `false`)
 * 
 * @param x possibly a boolean value
 */
export function isBool(x: unknown): x is boolean {
  return typeof x === "boolean";
}

/**
 * Checks if the provided value is a string and optionally checks whether its length is in a boundary
 * 
 * @param x possibly a string
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 */
export function isStr(x: unknown, minLen = 0, maxLen?: number): x is string {
  return typeof x === 'string' && isNum(x.length, minLen, maxLen)
}

/**
 * Checks if the provided value is an array and optionally checks whether its length is in a boundary
 * 
 * @param x possibly a string
 * @param minLen minimum possible length (inclusive)
 * @param maxLen maximum possible length (inclusive)
 */
export function isArr(x: unknown, minLen = 0, maxLen?: number): x is unknown[] {
  return isArray(x) && isNum(x.length, minLen, maxLen)
}

/**
 * Checks if x is a positive integer value that is a valid index to the specified array or string (based on their length).
 * Also see [[hasProp]]
 * 
 * @param x possibly a positive integer
 * @param target the target string or array
 */
export function isIdx(x: unknown, target: string | Array<unknown>): x is number {
  return isInt(x, 0) && (isArr(target, x + 1) || isStr(target, x + 1))
}

/**
 * Checks if x is a non-null object that has all the provided properties
 * 
 * @example given `a = { b: undefined, c:[0, 1, 2]}`
 * * `hasProp(a, 'b')` => `true`
 * * `hasProp(a, 'b', 'c')` => `true` because both `a.b` and `a.c` properties exist
 * * `hasProp(a.c, '0', 1, 'length')` => `true` because `a.c` is an array that has all those properties
 * 
 * @param x an object
 * @param propNames one or more property names
 */
export function hasProp<K extends string | number | symbol>(
  x: unknown,
  ...propNames: K[]
): x is Record<K, any> {
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
 * @param x an object
 * @param propNames one or more property names
 */
export function hasOProp<K extends string | number | symbol>(
  x: unknown,
  ...propNames: K[]
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
export function hasPath(x: unknown, ...propNames: string[]) {
  let scope = x

  if (propNames.length === 0) {
    return false
  }

  for (let propName of propNames) {
    if (hasProp(scope, propName)) {
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
 * @param x a value that may possibly have some properties
 * @param propNames one or more property names
 */
export function hasOPath(x: unknown, ...propNames: string[]) {
  let scope = x

  if (propNames.length === 0) {
    return false
  }

  for (let propName of propNames) {
    if (hasOProp(scope, propName)) {
      scope = scope[propName]
    } else {
      return false
    }
  }
  
  return true
}
