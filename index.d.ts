export function isObj(x: unknown): x is object;
export function isFn(x: unknown): x is Function;
export function isNum(x: unknown, min?: number, max?: number): x is number;
export function isInt(x: unknown, min?: number, max?: number): x is number;
export function isBool(x: unknown): x is number;
export function isStr(x: unknown, minLength?: number, maxLength?: number): x is string;
export function isArr<T>(x: unknown, minLength?: number, maxLength?: number): x is Array<T>[];
export function isIdx(target: string | any[], x: number): x is number;
export function isDef(x: unknown): boolean;
export function isUndef(x: unknown): x is undefined;
export function hasProp(x: unknown, ...propNames: (string | number | symbol)[]): x is object;
export function hasOProp(x: unknown, ...propNames: (string | number | symbol)[]): x is object;
