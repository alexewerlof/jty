"use strict";
exports.__esModule = true;
exports.hasOPath = exports.hasPath = exports.hasOProp = exports.hasProp = exports.isUndef = exports.isDef = exports.isIdx = exports.isArr = exports.isStr = exports.isBool = exports.isInt = exports.isNum = exports.isFn = exports.isObj = exports.inRange = void 0;
var CONSTRUCTOR = 'constructor';
// eslint-disable-next-line @typescript-eslint/unbound-method
var hasOwnProperty = {}.hasOwnProperty;
// eslint-disable-next-line @typescript-eslint/unbound-method
var _a = (0)[CONSTRUCTOR], isFinite = _a.isFinite, isInteger = _a.isInteger;
// eslint-disable-next-line @typescript-eslint/unbound-method
var isArray = [][CONSTRUCTOR].isArray;
function inRange(x, min, max) {
    if (!isFinite(x)) {
        return false;
    }
    if (isFinite(min)) {
        if (isFinite(max)) {
            // Both min and max are set
            return min <= x && x <= max;
        }
        else {
            // only min is set
            return min <= x;
        }
    }
    else if (isFinite(max)) {
        // only max is set
        return x <= max;
    }
    return isUndef(min) && isUndef(max);
}
exports.inRange = inRange;
function isObj(x) {
    return x !== null && typeof x === 'object';
}
exports.isObj = isObj;
function isFn(x) {
    return typeof x === 'function';
}
exports.isFn = isFn;
function isNum(x, min, max) {
    return inRange(x, min, max);
}
exports.isNum = isNum;
function isInt(x, min, max) {
    return isInteger(x) && inRange(x, min, max);
}
exports.isInt = isInt;
function isBool(x) {
    return typeof x === "boolean";
}
exports.isBool = isBool;
function isStr(x, minLen, maxLen) {
    if (minLen === void 0) { minLen = 0; }
    return typeof x === 'string' && inRange(x.length, minLen, maxLen);
}
exports.isStr = isStr;
function isArr(x, minLen, maxLen) {
    if (minLen === void 0) { minLen = 0; }
    return isArray(x) && inRange(x.length, minLen, maxLen);
}
exports.isArr = isArr;
/**
 * Checks if x is a positive integer value that is a valid index to the specified array or string
 */
function isIdx(x, target) {
    return isInt(x, 0) && (isArr(target, x + 1) || isStr(target, x + 1));
}
exports.isIdx = isIdx;
function isDef(x) {
    return x !== undefined;
}
exports.isDef = isDef;
function isUndef(x) {
    return x === undefined;
}
exports.isUndef = isUndef;
function hasProp(x) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    if (!isObj(x)) {
        return false;
    }
    for (var _a = 0, propNames_1 = propNames; _a < propNames_1.length; _a++) {
        var propName = propNames_1[_a];
        if (!(propName in x)) {
            return false;
        }
    }
    return true;
}
exports.hasProp = hasProp;
function hasOProp(x) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    if (!isObj(x)) {
        return false;
    }
    for (var _a = 0, propNames_2 = propNames; _a < propNames_2.length; _a++) {
        var propName = propNames_2[_a];
        if (!hasOwnProperty.call(x, propName)) {
            return false;
        }
    }
    return true;
}
exports.hasOProp = hasOProp;
function hasPath(x) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    var scope = x;
    if (propNames.length === 0) {
        return false;
    }
    for (var _a = 0, propNames_3 = propNames; _a < propNames_3.length; _a++) {
        var propName = propNames_3[_a];
        if (propName !== undefined && isObj(scope) && (propName in scope)) {
            scope = scope[propName];
        }
        else {
            return false;
        }
    }
    return true;
}
exports.hasPath = hasPath;
function hasOPath(x) {
    var propNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        propNames[_i - 1] = arguments[_i];
    }
    var scope = x;
    if (propNames.length === 0) {
        return false;
    }
    for (var _a = 0, propNames_4 = propNames; _a < propNames_4.length; _a++) {
        var propName = propNames_4[_a];
        if (propName !== undefined && isObj(scope) && hasOwnProperty.call(scope, propName)) {
            scope = scope[propName];
        }
        else {
            return false;
        }
    }
    return true;
}
exports.hasOPath = hasOPath;
//# sourceMappingURL=index.js.map