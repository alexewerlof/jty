function isObj(x) {
  return Boolean(x) && typeof x === "object";
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

function isBool(x) {
  return typeof x === "boolean";
}

function isArr(x, minLength = 0) {
  return Array.isArray(x) && x.length >= minLength;
}

function isDef(x) {
  return x !== undefined
}

function isUndef(x) {
  return x === undefined
}

module.exports = { isObj, isFn, isStr, isNum, isBool, isArr, isDef, isUndef };
