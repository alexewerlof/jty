const { isObj, isFn, isStr, isNum, isBool, isArr, isDef, isUndef } = require('./index');

const noop = () => void 0

describe('isObj', () => {
    it('returns true for an object', () => {
        expect(isObj({})).toBe(true)
    })

    it('returns true for an array', () => {
        expect(isObj([])).toBe(true)
    })

    it('returns false for null', () => {
        expect(isObj(null)).toBe(false)
    })
});

describe('isFn', () => {
    it('returns true for a function', () => {
        expect(isFn(noop)).toBe(true)
    })
    
    it('returns true for a method', () => {
        class Dog {
            bark() {
                return 'woof'
            }
        }
        const dog = new Dog
        expect(isFn(dog.bark)).toBe(true)
    })

    it('returns false for an object', () => {
        expect(isFn({})).toBe(false)
    })
});

describe('isStr', () => {
    it('returns true for a string', () => {
        expect(isStr('Hello')).toBe(true)
    })

    it('returns false for a non-string value', () => {
        expect(isStr(null)).toBe(false)
    })

    it('returns true for an empty string when no minimum length is specified', () => {
        expect(isStr('')).toBe(true)
    })

    it('returns false for an empty string when the minLength is bigger than 0', () => {
        expect(isStr('', 0)).toBe(true)
        expect(isStr('', 1)).toBe(false)
    })

    it('returns false when the length is below what is specified (inclusive)', () => {
        expect(isStr('Hello', 5)).toBe(true)
        expect(isStr('Hello', 6)).toBe(false)
    })
});

describe('isNum', () => {
    it('returns true when the value is a number', () => {
        expect(isNum(17)).toBe(true)
        expect(isNum(Math.PI)).toBe(true)
        expect(isNum(0)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isNum(NaN)).toBe(false)
    })

    it('returns false for non-numerical values', () => {
        expect(isNum('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isNum(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(isNum(Number.MIN_SAFE_INTEGER)).toBe(true)
    })
});

describe('isBool', () => {
    it('returns true if the provided value is boolean', () => {
        expect(isBool(true)).toBe(true)
        expect(isBool(false)).toBe(true)
    })

    it('returns false for any non-boolean value', () => {
        expect(isBool('')).toBe(false)
        expect(isBool(0)).toBe(false)
        expect(isBool(null)).toBe(false)
        expect(isBool()).toBe(false)
    })
});

describe('isArr', () => {
    it('returns true for an array', () => {
        expect(isArr([])).toBe(true)
    })

    it('can check the minimum acceptable length', () => {
        expect(isArr(['a', 'b', 'c'], 3)).toBe(true)
        expect(isArr(['a', 'b', 'c'], 4)).toBe(false)
    })

    it('returns false for a non-array value', () => {
        expect(isArr({})).toBe(false)
    })
});

describe('isDef', () => {
    it('returns true if the provided value is defined', () => {
        expect(isDef('Hej')).toBe(true)
        expect(isDef(13)).toBe(true)
        expect(isDef(false)).toBe(true)
        expect(isDef(NaN)).toBe(true)
        expect(isDef({})).toBe(true)
        expect(isDef([])).toBe(true)
    })

    it('returns false if the provided value is not defined', () => {
        expect(isDef()).toBe(false)
        expect(isDef(undefined)).toBe(false)
    })
});

describe('isUndef', () => {
    it('returns false if the provided value is defined', () => {
        expect(isUndef('Hej')).toBe(false)
        expect(isUndef(13)).toBe(false)
        expect(isUndef(false)).toBe(false)
        expect(isUndef(NaN)).toBe(false)
        expect(isUndef({})).toBe(false)
        expect(isUndef([])).toBe(false)
    })

    it('returns true if the provided value is not defined', () => {
        expect(isUndef()).toBe(true)
        expect(isUndef(undefined)).toBe(true)
    })
});
