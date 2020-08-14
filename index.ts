const CONSTRUCTOR = 'constructor'
// eslint-disable-next-line @typescript-eslint/unbound-method
const { hasOwnProperty } = {} as any
// eslint-disable-next-line @typescript-eslint/unbound-method
const { isFinite, isInteger } = (0)[CONSTRUCTOR]  as unknown as {
  isFinite: (x: unknown) => x is number
  isInteger: (x: unknown) => x is number
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const { isArray } = [][CONSTRUCTOR] as unknown as {
  isArray: (x: unknown) => x is Array<unknown>
}

export function inRange(x: unknown, min?: number, max?: number): x is number {
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

export function isObj(x: unknown): x is object {
  return x !== null && typeof x === 'object'
}

export function isFn<T extends Function>(x: unknown): x is T {
  return typeof x === 'function'
}

export function isNum(x: unknown, min?: number, max?: number): x is number {
  return inRange(x, min, max);
}

export function isInt(x: unknown, min?: number, max?: number): x is number {
  return isInteger(x) && inRange(x, min, max);
}

export function isBool(x: unknown): x is boolean {
  return typeof x === "boolean";
}

export function isStr(x: unknown, minLen = 0, maxLen?: number): x is string {
  return typeof x === 'string' && inRange(x.length, minLen, maxLen)
}

export function isArr(x: unknown, minLen = 0, maxLen?: number): x is unknown[] {
  return isArray(x) && inRange(x.length, minLen, maxLen)
}

/**
 * Checks if x is a positive integer value that is a valid index to the specified array or string
 */
export function isIdx(x: unknown, target: string | Array<unknown>): x is number {
  return isInt(x, 0) && (isArr(target, x + 1) || isStr(target, x + 1))
}

export function isDef(x: unknown): boolean {
  return x !== undefined;
}

export function isUndef(x: unknown): x is undefined {
  return x === undefined;
}

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

export function hasPath(x: unknown, ...propNames: string[]) {
  let scope = x

  if (propNames.length === 0) {
    return false
  }

  for (let propName of propNames) {
    if (propName !== undefined && isObj(scope) && (propName in scope)) {
      scope = scope[propName]
    } else {
      return false
    }
  }

  return true
}

export function hasOPath(x: unknown, ...propNames: string[]) {
  let scope = x

  if (propNames.length === 0) {
    return false
  }

  for (let propName of propNames) {
    if (propName !== undefined && isObj(scope) && hasOwnProperty.call(scope, propName)) {
      scope = scope[propName]
    } else {
      return false
    }
  }
  
  return true
}
