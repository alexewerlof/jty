const { inRange, isObj, isFn, isStr, isNum, isInt, isBool, isArr, isIdx, isDef, isUndef, hasProp, hasOProp, hasPath, hasOPath } = require('../lib/')

const noop = () => void 0

describe('inRange', () => {
    it('returns true if a numerical value is in range', () => {
        expect(inRange(2, 1, 3)).toBe(true)
    })
    
    it('returns true if the value is in range (inclusive)', () => {
        expect(inRange(1, 1, 3)).toBe(true)
        expect(inRange(3, 1, 3)).toBe(true)
    })

    it('works when the min === max', () => {
        expect(inRange(1, 1, 1)).toBe(true)
        expect(inRange(3, 1, 1)).toBe(false)
    })

    it('returns false if the value is not numerical', () => {
        expect(inRange('2', 1, 3)).toBe(false)
    })

    it('works if only min is specified', () => {
        expect(inRange(2, 1)).toBe(true)
        expect(inRange(2, 3)).toBe(false)
    })

    it('works if only min is specified', () => {
        expect(inRange(2, undefined, 3)).toBe(true)
        expect(inRange(2, undefined, 1)).toBe(false)
    })

    it('returns true if min and max are missing', () => {
        expect(inRange(2)).toBe(true)
        expect(inRange(2)).toBe(true)
    })

    it('returns false if the min and max are misplaced', () => {
        expect(inRange(2, 3, 1)).toBe(false)
    })
})

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
})

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

    it('returns true for arrow functions', () => {
        expect(isFn(() => void 0)).toBe(true)
    })
})

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

    it('can match the length', () => {
        expect(isStr('', 0)).toBe(true)
        expect(isStr('', 1)).toBe(false)
        expect(isStr('H', 0, 1)).toBe(true)
        expect(isStr('H', 1)).toBe(true)
        expect(isStr('H', 2)).toBe(false)
        expect(isStr('Hi', 1)).toBe(true)
        expect(isStr('Hi', 2)).toBe(true)
        expect(isStr('Hi', 3)).toBe(false)
    })

    it('can match length range', () => {
        const str = 'Hello'
        expect(isStr(str, undefined, 6)).toBe(true)
        expect(isStr(str, 0, 6)).toBe(true)
        expect(isStr(str, -1, 6)).toBe(true)
        expect(isStr(str, -1.1, 5.1)).toBe(true)
        expect(isStr(str, 5, 6)).toBe(true)
        expect(isStr(str, 4, 6)).toBe(true)
        expect(isStr(str, 4, 5)).toBe(true)
        expect(isStr(str, undefined, 5)).toBe(true)
    })

    it('does not choke if the max is less than min', () => {
        const str = 'Hello'
        expect(isStr(str, 6, 5)).toBe(false)
        expect(isStr(str, 6, 4)).toBe(false)
        expect(isStr(str, 5, 4)).toBe(false)
    })
})

describe('isNum', () => {
    it('returns true when the value is a number', () => {
        expect(isNum(17)).toBe(true)
        expect(isNum(Math.PI)).toBe(true)
        expect(isNum(0)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isNum(NaN)).toBe(false)
    })

    it('returns false for string numbers', () => {
        expect(isNum('13')).toBe(false)
    })

    it('returns false for non-numerical values', () => {
        expect(isNum('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isNum(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(isNum(Number.MIN_SAFE_INTEGER)).toBe(true)
    })

    it('checks range', () => {
        expect(isNum(19, 17, 20)).toBe(true)
        expect(isNum(19, 17, 19)).toBe(true)
        expect(isNum(19, 19, 20)).toBe(true)
        expect(isNum(19, 19)).toBe(true)
        expect(isNum(19.1, 19)).toBe(true)
        expect(isNum(19, undefined, 19)).toBe(true)
        expect(isNum(19.1, undefined, 19)).toBe(false)
    })
})

describe('isInt', () => {
    it('returns true when the value is an integer', () => {
        expect(isInt(17)).toBe(true)
        expect(isInt(Math.PI)).toBe(false)
        expect(isInt(0)).toBe(true)
    })

    it('returns false for NaN', () => {
        expect(isInt(NaN)).toBe(false)
    })

    it('returns false for string numbers', () => {
        expect(isInt('13')).toBe(false)
    })

    it('returns false for non-numerical values', () => {
        expect(isInt('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isInt(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(isInt(Number.MIN_SAFE_INTEGER)).toBe(true)
    })

    it('checks range', () => {
        expect(isInt(19, 17, 20)).toBe(true)
        expect(isInt(19, 17, 19)).toBe(true)
        expect(isInt(19, 19, 20)).toBe(true)
        expect(isInt(19, 19)).toBe(true)
        expect(isInt(19, undefined, 19)).toBe(true)
    })

    it('returns false for non-integer numbers even when they are in range', () => {
        expect(isInt(19.1, 19)).toBe(false)
        expect(isInt(19.1, undefined, 19)).toBe(false)
    })
})

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
})

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

    it('checks the len range', () => {
        const arr2 = [1, 2]
        expect(isArr(arr2, undefined)).toBe(true)
        expect(isArr(arr2, 0)).toBe(true)
        expect(isArr(arr2, 1)).toBe(true)
        expect(isArr(arr2, 2)).toBe(true)
        expect(isArr(arr2, 2, 3)).toBe(true)
        expect(isArr(arr2, 2, 10)).toBe(true)
        expect(isArr(arr2, 0, 3)).toBe(true)
        expect(isArr(arr2, 0, 2)).toBe(true)
    })
})

describe('isIdx', () => {
    it('checks if a value is a valid index for an array', () => {
        const arr = [10, 20, 30]
        expect(isIdx(0, arr)).toBe(true)
        expect(isIdx(1, arr)).toBe(true)
        expect(isIdx(2, arr)).toBe(true)
        expect(isIdx(3, arr)).toBe(false)
        expect(isIdx(-1, arr)).toBe(false)
        expect(isIdx(1.1, arr)).toBe(false)
    })

    it('returns false for non-array objects', () => {
        expect(isIdx(0, { 0: 'zero' })).toBe(false)
    })

    it('returns false for non numerical indices', () => {
        expect(isIdx('0', [10, 20, 30])).toBe(false)
    })
    
    it('works correctly for strings', () => {
        const str = 'Boy'
        expect(isIdx(0, str)).toBe(true)
        expect(isIdx(1, str)).toBe(true)
        expect(isIdx(2, str)).toBe(true)
        expect(isIdx(3, str)).toBe(false)
        expect(isIdx(-1, str)).toBe(false)
        expect(isIdx(1.1, str)).toBe(false)
    })
})

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
})

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
})

describe('hasProp()', () => {
    it('returns true if the object has that property', () => {
        expect(hasPath({ foo: 'bar' }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        expect(hasPath({ foo: { bar: 'qux' } }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        expect(hasPath({ foo: undefined }, 'foo')).toBe(true)
    })

    it('returns false if the property name is missing', () => {
        expect(hasPath({ foo: 'bar' })).toBe(false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        expect(hasPath({ undefined: 'one' })).toBe(false)
        expect(hasPath({ undefined: 'thress' }, undefined)).toBe(false)
        expect(hasPath({ undefined: 'two' }, 'undefined')).toBe(true)

    })

    it('returns true for "__proto__"', () => {
        expect(hasPath({}, '__proto__')).toBe(true)
    })

    it('returns true for other standard inherited properties', () => {
        expect(hasPath({}, 'constructor')).toBe(true)
        expect(hasPath({}, 'hasOwnProperty')).toBe(true)
        expect(hasPath({}, 'isPrototypeOf')).toBe(true)
        expect(hasPath({}, 'propertyIsEnumerable')).toBe(true)
        expect(hasPath({}, 'toLocaleString')).toBe(true)
        expect(hasPath({}, 'toString')).toBe(true)
        expect(hasPath({}, 'valueOf')).toBe(true)
        expect(hasPath({}, '__defineGetter__')).toBe(true)
        expect(hasPath({}, '__defineSetter__')).toBe(true)
        expect(hasPath({}, '__lookupGetter__')).toBe(true)
        expect(hasPath({}, '__lookupSetter__')).toBe(true)
    })

    it('woks for arrays', () => {
        expect(hasPath([1, 2, 3], 1)).toBe(true)
        expect(hasPath([1, 2, 3], -1)).toBe(false)
        expect(hasPath([1, 2, 3], 0)).toBe(true)
        expect(hasPath([1, 2, 3], '0')).toBe(true)
        expect(hasPath([1, 2, 3], '1')).toBe(true)
        expect(hasPath([1, 2, 3], '-1')).toBe(false)
        expect(hasPath([1, 2, 3], 'length')).toBe(true)
    })

    it('returns true for getter properties', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        expect(hasPath(a, 'b')).toBe(true)
    })

    it('works on property chains', () => {
        const obj = {
            a: {
                b: [
                    {
                        c0: 100
                    },
                    {
                        c1: 101
                    }
                ]
            }
        }
        expect(hasPath(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasPath(obj, 'a', 'b', '1', 'c1')).toBe(true)
    })
    
    it('works on property chains with prototypes', () => {
        const obj = {
            a: Object.create({
                b: [
                    {
                        c0: 100
                    },
                    {
                        c1: 101
                    }
                ]
            })
        }
        expect(hasPath(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasPath(obj, 'a', 'b', '1', 'c1')).toBe(true)
    })
})

describe('hasOProp()', () => {
    it('returns true if the object has that property', () => {
        expect(hasOPath({ foo: 'bar' }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        expect(hasOPath({ foo: { bar: 'qux' } }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        expect(hasOPath({ foo: undefined }, 'foo')).toBe(true)
    })

    it('returns false if the property name is missing', () => {
        expect(hasOPath({ foo: 'bar' })).toBe(false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        expect(hasOPath({ 'undefined': 'yes' }, 'undefined')).toBe(true)
    })

    it('returns false for "prototype"', () => {
        expect(hasOPath({}, 'prototype')).toBe(false)
        expect(hasOPath({}, '__proto__')).toBe(false)
    })

    it('woks for arrays', () => {
        expect(hasOPath([1, 2, 3], 1)).toBe(true)
        expect(hasOPath([1, 2, 3], -1)).toBe(false)
        expect(hasOPath([1, 2, 3], 0)).toBe(true)
        expect(hasOPath([1, 2, 3], '0')).toBe(true)
        expect(hasOPath([1, 2, 3], '1')).toBe(true)
        expect(hasOPath([1, 2, 3], '-1')).toBe(false)
        expect(hasOPath([1, 2, 3], 'length')).toBe(true)
    })

    it('returns false for getter properties because they use prototype inheritence', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        expect(hasOPath(a, 'b')).toBe(false)
    })

    it('works on property chains', () => {
        const obj = {
            a: {
                b: [
                    {
                        c0: 100
                    },
                    {
                        c1: 101
                    }
                ]
            }
        }
        expect(hasOPath(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasOPath(obj, 'a', 'b', '1', 'c1')).toBe(true)
    })
    
    it('does not honor property chains with prototypes', () => {
        const obj = {
            a: Object.create({
                b: [
                    {
                        c0: 100
                    },
                    {
                        c1: 101
                    }
                ]
            })
        }
        expect(hasOPath(obj, 'a', 'b', 0, 'c0')).toBe(false)
        expect(hasOPath(obj, 'a', 'b', '1', 'c1')).toBe(false)
    })
})
