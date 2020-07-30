function isObj(x) {
  return x !== null && typeof x === "object";
}

function isFn(x) {
  return typeof x === "function";
}

function isStr(x, minLength, maxLength) {
  if (typeof x !== "string") {
    return false
  }
  const len = x.length
  if (isDef(minLength)) {
    if (isDef(maxLength)) {
      return minLength <= len && len < maxLength
    }
    return len === minLength
  }
  return true
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

function isArr(x, minLength = 0) {
  return Array.isArray(x) && x.length >= minLength;
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