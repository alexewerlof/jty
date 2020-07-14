export declare function isObj(x: unknown): x is object;
export declare function isFn(x: unknown): x is Function;
export declare function isStr(x: unknown, minLength?: number): x is string;
export declare function isNum(x: unknown): x is number;
export declare function isInt(x: unknown): x is number;
export declare function isBool(x: unknown): x is number;
export declare function isArr<T>(x: unknown, minLength?: number): x is Array<T>[];
export declare function isDef(x: unknown): boolean;
export declare function isUndef(x: unknown): x is undefined;
export declare function isProp(x: unknown, propName: string | number | symbol): x is object;
