export declare function inRange(x: unknown, min?: number, max?: number): x is number;
export declare function isObj(x: unknown): x is object;
export declare function isFn<T extends Function>(x: unknown): x is T;
export declare function isNum(x: unknown, min?: number, max?: number): x is number;
export declare function isInt(x: unknown, min?: number, max?: number): x is number;
export declare function isBool(x: unknown): x is boolean;
export declare function isStr(x: unknown, minLen?: number, maxLen?: number): x is string;
export declare function isArr(x: unknown, minLen?: number, maxLen?: number): x is unknown[];
/**
 * Checks if x is a positive integer value that is a valid index to the specified array or string
 */
export declare function isIdx(x: unknown, target: string | Array<unknown>): x is number;
export declare function isDef(x: unknown): boolean;
export declare function isUndef(x: unknown): x is undefined;
export declare function hasProp<K extends string | number | symbol>(x: unknown, ...propNames: K[]): x is Record<K, any>;
export declare function hasOProp<K extends string | number | symbol>(x: unknown, ...propNames: K[]): x is Record<K, any>;
export declare function hasPath(x: unknown, ...propNames: string[]): boolean;
export declare function hasOPath(x: unknown, ...propNames: string[]): boolean;
