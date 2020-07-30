const { isObj, isFn, isStr, isNum, isBool, isArr, isDef, isUndef, hasProp, hasOProp } = require('./index')

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

    it('returns false for an empty string when the minLength is bigger than 0', () => {
        expect(isStr('', 0)).toBe(true)
        expect(isStr('', 1)).toBe(false)
    })

    it('returns false when the length is below what is specified (inclusive)', () => {
        expect(isStr('Hello', 5)).toBe(true)
        expect(isStr('Hello', 6)).toBe(false)
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

    it('returns false for non-numerical values', () => {
        expect(isNum('Hi')).toBe(false)
    })

    it('returns true for extreme numbers', () => {
        expect(isNum(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(isNum(Number.MIN_SAFE_INTEGER)).toBe(true)
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
