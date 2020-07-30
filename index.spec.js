const { isObj, isFn, isStr, isNum, isInt, isBool, isArr, isIdx, isDef, isUndef, hasProp, hasOProp } = require('./index')

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
        expect(isStr('Hello', undefined, 6)).toBe(true)
        expect(isStr('Hello', 0, 6)).toBe(true)
        expect(isStr('Hello', -1, 6)).toBe(true)
        expect(isStr('Hello', -1.1, 5.1)).toBe(true)
        expect(isStr('Hello', 5, 6)).toBe(true)
        expect(isStr('Hello', 4, 6)).toBe(true)
        expect(isStr('Hello', 4, 5)).toBe(true)
        expect(isStr('Hello', undefined, 5)).toBe(true)
    })

    it('does not choke if the max is less than min', () => {
        expect(isStr('Hello', 6, 5)).toBe(false)
        expect(isStr('Hello', 6, 4)).toBe(false)
        expect(isStr('Hello', 5, 4)).toBe(false)
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
        expect(isIdx([10, 20, 30], 0)).toBe(true)
        expect(isIdx([10, 20, 30], 1)).toBe(true)
        expect(isIdx([10, 20, 30], 2)).toBe(true)
        expect(isIdx([10, 20, 30], 3)).toBe(false)
        expect(isIdx([10, 20, 30], -1)).toBe(false)
        expect(isIdx([10, 20, 30], 1.1)).toBe(false)
    })

    it('returns false for non-array objects', () => {
        expect(isIdx({ 0: 'zero' }, 0)).toBe(false)
    })

    it('returns false for non numerical indices', () => {
        expect(isIdx([10, 20, 30], '0')).toBe(false)
    })
    
    it('returns false if the actual index is missing', () => {
        expect(isIdx([10, 20, 30])).toBe(false)
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
        expect(hasProp({ foo: 'bar' }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        expect(hasProp({ foo: { bar: 'qux' } }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        expect(hasProp({ foo: undefined }, 'foo')).toBe(true)
    })

    it('returns false if the property name is missing', () => {
        expect(hasProp({ foo: 'bar' })).toBe(false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        expect(hasProp({ undefined: 'one' })).toBe(false)
        expect(hasProp({ undefined: 'thress' }, undefined)).toBe(false)
        expect(hasProp({ undefined: 'two' }, 'undefined')).toBe(true)

    })

    it('returns true for "__proto__"', () => {
        expect(hasProp({}, '__proto__')).toBe(true)
    })

    it('woks for arrays', () => {
        expect(hasProp([1, 2, 3], 1)).toBe(true)
        expect(hasProp([1, 2, 3], -1)).toBe(false)
        expect(hasProp([1, 2, 3], 0)).toBe(true)
        expect(hasProp([1, 2, 3], '0')).toBe(true)
        expect(hasProp([1, 2, 3], '1')).toBe(true)
        expect(hasProp([1, 2, 3], '-1')).toBe(false)
        expect(hasProp([1, 2, 3], 'length')).toBe(true)
    })

    it('returns true for getter properties', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        expect(hasProp(a, 'b')).toBe(true)
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
        expect(hasProp(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasProp(obj, 'a', 'b', '1', 'c1')).toBe(true)
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
        expect(hasProp(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasProp(obj, 'a', 'b', '1', 'c1')).toBe(true)
    })
})

describe('hasOProp()', () => {
    it('returns true if the object has that property', () => {
        expect(hasOProp({ foo: 'bar' }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property and the value is an object', () => {
        expect(hasOProp({ foo: { bar: 'qux' } }, 'foo')).toBe(true)
    })

    it('returns true if the object has that property even if the value is undefined', () => {
        expect(hasOProp({ foo: undefined }, 'foo')).toBe(true)
    })

    it('returns false if the property name is missing', () => {
        expect(hasOProp({ foo: 'bar' })).toBe(false)
    })

    it('works correctly if the object has a key that is named "undefined"', () => {
        expect(hasOProp({ 'undefined': 'yes' }, 'undefined')).toBe(true)
    })

    it('returns false for "prototype"', () => {
        expect(hasOProp({}, 'prototype')).toBe(false)
        expect(hasOProp({}, '__proto__')).toBe(false)
    })

    it('woks for arrays', () => {
        expect(hasOProp([1, 2, 3], 1)).toBe(true)
        expect(hasOProp([1, 2, 3], -1)).toBe(false)
        expect(hasOProp([1, 2, 3], 0)).toBe(true)
        expect(hasOProp([1, 2, 3], '0')).toBe(true)
        expect(hasOProp([1, 2, 3], '1')).toBe(true)
        expect(hasOProp([1, 2, 3], '-1')).toBe(false)
        expect(hasOProp([1, 2, 3], 'length')).toBe(true)
    })

    it('returns false for getter properties because they use prototype inheritence', () => {
        class A {
            get b() {
                return 0
            }
        }

        const a = new A
        expect(hasOProp(a, 'b')).toBe(false)
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
        expect(hasOProp(obj, 'a', 'b', 0, 'c0')).toBe(true)
        expect(hasOProp(obj, 'a', 'b', '1', 'c1')).toBe(true)
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
        expect(hasOProp(obj, 'a', 'b', 0, 'c0')).toBe(false)
        expect(hasOProp(obj, 'a', 'b', '1', 'c1')).toBe(false)
    })
})
