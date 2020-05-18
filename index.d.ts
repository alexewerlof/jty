declare function isObj(x: unknown): x is object;
declare function isFn(x: unknown): x is Function;
declare function isStr(x: unknown, minLength = 0): x is string;
declare function isNum(x: unknown): x is number;
declare function isBool(x: unknown): x is boolean;
declare function isArr<T>(x: unknown, minLength = 0): x is T[];