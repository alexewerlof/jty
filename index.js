const { hasOwnProperty } = {}
const { isFinite, isInteger } = (42).constructor
const { isArray } = [].constructor

function checkRange(n, min, max) {
  if (isNum(min) && n < min) {
    return false
  }
  if (isNum(max) && n > max) {
      return false
  }
  return true
}

function isObj(x) {
  return x !== null && typeof x === "object";
}

function isFn(x) {
  return typeof x === "function";
}

function isNum(x, min, max) {
  return isFinite(x) && checkRange(x, min, max);
}

function isInt(x, min, max) {
  return isInteger(x) && checkRange(x, min, max);
}

function isBool(x) {
  return typeof x === "boolean";
}

function isStr(x, minLength, maxLength) {
  return typeof x === "string" && checkRange(x.length, minLength, maxLength)
}

function isArr(x, minLength, maxLength) {
  return isArray(x) && checkRange(x.length, minLength, maxLength)
}

function isIdx(target, x) {
  return (isArr(target) || isStr(target)) && isInt(x, 0, target.length - 1)
}

function isDef(x) {
  return x !== undefined;
}

function isUndef(x) {
  return x === undefined;
}

function hasProp(x, ...propNames) {
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

function hasOProp(x, ...propNames) {
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

module.exports = { isObj, isFn, isStr, isNum, isInt, isBool, isArr, isIdx, isDef, isUndef, hasProp, hasOProp }