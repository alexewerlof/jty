function isObj(x) {
  return x !== null && typeof x === "object";
}

function isFn(x) {
  return typeof x === "function";
}

function isStr(x, minLength = 0) {
  return typeof x === "string" && x.length >= minLength;
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

function isProp(x, ...propNames) {
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

function isOProp(x, ...propNames) {
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

module.exports = { isObj, isFn, isStr, isNum, isInt, isBool, isArr, isDef, isUndef, isProp, isOProp }