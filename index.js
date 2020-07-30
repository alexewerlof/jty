function checkRange(n, min, max) {
  if (isDef(min)) {
    if (isDef(max)) {
      return min <= n && n < max
    }
    return n === min
  } else if (isDef(max)) {
    return n < max
  }
  return true
}

function isObj(x) {
  return x !== null && typeof x === "object";
}

function isFn(x) {
  return typeof x === "function";
}

function isStr(x, minLength, maxLength) {
  return typeof x === "string" && checkRange(x.length, minLength, maxLength)
}

function isNum(x) {
  return Number.isFinite(x);
}

function isInt(x) {
  return Number.isInteger(x);
}

function isBool(x) {
  return typeof x === "boolean";
}

function isArr(x, minLength, maxLength) {
  return Array.isArray(x) && checkRange(x.length, minLength, maxLength)
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
    if (propName !== undefined && isObj(scope) && Object.prototype.hasOwnProperty.call(scope, propName)) {
      scope = scope[propName]
    } else {
      return false
    }
  }
  return true
}

module.exports = { isObj, isFn, isStr, isNum, isInt, isBool, isArr, isDef, isUndef, hasProp, hasOProp }