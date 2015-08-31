/**
 * Cocos2d-js run-time wrappers
 *
 */

/**
 *
 * @constructor
 */
function CCLayer(){}
/**
 *
 * @constructor
 */
function CCLayerColor(){}
/**
 *
 * @constructor
 */
function CCNode(){}
/**
 *
 * @constructor
 */
function CCSprite(){}
/**
 *
 * @constructor
 */
function CCScene(){}

var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /**
        * Collection type a bit like ArrayList but does not preserve the order of its
        * entities, speedwise it is very good, especially suited for games.
        */
        var Bag = (function () {
            /**
            * Constructs an empty Bag with the specified initial capacity.
            * Constructs an empty Bag with an initial capacity of 64.
            *
            * @param capacity
            *            the initial capacity of Bag
            */
            function Bag(capacity) {
                if (capacity === void 0) { capacity = 64; }
                this.size_ = 0;
                this.data_ = new Array(capacity);
            }
            /**
            * Removes the element at the specified position in this Bag. does this by
            * overwriting it was last element then removing last element
            *
            * @param index
            *            the index of element to be removed
            * @return element that was removed from the Bag
            */
            Bag.prototype.removeAt = function (index) {
                var e = this.data_[index]; // make copy of element to remove so it can be returned
                this.data_[index] = this.data_[--this.size_]; // overwrite item to remove with last element
                this.data_[this.size_] = null; // null last element, so gc can do its work
                return e;
            };
            /**
            * Removes the first occurrence of the specified element from this Bag, if
            * it is present. If the Bag does not contain the element, it is unchanged.
            * does this by overwriting it was last element then removing last element
            *
            * @param e
            *            element to be removed from this list, if present
            * @return <tt>true</tt> if this list contained the specified element
            */
            Bag.prototype.remove = function (e) {
                var i;
                var e2;
                for (i = 0; i < this.size_; i++) {
                    e2 = this.data_[i];
                    if (e == e2) {
                        this.data_[i] = this.data_[--this.size_]; // overwrite item to remove with last element
                        this.data_[this.size_] = null; // null last element, so gc can do its work
                        return true;
                    }
                }
                return false;
            };
            /**
            * Remove and return the last object in the bag.
            *
            * @return the last object in the bag, null if empty.
            */
            Bag.prototype.removeLast = function () {
                if (this.size_ > 0) {
                    var e = this.data_[--this.size_];
                    this.data_[this.size_] = null;
                    return e;
                }
                return null;
            };
            /**
            * Check if bag contains this element.
            *
            * @param e
            * @return
            */
            Bag.prototype.contains = function (e) {
                var i;
                for (i = 0; this.size_ > i; i++) {
                    if (e === this.data_[i]) {
                        return true;
                    }
                }
                return false;
            };
            /**
            * Removes from this Bag all of its elements that are contained in the
            * specified Bag.
            *
            * @param bag
            *            Bag containing elements to be removed from this Bag
            * @return {@code true} if this Bag changed as a result of the call
            */
            Bag.prototype.removeAll = function (bag) {
                var modified = false;
                var i;
                var j;
                var e1;
                var e2;
                for (i = 0; i < bag.size(); i++) {
                    e1 = bag.get(i);
                    for (j = 0; j < this.size_; j++) {
                        e2 = this.data_[j];
                        if (e1 === e2) {
                            this.removeAt(j);
                            j--;
                            modified = true;
                            break;
                        }
                    }
                }
                return modified;
            };
            /**
            * Returns the element at the specified position in Bag.
            *
            * @param index
            *            index of the element to return
            * @return the element at the specified position in bag
            */
            Bag.prototype.get = function (index) {
                return this.data_[index];
            };
            /**
            * Returns the number of elements in this bag.
            *
            * @return the number of elements in this bag
            */
            Bag.prototype.size = function () {
                return this.size_;
            };
            /**
            * Returns the number of elements the bag can hold without growing.
            *
            * @return the number of elements the bag can hold without growing.
            */
            Bag.prototype.getCapacity = function () {
                return this.data_.length;
            };
            /**
            * Checks if the internal storage supports this index.
            *
            * @param index
            * @return
            */
            Bag.prototype.isIndexWithinBounds = function (index) {
                return index < this.getCapacity();
            };
            /**
            * Returns true if this list contains no elements.
            *
            * @return true if this list contains no elements
            */
            Bag.prototype.isEmpty = function () {
                return this.size_ == 0;
            };
            /**
            * Adds the specified element to the end of this bag. if needed also
            * increases the capacity of the bag.
            *
            * @param e
            *            element to be added to this list
            */
            Bag.prototype.add = function (e) {
                // is size greater than capacity increase capacity
                if (this.size_ === this.data_.length) {
                    this.grow();
                }
                this.data_[this.size_++] = e;
            };
            /**
            * Set element at specified index in the bag.
            *
            * @param index position of element
            * @param e the element
            */
            Bag.prototype.set = function (index, e) {
                if (index >= this.data_.length) {
                    this.grow(index * 2);
                }
                this.size_ = index + 1;
                this.data_[index] = e;
            };
            Bag.prototype.grow = function (newCapacity) {
                if (newCapacity === void 0) { newCapacity = ~~((this.data_.length * 3) / 2) + 1; }
                this.data_.length = newCapacity;
            };
            Bag.prototype.ensureCapacity = function (index) {
                if (index >= this.data_.length) {
                    this.grow(index * 2);
                }
            };
            /**
            * Removes all of the elements from this bag. The bag will be empty after
            * this call returns.
            */
            Bag.prototype.clear = function () {
                var i;
                // null all elements so gc can clean up
                for (i = 0; i < this.size_; i++) {
                    this.data_[i] = null;
                }
                this.size_ = 0;
            };
            /**
            * Add all items into this bag.
            * @param added
            */
            Bag.prototype.addAll = function (items) {
                var i;
                for (i = 0; items.size() > i; i++) {
                    this.add(items.get(i));
                }
            };
            return Bag;
        })();
        utils.Bag = Bag;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Bag.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /*
         * BitSets are packed into arrays of "words."  Currently a word is
         * an integer, which consists of 32 bits, requiring 5 address bits.
         */
        var ADDRESS_BITS_PER_WORD = 5;
        var BITS_PER_WORD = 1 << ADDRESS_BITS_PER_WORD;
        var BIT_INDEX_MASK = BITS_PER_WORD - 1;
        var WORD_MASK = 0xffffffff;
        /**
         * @see http://stackoverflow.com/questions/6506356/java-implementation-of-long-numberoftrailingzeros
         */
        function numberOfTrailingZeros(i) {
            if (i == 0)
                return 64;
            var x = i;
            var y;
            var n = 63;
            y = x << 32;
            if (y != 0) {
                n -= 32;
                x = y;
            }
            y = x << 16;
            if (y != 0) {
                n -= 16;
                x = y;
            }
            y = x << 8;
            if (y != 0) {
                n -= 8;
                x = y;
            }
            y = x << 4;
            if (y != 0) {
                n -= 4;
                x = y;
            }
            y = x << 2;
            if (y != 0) {
                n -= 2;
                x = y;
            }
            return (n - ((x << 1) >>> 63));
        }
        var BitSet = (function () {
            function BitSet(nbits) {
                if (nbits === void 0) { nbits = 0; }
                if (nbits < 0) {
                    throw RangeError("Negative Array Size: [" + nbits + ']');
                }
                else if (nbits === 0) {
                    this.words_ = [];
                }
                else {
                    var words = this.words_ = new Array(((nbits - 1) >> ADDRESS_BITS_PER_WORD) + 1);
                    for (var i = 0; i < words.length; i++) {
                        words[i] = 0;
                    }
                }
            }
            BitSet.prototype.nextSetBit = function (fromIndex) {
                var u = fromIndex >> ADDRESS_BITS_PER_WORD;
                var words = this.words_;
                var wordsInUse = words.length;
                var word = words[u] & (WORD_MASK << fromIndex);
                while (true) {
                    if (word != 0)
                        return (u * BITS_PER_WORD) + numberOfTrailingZeros(word);
                    if (++u === wordsInUse)
                        return -1;
                    word = words[u];
                }
            };
            BitSet.prototype.intersects = function (set) {
                var words = this.words_;
                var wordsInUse = words.length;
                for (var i = Math.min(wordsInUse, set.words_.length) - 1; i >= 0; i--)
                    if ((words[i] & set.words_[i]) != 0)
                        return true;
                return false;
            };
            // length():number {
            // 	return this.length_;
            // }
            // and(set:BitSet):BitSet {
            // }
            // or(set:BitSet):BitSet {
            // }
            // nand(set:BitSet):BitSet {
            // }
            // nor(set:BitSet):BitSet {
            // }
            // not(set:BitSet):BitSet {
            // }
            // xor(set:BitSet):BitSet {
            // }
            // equals(set:BitSet):boolean {
            // }
            // clone():BitSet {
            // }
            BitSet.prototype.isEmpty = function () {
                return this.words_.length === 0;
            };
            // toString():string {
            // }
            // cardinality():number {
            // }
            // msb():number {
            // }
            BitSet.prototype.set = function (bitIndex, value) {
                if (value === void 0) { value = true; }
                var wordIndex = bitIndex >> ADDRESS_BITS_PER_WORD;
                var words = this.words_;
                var wordsInUse = words.length;
                var wordsRequired = wordIndex + 1;
                if (wordsInUse < wordsRequired) {
                    words.length = Math.max(2 * wordsInUse, wordsRequired);
                    for (var i = wordsInUse; i < words.length; i++) {
                        words[i] = 0;
                    }
                }
                if (value) {
                    return words[wordIndex] |= (1 << bitIndex);
                }
                else {
                    return words[wordIndex] &= ~(1 << bitIndex);
                }
            };
            // setRange(from:number, to:number, value:number):number {
            // }
            BitSet.prototype.get = function (bitIndex) {
                var wordIndex = bitIndex >> ADDRESS_BITS_PER_WORD;
                var words = this.words_;
                var wordsInUse = words.length;
                return (wordIndex < wordsInUse) && ((words[wordIndex] & (1 << bitIndex)) != 0);
            };
            // getRange(from:number, to:number):number {
            // }
            BitSet.prototype.clear = function (bitIndex) {
                if (bitIndex === null) {
                    var words = this.words_;
                    var wordsInUse = words.length;
                    while (wordsInUse > 0) {
                        words[--wordsInUse] = 0;
                    }
                    return;
                }
                var wordIndex = bitIndex >> ADDRESS_BITS_PER_WORD;
                this.words_[wordIndex] &= ~(1 << bitIndex);
            };
            return BitSet;
        })();
        utils.BitSet = BitSet;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=BitSet.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.nextBool = function () {
                return ((~~(Math.random() * 32767)) & 1) === 1;
            };
            /*
             * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
            */
            MathUtils.nextDouble = function () {
                return Math.random();
            };
            /*
             * Generates a random int value from 0, inclusive, to max, exclusive.
            */
            MathUtils.nextInt = function (max) {
                return ~~(Math.random() * max);
            };
            MathUtils.random = function (start, end) {
                if (end === null) {
                    return MathUtils.nextInt(start + 1);
                }
                else if (parseInt(start) === parseFloat(start) && parseInt(end) === parseFloat(end)) {
                    return start + MathUtils.nextInt(end - start + 1);
                }
                else {
                    return start + MathUtils.nextDouble() * (end - start);
                }
            };
            return MathUtils;
        })();
        utils.MathUtils = MathUtils;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=MathUtils.js.map
//# sourceMappingURL=Map.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /**
         * Decode HashMap key
         *
         * When the key is an object, we generate a unique uuid and use that as the actual key.
         */
        function decode(key) {
            switch (typeof key) {
                case 'boolean': return '' + key;
                case 'number': return '' + key;
                case 'string': return key;
                case 'function': return key.className || key.name;
                default:
                    key.uuid = key.uuid ? key.uuid : utils.UUID.randomUUID();
                    return key.uuid;
            }
        }
        /**
         * HashMap
         *
         * Allow object as key.
         */
        var HashMap = (function () {
            function HashMap() {
                this.clear();
            }
            HashMap.prototype.clear = function () {
                this.map_ = {};
                this.keys_ = {};
            };
            HashMap.prototype.values = function () {
                var result = [];
                for (var key in this.map_) {
                    result.push(this.map_[key]);
                }
                return result;
            };
            HashMap.prototype.contains = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.containsKey = function (key) {
                return decode(key) in this.map_;
            };
            HashMap.prototype.containsValue = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.get = function (key) {
                return this.map_[decode(key)];
            };
            HashMap.prototype.isEmpty = function () {
                return Object.keys(this.map_).length === 0;
            };
            HashMap.prototype.keys = function () {
                var result = [];
                for (var key in this.keys_) {
                    result.push(this.keys_[key]);
                }
                return result;
            };
            /**
             * if key is a string, use as is, else use key.id_ or key.name
             */
            HashMap.prototype.put = function (key, value) {
                var k = decode(key);
                this.map_[k] = value;
                this.keys_[k] = key;
            };
            HashMap.prototype.remove = function (key) {
                var k = decode(key);
                delete this.map_[k];
                delete this.keys_[k];
            };
            HashMap.prototype.size = function () {
                return Object.keys(this.map_).length;
            };
            return HashMap;
        })();
        utils.HashMap = HashMap;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=HashMap.js.map
//# sourceMappingURL=ImmutableBag.js.map
//# sourceMappingURL=IRandum.js.map
/**
 *--------------------------------------------------------------------+
 * Randum.ts
 *--------------------------------------------------------------------+
 * Copyright DarkOverlordOfData (c) 2014-2015
 *--------------------------------------------------------------------+
 *
 * This file is a part of Alien Zone
 *
 * Alien Zone is free software; you can copy, modify, and distribute
 * it under the terms of the GPLv3 License
 *
 *--------------------------------------------------------------------+
 *
 * Wrap the native PRNG
 */
var Randum = (function () {
    function Randum() {
    }
    /*
     * Generates a random boolean value.
    */
    Randum.prototype.nextBool = function () {
        return ((~~(Math.random() * 32767)) & 1) === 1;
    };
    /*
     * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
    */
    Randum.prototype.nextDouble = function () {
        return Math.random();
    };
    /*
     * Generates a random int value from 0, inclusive, to max, exclusive.
    */
    Randum.prototype.nextInt = function (max) {
        return ~~(Math.random() * max);
    };
    return Randum;
})();
//# sourceMappingURL=Randum.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var Timer = (function () {
            function Timer(delay, repeat) {
                if (repeat === void 0) { repeat = false; }
                this.execute = function () { };
                this.delay = delay;
                this.repeat = repeat;
                this.acc = 0;
            }
            Timer.prototype.update = function (delta) {
                if (!this.done && !this.stopped) {
                    this.acc += delta;
                    if (this.acc >= this.delay) {
                        this.acc -= this.delay;
                        if (this.repeat) {
                            this.reset();
                        }
                        else {
                            this.done = true;
                        }
                        this.execute();
                    }
                }
            };
            Timer.prototype.reset = function () {
                this.stopped = false;
                this.done = false;
                this.acc = 0;
            };
            Timer.prototype.isDone = function () {
                return this.done;
            };
            Timer.prototype.isRunning = function () {
                return !this.done && this.acc < this.delay && !this.stopped;
            };
            Timer.prototype.stop = function () {
                this.stopped = true;
            };
            Timer.prototype.setDelay = function (delay) {
                this.delay = delay;
            };
            Timer.prototype.getPercentageRemaining = function () {
                if (this.done)
                    return 100;
                else if (this.stopped)
                    return 0;
                else
                    return 1 - (this.delay - this.acc) / this.delay;
            };
            Timer.prototype.getDelay = function () {
                return this.delay;
            };
            return Timer;
        })();
        utils.Timer = Timer;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Timer.js.map
var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var lut = [];
        for (var i = 0; i < 256; i++) {
            lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
        }
        var UUID = (function () {
            function UUID() {
            }
            /**
            * Fast UUID generator, RFC4122 version 4 compliant.
            * @author Jeff Ward (jcward.com).
            * @license MIT license
            * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
            **/
            UUID.randomUUID = function () {
                var d0 = Math.random() * 0xffffffff | 0;
                var d1 = Math.random() * 0xffffffff | 0;
                var d2 = Math.random() * 0xffffffff | 0;
                var d3 = Math.random() * 0xffffffff | 0;
                var uuid = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
                    lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
                    lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
                    lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
                if (uuid in UUID.check) {
                    throw new Error("Duplicate uuid [" + uuid + "]");
                }
                UUID.check[uuid] = uuid;
                return uuid;
            };
            UUID.check = {};
            return UUID;
        })();
        utils.UUID = UUID;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=UUID.js.map
var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
        * Mapper artemis.component.Position
        * em:ComponentMapper<artemis.component.Position>;
        *
        */
        function Mapper(component) {
            return function (target, propertyKey, descriptor) {
                var klass = target.constructor;
                klass.declaredFields = klass.declaredFields || [];
                klass.declaredFields.push(propertyKey);
                klass.prototype[propertyKey] = component;
            };
        }
        annotations.Mapper = Mapper;
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Mapper.js.map
var artemis;
(function (artemis) {
    /**
     * A tag class. All components in the system must extend this class.
     *
     * @author Arni Arent
     */
    var Component = (function () {
        function Component() {
        }
        return Component;
    })();
    artemis.Component = Component;
})(artemis || (artemis = {}));
//# sourceMappingURL=Component.js.map
var artemis;
(function (artemis) {
    var BitSet = artemis.utils.BitSet;
    /**
    * An Aspects is used by systems as a matcher against entities, to check if a system is
    * interested in an entity. Aspects define what sort of component types an entity must
    * possess, or not possess.
    *
    * This creates an aspect where an entity must possess A and B and C:
    * Aspect.getAspectForAll(A.class, B.class, C.class)
    *
    * This creates an aspect where an entity must possess A and B and C, but must not possess U or V.
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class)
    *
    * This creates an aspect where an entity must possess A and B and C, but must not possess U or V, but must possess one of X or Y or Z.
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class).one(X.class, Y.class, Z.class)
    *
    * You can create and compose aspects in many ways:
    * Aspect.getEmpty().one(X.class, Y.class, Z.class).all(A.class, B.class, C.class).exclude(U.class, V.class)
    * is the same as:
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class).one(X.class, Y.class, Z.class)
    *
    * @author Arni Arent
    *
    */
    var Aspect = (function () {
        function Aspect() {
            this.allSet_ = new BitSet();
            this.exclusionSet_ = new BitSet();
            this.oneSet_ = new BitSet();
        }
        Aspect.prototype.getAllSet = function () {
            return this.allSet_;
        };
        Aspect.prototype.getExclusionSet = function () {
            return this.exclusionSet_;
        };
        Aspect.prototype.getOneSet = function () {
            return this.oneSet_;
        };
        /**
        * Returns an aspect where an entity must possess all of the specified component types.
        * @param type a required component type
        * @param types a required component type
        * @return an aspect that can be matched against entities
        */
        Aspect.prototype.all = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            this.allSet_.set(artemis.ComponentType.getIndexFor(type));
            var t;
            for (t in types) {
                this.allSet_.set(artemis.ComponentType.getIndexFor(types[t]));
            }
            return this;
        };
        /**
        * Excludes all of the specified component types from the aspect. A system will not be
        * interested in an entity that possesses one of the specified exclusion component types.
        *
        * @param type component type to exclude
        * @param types component type to exclude
        * @return an aspect that can be matched against entities
        */
        Aspect.prototype.exclude = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            this.exclusionSet_.set(artemis.ComponentType.getIndexFor(type));
            var t;
            for (t in types) {
                this.exclusionSet_.set(artemis.ComponentType.getIndexFor(types[t]));
            }
            return this;
        };
        /**
        * Returns an aspect where an entity must possess one of the specified component types.
        * @param type one of the types the entity must possess
        * @param types one of the types the entity must possess
        * @return an aspect that can be matched against entities
        */
        Aspect.prototype.one = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            this.oneSet_.set(artemis.ComponentType.getIndexFor(type));
            for (var t in types) {
                this.oneSet_.set(artemis.ComponentType.getIndexFor(types[t]));
            }
            return this;
        };
        /**
        * Creates an aspect where an entity must possess all of the specified component types.
        *
        * @param type the type the entity must possess
        * @param types the type the entity must possess
        * @return an aspect that can be matched against entities
        *
        * @deprecated
        * @see getAspectForAll
        */
        Aspect.getAspectFor = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            return Aspect.getAspectForAll.apply(Aspect, [type].concat(types));
        };
        /**
        * Creates an aspect where an entity must possess all of the specified component types.
        *
        * @param type a required component type
        * @param types a required component type
        * @return an aspect that can be matched against entities
        */
        Aspect.getAspectForAll = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            var aspect = new Aspect();
            aspect.all.apply(aspect, [type].concat(types));
            return aspect;
        };
        /**
        * Creates an aspect where an entity must possess one of the specified component types.
        *
        * @param type one of the types the entity must possess
        * @param types one of the types the entity must possess
        * @return an aspect that can be matched against entities
        */
        Aspect.getAspectForOne = function (type) {
            var types = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                types[_i - 1] = arguments[_i];
            }
            var aspect = new Aspect();
            aspect.one.apply(aspect, [type].concat(types));
            return aspect;
        };
        /**
        * Creates and returns an empty aspect. This can be used if you want a system that processes no entities, but
        * still gets invoked. Typical usages is when you need to create special purpose systems for debug rendering,
        * like rendering FPS, how many entities are active in the world, etc.
        *
        * You can also use the all, one and exclude methods on this aspect, so if you wanted to create a system that
        * processes only entities possessing just one of the components A or B or C, then you can do:
        * Aspect.getEmpty().one(A,B,C);
        *
        * @return an empty Aspect that will reject all entities.
        */
        Aspect.getEmpty = function () {
            return new Aspect();
        };
        return Aspect;
    })();
    artemis.Aspect = Aspect;
})(artemis || (artemis = {}));
//# sourceMappingURL=Aspect.js.map
var artemis;
(function (artemis) {
    var BitSet = artemis.utils.BitSet;
    var UUID = artemis.utils.UUID;
    /**
    * The entity class. Cannot be instantiated outside the framework, you must
    * create new entities using World.
    *
    * @author Arni Arent
    *
    */
    var Entity = (function () {
        function Entity(world, id) {
            this.world_ = world;
            this.id_ = id;
            this.entityManager_ = world.getEntityManager();
            this.componentManager_ = world.getComponentManager();
            this.systemBits_ = new BitSet();
            this.componentBits_ = new BitSet();
            this.reset();
        }
        /**
        * The internal id for this entity within the framework. No other entity
        * will have the same ID, but ID's are however reused so another entity may
        * acquire this ID if the previous entity was deleted.
        *
        * @return id of the entity.
        */
        Entity.prototype.getId = function () {
            return this.id_;
        };
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        Entity.prototype.getComponentBits = function () {
            return this.componentBits_;
        };
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        Entity.prototype.getSystemBits = function () {
            return this.systemBits_;
        };
        /**
        * Make entity ready for re-use.
        * Will generate a new uuid for the entity.
        */
        Entity.prototype.reset = function () {
            this.systemBits_.clear();
            this.componentBits_.clear();
            this.uuid = UUID.randomUUID();
        };
        Entity.prototype.toString = function () {
            return "Entity[" + this.id_ + "]";
        };
        /**
        * Add a component to this entity.
        *
        * @param component to add to this entity
        *
        * @return this entity for chaining.
        */
        // public addComponent(component: Component):Entity {
        // 	this.addComponent(component, ComponentType.getTypeFor(component.getClass()));
        // 	return this;
        // }
        /**
        * Faster adding of components into the entity. Not neccessery to use this, but
        * in some cases you might need the extra performance.
        *
        * @param component the component to add
        * @param type of the component
        *
        * @return this entity for chaining.
        */
        Entity.prototype.addComponent = function (component, type) {
            if (type === void 0) { type = artemis.ComponentType.getTypeFor(component.constructor); }
            this.componentManager_.addComponent(this, type, component);
            return this;
        };
        /**
        * Removes the component from this entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        Entity.prototype.removeComponentInstance = function (component) {
            //this.removeComponent(component.getClass());
            this.removeComponent(artemis.ComponentType.getTypeFor(component.constructor));
            return this;
        };
        /**
        * Faster removal of components from a entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        Entity.prototype.removeComponent = function (type) {
            this.componentManager_.removeComponent(this, type);
            return this;
        };
        /**
        * Remove component by its type.
        * @param type
        *
        * @return this entity for chaining.
        */
        Entity.prototype.removeComponentByType = function (type) {
            this.removeComponent(artemis.ComponentType.getTypeFor(type));
            return this;
        };
        /**
        * Checks if the entity has been added to the world and has not been deleted from it.
        * If the entity has been disabled this will still return true.
        *
        * @return if it's active.
        */
        Entity.prototype.isActive = function () {
            return this.entityManager_.isActive(this.id_);
        };
        /**
        * Will check if the entity is enabled in the world.
        * By default all entities that are added to world are enabled,
        * this will only return false if an entity has been explicitly disabled.
        *
        * @return if it's enabled
        */
        Entity.prototype.isEnabled = function () {
            return this.entityManager_.isEnabled(this.id_);
        };
        /**
        * This is the preferred method to use when retrieving a component from a
        * entity. It will provide good performance.
        * But the recommended way to retrieve components from an entity is using
        * the ComponentMapper.
        *
        * @param type
        *            in order to retrieve the component fast you must provide a
        *            ComponentType instance for the expected component.
        * @return
        */
        Entity.prototype.getComponent = function (type) {
            return this.componentManager_.getComponent(this, type);
        };
        // public <T extends Component> T getComponent(Class<T> type) {
        // 	return type.cast(getComponent(ComponentType.getTypeFor(type)));
        // }
        /**
        * Slower retrieval of components from this entity. Minimize usage of this,
        * but is fine to use e.g. when creating new entities and setting data in
        * components.
        *
        * @param <T>
        *            the expected return component type.
        * @param type
        *            the expected return component type.
        * @return component that matches, or null if none is found.
        */
        Entity.prototype.getComponentByType = function (type) {
            //return type.cast(getComponent(ComponentType.getTypeFor(type)));
            return this.componentManager_.getComponent(this, artemis.ComponentType.getTypeFor(type));
        };
        /**
        * Returns a bag of all components this entity has.
        * You need to reset the bag yourself if you intend to fill it more than once.
        *
        * @param fillBag the bag to put the components into.
        * @return the fillBag with the components in.
        */
        Entity.prototype.getComponents = function (fillBag) {
            return this.componentManager_.getComponentsFor(this, fillBag);
        };
        /**
        * Refresh all changes to components for this entity. After adding or
        * removing components, you must call this method. It will update all
        * relevant systems. It is typical to call this after adding components to a
        * newly created entity.
        */
        Entity.prototype.addToWorld = function () {
            this.world_.addEntity(this);
        };
        /**
        * This entity has changed, a component added or deleted.
        */
        Entity.prototype.changedInWorld = function () {
            this.world_.changedEntity(this);
        };
        /**
        * Delete this entity from the world.
        */
        Entity.prototype.deleteFromWorld = function () {
            this.world_.deleteEntity(this);
        };
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        Entity.prototype.enable = function () {
            this.world_.enable(this);
        };
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        Entity.prototype.disable = function () {
            this.world_.disable(this);
        };
        /**
        * Get the UUID for this entity.
        * This UUID is unique per entity (re-used entities get a new UUID).
        * @return uuid instance for this entity.
        */
        Entity.prototype.getUuid = function () {
            return this.uuid;
        };
        /**
        * Returns the world this entity belongs to.
        * @return world of entity.
        */
        Entity.prototype.getWorld = function () {
            return this.world_;
        };
        return Entity;
    })();
    artemis.Entity = Entity;
})(artemis || (artemis = {}));
//# sourceMappingURL=Entity.js.map
var artemis;
(function (artemis) {
    /**
    * Manager.
    *
    * @author Arni Arent
    *
    */
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.initialize = function () {
        };
        Manager.prototype.setWorld = function (world) {
            this.world_ = world;
        };
        Manager.prototype.getWorld = function () {
            return this.world_;
        };
        Manager.prototype.added = function (e) {
        };
        Manager.prototype.changed = function (e) {
        };
        Manager.prototype.deleted = function (e) {
        };
        Manager.prototype.disabled = function (e) {
        };
        Manager.prototype.enabled = function (e) {
        };
        return Manager;
    })();
    artemis.Manager = Manager;
})(artemis || (artemis = {}));
//# sourceMappingURL=Manager.js.map
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var HashMap = artemis.utils.HashMap;
    /**
    * The primary instance for the framework. It contains all the managers.
    *
    * You must use this to create, delete and retrieve entities.
    *
    * It is also important to set the delta each game loop iteration, and initialize before game loop.
    *
    * @author Arni Arent
    *
    */
    var World = (function () {
        function World() {
            this.managers_ = new HashMap();
            this.managersBag_ = new Bag();
            this.systems_ = new HashMap();
            this.systemsBag_ = new Bag();
            this.added_ = new Bag();
            this.changed_ = new Bag();
            this.deleted_ = new Bag();
            this.enable_ = new Bag();
            this.disable_ = new Bag();
            this.cm_ = new artemis.ComponentManager();
            this.setManager(this.cm_);
            this.em_ = new artemis.EntityManager();
            this.setManager(this.em_);
        }
        /**
        * Makes sure all managers systems are initialized in the order they were added.
        */
        World.prototype.initialize = function () {
            for (var i = 0; i < this.managersBag_.size(); i++) {
                this.managersBag_.get(i).initialize();
            }
            for (var i = 0; i < this.systemsBag_.size(); i++) {
                ComponentMapperInitHelper.config(this.systemsBag_.get(i), this);
                this.systemsBag_.get(i).initialize();
            }
        };
        /**
        * Returns a manager that takes care of all the entities in the world.
        * entities of this world.
        *
        * @return entity manager.
        */
        World.prototype.getEntityManager = function () {
            return this.em_;
        };
        /**
        * Returns a manager that takes care of all the components in the world.
        *
        * @return component manager.
        */
        World.prototype.getComponentManager = function () {
            return this.cm_;
        };
        /**
        * Add a manager into this world. It can be retrieved later.
        * World will notify this manager of changes to entity.
        *
        * @param manager to be added
        */
        World.prototype.setManager = function (manager) {
            this.managers_.put(manager.constructor, manager);
            this.managersBag_.add(manager);
            manager.setWorld(this);
            return manager;
        };
        /**
        * Returns a manager of the specified type.
        *
        * @param <T>
        * @param managerType
        *            class type of the manager
        * @return the manager
        */
        World.prototype.getManager = function (managerType) {
            return this.managers_.get(managerType);
        };
        /**
        * Deletes the manager from this world.
        * @param manager to delete.
        */
        World.prototype.deleteManager = function (manager) {
            this.managers_.remove(manager);
            this.managersBag_.remove(manager);
        };
        /**
        * Time since last game loop.
        *
        * @return delta time since last game loop.
        */
        World.prototype.getDelta = function () {
            return this.delta;
        };
        /**
        * You must specify the delta for the game here.
        *
        * @param delta time since last game loop.
        */
        World.prototype.setDelta = function (delta) {
            this.delta = delta;
        };
        /**
        * Adds a entity to this world.
        *
        * @param e entity
        */
        World.prototype.addEntity = function (e) {
            this.added_.add(e);
        };
        /**
        * Ensure all systems are notified of changes to this entity.
        * If you're adding a component to an entity after it's been
        * added to the world, then you need to invoke this method.
        *
        * @param e entity
        */
        World.prototype.changedEntity = function (e) {
            this.changed_.add(e);
        };
        /**
        * Delete the entity from the world.
        *
        * @param e entity
        */
        World.prototype.deleteEntity = function (e) {
            if (!this.deleted_.contains(e)) {
                this.deleted_.add(e);
            }
        };
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        World.prototype.enable = function (e) {
            this.enable_.add(e);
        };
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        World.prototype.disable = function (e) {
            this.disable_.add(e);
        };
        /**
        * Create and return a new or reused entity instance.
        * Will NOT add the entity to the world, use World.addEntity(Entity) for that.
        *
        * @return entity
        */
        World.prototype.createEntity = function () {
            return this.em_.createEntityInstance();
        };
        /**
        * Get a entity having the specified id.
        *
        * @param entityId
        * @return entity
        */
        World.prototype.getEntity = function (entityId) {
            return this.em_.getEntity(entityId);
        };
        /**
        * Gives you all the systems in this world for possible iteration.
        *
        * @return all entity systems in world.
        */
        World.prototype.getSystems = function () {
            return this.systemsBag_;
        };
        /**
        * Adds a system to this world that will be processed by World.process()
        *
        * @param system the system to add.
        * @return the added system.
        */
        // public setSystem(system:T):<T extends EntitySystem> T  {
        // 	return this.setSystem(system, false);
        // }
        /**
        * Will add a system to this world.
        *
        * @param system the system to add.
        * @param passive wether or not this system will be processed by World.process()
        * @return the added system.
        */
        //	public <T extends EntitySystem> T setSystem(T system, boolean passive) {
        World.prototype.setSystem = function (system, passive) {
            if (passive === void 0) { passive = false; }
            system.setWorld(this);
            system.setPassive(passive);
            this.systems_.put(system.constructor, system);
            this.systemsBag_.add(system);
            return system;
        };
        /**
        * Removed the specified system from the world.
        * @param system to be deleted from world.
        */
        World.prototype.deleteSystem = function (system) {
            this.systems_.remove(system.constructor);
            this.systemsBag_.remove(system);
        };
        World.prototype.notifySystems = function (performer, e) {
            for (var i = 0, s = this.systemsBag_.size(); s > i; i++) {
                performer.perform(this.systemsBag_.get(i), e);
            }
        };
        World.prototype.notifyManagers = function (performer, e) {
            for (var a = 0; this.managersBag_.size() > a; a++) {
                performer.perform(this.managersBag_.get(a), e);
            }
        };
        /**
        * Retrieve a system for specified system type.
        *
        * @param type type of system.
        * @return instance of the system in this world.
        */
        World.prototype.getSystem = function (type) {
            return this.systems_.get(type);
        };
        /**
        * Performs an action on each entity.
        * @param entities
        * @param performer
        */
        World.prototype.check = function (entities, performer) {
            if (!entities.isEmpty()) {
                for (var i = 0; entities.size() > i; i++) {
                    var e = entities.get(i);
                    this.notifyManagers(performer, e);
                    this.notifySystems(performer, e);
                }
                entities.clear();
            }
        };
        /**
        * Process all non-passive systems.
        */
        World.prototype.process = function () {
            this.check(this.added_, {
                perform: function (observer, e) {
                    observer.added(e);
                }
            });
            this.check(this.changed_, {
                perform: function (observer, e) {
                    observer.changed(e);
                }
            });
            this.check(this.disable_, {
                perform: function (observer, e) {
                    observer.disabled(e);
                }
            });
            this.check(this.enable_, {
                perform: function (observer, e) {
                    observer.enabled(e);
                }
            });
            this.check(this.deleted_, {
                perform: function (observer, e) {
                    observer.deleted(e);
                }
            });
            this.cm_.clean();
            for (var i = 0; this.systemsBag_.size() > i; i++) {
                var system = this.systemsBag_.get(i);
                if (!system.isPassive()) {
                    system.process();
                }
            }
        };
        /**
        * Retrieves a ComponentMapper instance for fast retrieval of components from entities.
        *
        * @param type of component to get mapper for.
        * @return mapper for specified component type.
        */
        World.prototype.getMapper = function (type) {
            return artemis.ComponentMapper.getFor(type, this);
        };
        return World;
    })();
    artemis.World = World;
    var ComponentMapperInitHelper = (function () {
        function ComponentMapperInitHelper() {
        }
        ComponentMapperInitHelper.config = function (target, world) {
            try {
                var clazz = target.constructor;
                var className = clazz.className || clazz.name;
                for (var fieldIndex in clazz.declaredFields) {
                    var field = clazz.declaredFields[fieldIndex];
                    if (!target.hasOwnProperty(field)) {
                        var componentType = clazz.prototype[field];
                        target[field] = world.getMapper(componentType);
                    }
                }
            }
            catch (e) {
                throw new Error("Error while setting component mappers");
            }
        };
        return ComponentMapperInitHelper;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=World.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var Manager = artemis.Manager;
    var ComponentManager = (function (_super) {
        __extends(ComponentManager, _super);
        function ComponentManager() {
            _super.call(this);
            this.componentsByType_ = new Bag();
            this.deleted_ = new Bag();
        }
        ComponentManager.prototype.initialize = function () {
        };
        ComponentManager.prototype.removeComponentsOfEntity = function (e) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                this.componentsByType_.get(i).set(e.getId(), null);
            }
            componentBits.clear();
        };
        ComponentManager.prototype.addComponent = function (e, type, component) {
            this.componentsByType_.ensureCapacity(type.getIndex());
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            components.set(e.getId(), component);
            e.getComponentBits().set(type.getIndex());
        };
        ComponentManager.prototype.removeComponent = function (e, type) {
            if (e.getComponentBits().get(type.getIndex())) {
                this.componentsByType_.get(type.getIndex()).set(e.getId(), null);
                e.getComponentBits().clear(type.getIndex());
            }
        };
        ComponentManager.prototype.getComponentsByType = function (type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            return components;
        };
        ComponentManager.prototype.getComponent = function (e, type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components != null) {
                return components.get(e.getId());
            }
            return null;
        };
        ComponentManager.prototype.getComponentsFor = function (e, fillBag) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                fillBag.add(this.componentsByType_.get(i).get(e.getId()));
            }
            return fillBag;
        };
        ComponentManager.prototype.deleted = function (e) {
            this.deleted_.add(e);
        };
        ComponentManager.prototype.clean = function () {
            if (this.deleted_.size() > 0) {
                for (var i = 0; this.deleted_.size() > i; i++) {
                    this.removeComponentsOfEntity(this.deleted_.get(i));
                }
                this.deleted_.clear();
            }
        };
        return ComponentManager;
    })(Manager);
    artemis.ComponentManager = ComponentManager;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentManager.js.map
var artemis;
(function (artemis) {
    var HashMap = artemis.utils.HashMap;
    var ComponentType = (function () {
        function ComponentType(type) {
            this.index_ = ComponentType.INDEX++;
            this.type_ = type;
        }
        ComponentType.prototype.getIndex = function () {
            return this.index_;
        };
        ComponentType.prototype.toString = function () {
            var klass = ComponentType;
            return "ComponentType[" + klass.name + "] (" + this.index_ + ")";
            // return "ComponentType["+klass.getSimpleName()+"] ("+this.index_+")";
        };
        ComponentType.getTypeFor = function (c) {
            var type = ComponentType.componentTypes.get(c);
            if (type == null) {
                type = new ComponentType(c);
                ComponentType.componentTypes.put(c, type);
            }
            return type;
        };
        ComponentType.getIndexFor = function (c) {
            return ComponentType.getTypeFor(c).getIndex();
        };
        ComponentType.INDEX = 0;
        ComponentType.componentTypes = new HashMap();
        return ComponentType;
    })();
    artemis.ComponentType = ComponentType;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentType.js.map
var artemis;
(function (artemis) {
    var ComponentType = artemis.ComponentType;
    /**
    * High performance component retrieval from entities. Use this wherever you
    * need to retrieve components from entities often and fast.
    *
    * @author Arni Arent
    *
    * @param <A> the class type of the component
    */
    var ComponentMapper = (function () {
        function ComponentMapper(type, world) {
            this.type_ = ComponentType.getTypeFor(type);
            this.components_ = world.getComponentManager().getComponentsByType(this.type_);
            this.classType_ = type;
        }
        /**
        * Fast but unsafe retrieval of a component for this entity.
        * No bounding checks, so this could throw an ArrayIndexOutOfBoundsExeption,
        * however in most scenarios you already know the entity possesses this component.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        ComponentMapper.prototype.get = function (e) {
            return this.components_.get(e.getId());
        };
        /**
        * Fast and safe retrieval of a component for this entity.
        * If the entity does not have this component then null is returned.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        ComponentMapper.prototype.getSafe = function (e) {
            if (this.components_.isIndexWithinBounds(e.getId())) {
                return this.components_.get(e.getId());
            }
            return null;
        };
        /**
        * Checks if the entity has this type of component.
        * @param e the entity to check
        * @return true if the entity has this component type, false if it doesn't.
        */
        ComponentMapper.prototype.has = function (e) {
            return this.getSafe(e) != null;
        };
        /**
        * Returns a component mapper for this type of components.
        *
        * @param type the type of components this mapper uses.
        * @param world the world that this component mapper should use.
        * @return a new mapper.
        */
        ComponentMapper.getFor = function (type, world) {
            return new ComponentMapper(type, world);
        };
        return ComponentMapper;
    })();
    artemis.ComponentMapper = ComponentMapper;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentMapper.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var BitSet = artemis.utils.BitSet;
    var Manager = artemis.Manager;
    var EntityManager = (function (_super) {
        __extends(EntityManager, _super);
        function EntityManager() {
            _super.call(this);
            this.entities_ = new Bag();
            this.disabled_ = new BitSet();
            this.identifierPool_ = new IdentifierPool();
        }
        EntityManager.prototype.initialize = function () {
        };
        EntityManager.prototype.createEntityInstance = function () {
            var e = new artemis.Entity(this.world_, this.identifierPool_.checkOut());
            this.created_++;
            return e;
        };
        EntityManager.prototype.added = function (e) {
            this.active_++;
            this.added_++;
            this.entities_.set(e.getId(), e);
        };
        EntityManager.prototype.enabled = function (e) {
            this.disabled_.clear(e.getId());
        };
        EntityManager.prototype.disabled = function (e) {
            this.disabled_.set(e.getId());
        };
        EntityManager.prototype.deleted = function (e) {
            this.entities_.set(e.getId(), null);
            this.disabled_.clear(e.getId());
            this.identifierPool_.checkIn(e.getId());
            this.active_--;
            this.deleted_++;
        };
        /**
        * Check if this entity is active.
        * Active means the entity is being actively processed.
        *
        * @param entityId
        * @return true if active, false if not.
        */
        EntityManager.prototype.isActive = function (entityId) {
            return this.entities_.get(entityId) != null;
        };
        /**
        * Check if the specified entityId is enabled.
        *
        * @param entityId
        * @return true if the entity is enabled, false if it is disabled.
        */
        EntityManager.prototype.isEnabled = function (entityId) {
            return !this.disabled_.get(entityId);
        };
        /**
        * Get a entity with this id.
        *
        * @param entityId
        * @return the entity
        */
        EntityManager.prototype.getEntity = function (entityId) {
            return this.entities_.get(entityId);
        };
        /**
        * Get how many entities are active in this world.
        * @return how many entities are currently active.
        */
        EntityManager.prototype.getActiveEntityCount = function () {
            return this.active_;
        };
        /**
        * Get how many entities have been created in the world since start.
        * Note: A created entity may not have been added to the world, thus
        * created count is always equal or larger than added count.
        * @return how many entities have been created since start.
        */
        EntityManager.prototype.getTotalCreated = function () {
            return this.created_;
        };
        /**
        * Get how many entities have been added to the world since start.
        * @return how many entities have been added.
        */
        EntityManager.prototype.getTotalAdded = function () {
            return this.added_;
        };
        /**
        * Get how many entities have been deleted from the world since start.
        * @return how many entities have been deleted since start.
        */
        EntityManager.prototype.getTotalDeleted = function () {
            return this.deleted_;
        };
        return EntityManager;
    })(Manager);
    artemis.EntityManager = EntityManager;
    /*
* Used only internally to generate distinct ids for entities and reuse them.
*/
    var IdentifierPool = (function () {
        function IdentifierPool() {
            this.nextAvailableId_ = 0;
            this.ids_ = new Bag();
        }
        IdentifierPool.prototype.checkOut = function () {
            if (this.ids_.size() > 0) {
                return this.ids_.removeLast();
            }
            return this.nextAvailableId_++;
        };
        IdentifierPool.prototype.checkIn = function (id) {
            this.ids_.add(id);
        };
        return IdentifierPool;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityManager.js.map
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var HashMap = artemis.utils.HashMap;
    /**
    * The most raw entity system. It should not typically be used, but you can create your own
    * entity system handling by extending this. It is recommended that you use the other provided
    * entity system implementations.
    *
    * @author Arni Arent
    *
    */
    var EntitySystem = (function () {
        /**
        * Creates an entity system that uses the specified aspect as a matcher against entities.
        * @param aspect to match against entities
        */
        function EntitySystem(aspect) {
            this.actives_ = new Bag();
            this.aspect_ = aspect;
            this.allSet_ = aspect.getAllSet();
            this.exclusionSet_ = aspect.getExclusionSet();
            this.oneSet_ = aspect.getOneSet();
            this.systemIndex_ = SystemIndexManager.getIndexFor(this.constructor);
            this.dummy_ = this.allSet_.isEmpty() && this.oneSet_.isEmpty(); // This system can't possibly be interested in any entity, so it must be "dummy"
        }
        /**
        * Called before processing of entities begins.
        */
        EntitySystem.prototype.begin = function () { };
        EntitySystem.prototype.process = function () {
            if (this.checkProcessing()) {
                this.begin();
                this.processEntities(this.actives_);
                this.end();
            }
        };
        /**
        * Called after the processing of entities ends.
        */
        EntitySystem.prototype.end = function () { };
        /**
        * Any implementing entity system must implement this method and the logic
        * to process the given entities of the system.
        *
        * @param entities the entities this system contains.
        */
        EntitySystem.prototype.processEntities = function (entities) { };
        /**
        *
        * @return true if the system should be processed, false if not.
        */
        EntitySystem.prototype.checkProcessing = function () {
            return true;
        };
        /**
        * Override to implement code that gets executed when systems are initialized.
        */
        EntitySystem.prototype.initialize = function () { };
        /**
        * Called if the system has received a entity it is interested in, e.g. created or a component was added to it.
        * @param e the entity that was added to this system.
        */
        EntitySystem.prototype.inserted = function (e) { };
        ;
        /**
        * Called if a entity was removed from this system, e.g. deleted or had one of it's components removed.
        * @param e the entity that was removed from this system.
        */
        EntitySystem.prototype.removed = function (e) { };
        ;
        /**
        * Will check if the entity is of interest to this system.
        * @param e entity to check
        */
        EntitySystem.prototype.check = function (e) {
            if (this.dummy_) {
                return;
            }
            var contains = e.getSystemBits().get(this.systemIndex_);
            var interested = true; // possibly interested, let's try to prove it wrong.
            var componentBits = e.getComponentBits();
            // Check if the entity possesses ALL of the components defined in the aspect.
            if (!this.allSet_.isEmpty()) {
                for (var i = this.allSet_.nextSetBit(0); i >= 0; i = this.allSet_.nextSetBit(i + 1)) {
                    if (!componentBits.get(i)) {
                        interested = false;
                        break;
                    }
                }
            }
            // Check if the entity possesses ANY of the exclusion components, if it does then the system is not interested.
            if (!this.exclusionSet_.isEmpty() && interested) {
                interested = !this.exclusionSet_.intersects(componentBits);
            }
            // Check if the entity possesses ANY of the components in the oneSet. If so, the system is interested.
            if (!this.oneSet_.isEmpty()) {
                interested = this.oneSet_.intersects(componentBits);
            }
            if (interested && !contains) {
                this.insertToSystem(e);
            }
            else if (!interested && contains) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.removeFromSystem = function (e) {
            this.actives_.remove(e);
            e.getSystemBits().clear(this.systemIndex_);
            this.removed(e);
        };
        EntitySystem.prototype.insertToSystem = function (e) {
            //console.log('EntitySystem::insertToSystem');
            this.actives_.add(e);
            e.getSystemBits().set(this.systemIndex_);
            this.inserted(e);
        };
        EntitySystem.prototype.added = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.changed = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.deleted = function (e) {
            if (e.getSystemBits().get(this.systemIndex_)) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.disabled = function (e) {
            if (e.getSystemBits().get(this.systemIndex_)) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.enabled = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.setWorld = function (world) {
            this.world = world;
        };
        EntitySystem.prototype.isPassive = function () {
            return this.passive_;
        };
        EntitySystem.prototype.setPassive = function (passive) {
            this.passive_ = passive;
        };
        EntitySystem.prototype.getActives = function () {
            return this.actives_;
        };
        return EntitySystem;
    })();
    artemis.EntitySystem = EntitySystem;
    /**
    * Used to generate a unique bit for each system.
    * Only used internally in EntitySystem.
    */
    var SystemIndexManager = (function () {
        function SystemIndexManager() {
        }
        SystemIndexManager.getIndexFor = function (es) {
            var index = SystemIndexManager.indices.get(es);
            if (index === undefined) {
                index = SystemIndexManager.INDEX++;
                SystemIndexManager.indices.put(es, index);
            }
            return index;
        };
        SystemIndexManager.INDEX = 0;
        SystemIndexManager.indices = new HashMap();
        return SystemIndexManager;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=EntitySystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * If you need to group your entities together, e.g. tanks going into "units" group or explosions into "effects",
        * then use this manager. You must retrieve it using world instance.
        *
        * A entity can be assigned to more than one group.
        *
        * @author Arni Arent
        *
        */
        var GroupManager = (function (_super) {
            __extends(GroupManager, _super);
            function GroupManager() {
                _super.call(this);
                this.entitiesByGroup_ = new HashMap();
                this.groupsByEntity_ = new HashMap();
            }
            GroupManager.prototype.initialize = function () {
            };
            /**
            * Set the group of the entity.
            *
            * @param group group to add the entity into.
            * @param e entity to add into the group.
            */
            GroupManager.prototype.add = function (e, group) {
                var entities = this.entitiesByGroup_.get(group);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByGroup_.put(group, entities);
                }
                entities.add(e);
                var groups = this.groupsByEntity_.get(e);
                if (groups == null) {
                    groups = new Bag();
                    this.groupsByEntity_.put(e, groups);
                }
                groups.add(group);
            };
            /**
            * Remove the entity from the specified group.
            * @param e
            * @param group
            */
            GroupManager.prototype.remove = function (e, group) {
                var entities = this.entitiesByGroup_.get(group);
                if (entities != null) {
                    entities.remove(e);
                }
                var groups = this.groupsByEntity_.get(e);
                if (groups != null) {
                    groups.remove(group);
                }
            };
            GroupManager.prototype.removeFromAllGroups = function (e) {
                var groups = this.groupsByEntity_.get(e);
                if (groups != null) {
                    for (var i = 0; groups.size() > i; i++) {
                        var entities = this.entitiesByGroup_.get(groups.get(i));
                        if (entities != null) {
                            entities.remove(e);
                        }
                    }
                    groups.clear();
                }
            };
            /**
            * Get all entities that belong to the provided group.
            * @param group name of the group.
            * @return read-only bag of entities belonging to the group.
            */
            GroupManager.prototype.getEntities = function (group) {
                var entities = this.entitiesByGroup_.get(group);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByGroup_.put(group, entities);
                }
                return entities;
            };
            /**
            * @param e entity
            * @return the groups the entity belongs to, null if none.
            */
            GroupManager.prototype.getGroups = function (e) {
                return this.groupsByEntity_.get(e);
            };
            /**
            * Checks if the entity belongs to any group.
            * @param e the entity to check.
            * @return true if it is in any group, false if none.
            */
            GroupManager.prototype.isInAnyGroup = function (e) {
                return this.getGroups(e) != null;
            };
            /**
            * Check if the entity is in the supplied group.
            * @param group the group to check in.
            * @param e the entity to check for.
            * @return true if the entity is in the supplied group, false if not.
            */
            GroupManager.prototype.isInGroup = function (e, group) {
                if (group != null) {
                    var groups = this.groupsByEntity_.get(e);
                    for (var i = 0; groups.size() > i; i++) {
                        var g = groups.get(i);
                        if (group === g) {
                            return true;
                        }
                    }
                }
                return false;
            };
            GroupManager.prototype.deleted = function (e) {
                this.removeFromAllGroups(e);
            };
            return GroupManager;
        })(Manager);
        managers.GroupManager = GroupManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=GroupManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * You may sometimes want to specify to which player an entity belongs to.
        *
        * An entity can only belong to a single player at a time.
        *
        * @author Arni Arent
        *
        */
        var PlayerManager = (function (_super) {
            __extends(PlayerManager, _super);
            function PlayerManager() {
                _super.call(this);
                this.playerByEntity_ = new HashMap();
                this.entitiesByPlayer_ = new HashMap();
            }
            PlayerManager.prototype.setPlayer = function (e, player) {
                this.playerByEntity_.put(e, player);
                var entities = this.entitiesByPlayer_.get(player);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByPlayer_.put(player, entities);
                }
                entities.add(e);
            };
            PlayerManager.prototype.getEntitiesOfPlayer = function (player) {
                var entities = this.entitiesByPlayer_.get(player);
                if (entities == null) {
                    entities = new Bag();
                }
                return entities;
            };
            PlayerManager.prototype.removeFromPlayer = function (e) {
                var player = this.playerByEntity_.get(e);
                if (player !== null) {
                    var entities = this.entitiesByPlayer_.get(player);
                    if (entities !== null) {
                        entities.remove(e);
                    }
                }
            };
            PlayerManager.prototype.getPlayer = function (e) {
                return this.playerByEntity_.get(e);
            };
            PlayerManager.prototype.initialize = function () {
            };
            PlayerManager.prototype.deleted = function (e) {
                this.removeFromPlayer(e);
            };
            return PlayerManager;
        })(Manager);
        managers.PlayerManager = PlayerManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=PlayerManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * If you need to tag any entity, use this. A typical usage would be to tag
        * entities such as "PLAYER", "BOSS" or something that is very unique.
        *
        * @author Arni Arent
        *
        */
        var TagManager = (function (_super) {
            __extends(TagManager, _super);
            function TagManager() {
                _super.call(this);
                this.entitiesByTag_ = new HashMap();
                this.tagsByEntity_ = new HashMap();
            }
            TagManager.prototype.register = function (tag, e) {
                this.entitiesByTag_.put(tag, e);
                this.tagsByEntity_.put(e, tag);
            };
            TagManager.prototype.unregister = function (tag) {
                this.tagsByEntity_.remove(this.entitiesByTag_.remove(tag));
            };
            TagManager.prototype.isRegistered = function (tag) {
                return this.entitiesByTag_.containsKey(tag);
            };
            TagManager.prototype.getEntity = function (tag) {
                return this.entitiesByTag_.get(tag);
            };
            TagManager.prototype.getRegisteredTags = function () {
                return this.tagsByEntity_.values();
            };
            TagManager.prototype.deleted = function (e) {
                var removedTag = this.tagsByEntity_.remove(e);
                if (removedTag != null) {
                    this.entitiesByTag_.remove(removedTag);
                }
            };
            TagManager.prototype.initialize = function () {
            };
            return TagManager;
        })(Manager);
        managers.TagManager = TagManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TagManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * Use this class together with PlayerManager.
        *
        * You may sometimes want to create teams in your game, so that
        * some players are team mates.
        *
        * A player can only belong to a single team.
        *
        * @author Arni Arent
        *
        */
        var TeamManager = (function (_super) {
            __extends(TeamManager, _super);
            function TeamManager() {
                _super.call(this);
                this.playersByTeam_ = new HashMap();
                this.teamByPlayer_ = new HashMap();
            }
            TeamManager.prototype.initialize = function () {
            };
            TeamManager.prototype.getTeam = function (player) {
                return this.teamByPlayer_.get(player);
            };
            TeamManager.prototype.setTeam = function (player, team) {
                this.removeFromTeam(player);
                this.teamByPlayer_.put(player, team);
                var players = this.playersByTeam_.get(team);
                if (players == null) {
                    players = new Bag();
                    this.playersByTeam_.put(team, players);
                }
                players.add(player);
            };
            TeamManager.prototype.getPlayers = function (team) {
                return this.playersByTeam_.get(team);
            };
            TeamManager.prototype.removeFromTeam = function (player) {
                var team = this.teamByPlayer_.remove(player);
                if (team != null) {
                    var players = this.playersByTeam_.get(team);
                    if (players != null) {
                        players.remove(player);
                    }
                }
            };
            return TeamManager;
        })(Manager);
        managers.TeamManager = TeamManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TeamManager.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * The purpose of this class is to allow systems to execute at varying intervals.
        *
        * An example system would be an ExpirationSystem, that deletes entities after a certain
        * lifetime. Instead of running a system that decrements a timeLeft value for each
        * entity, you can simply use this system to execute in a future at a time of the shortest
        * lived entity, and then reset the system to run at a time in a future at a time of the
        * shortest lived entity, etc.
        *
        * Another example system would be an AnimationSystem. You know when you have to animate
        * a certain entity, e.g. in 300 milliseconds. So you can set the system to run in 300 ms.
        * to perform the animation.
        *
        * This will save CPU cycles in some scenarios.
        *
        * Implementation notes:
        * In order to start the system you need to override the inserted(Entity e) method,
        * look up the delay time from that entity and offer it to the system by using the
        * offerDelay(float delay) method.
        * Also, when processing the entities you must also call offerDelay(float delay)
        * for all valid entities.
        *
        * @author Arni Arent
        *
        */
        var DelayedEntityProcessingSystem = (function (_super) {
            __extends(DelayedEntityProcessingSystem, _super);
            function DelayedEntityProcessingSystem(aspect) {
                _super.call(this, aspect);
            }
            DelayedEntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    var entity = entities.get(i);
                    this.processDelta(entity, this.acc_);
                    var remaining = this.getRemainingDelay(entity);
                    if (remaining <= 0) {
                        this.processExpired(entity);
                    }
                    else {
                        this.offerDelay(remaining);
                    }
                }
                this.stop();
            };
            DelayedEntityProcessingSystem.prototype.inserted = function (e) {
                var delay = this.getRemainingDelay(e);
                if (delay > 0) {
                    this.offerDelay(delay);
                }
            };
            /**
            * Return the delay until this entity should be processed.
            *
            * @param e entity
            * @return delay
            */
            DelayedEntityProcessingSystem.prototype.getRemainingDelay = function (e) {
                throw Error('Abstract Method');
            };
            DelayedEntityProcessingSystem.prototype.checkProcessing = function () {
                if (this.running_) {
                    this.acc_ += this.world.getDelta();
                    if (this.acc_ >= this.delay_) {
                        return true;
                    }
                }
                return false;
            };
            /**
            * Process a entity this system is interested in. Substract the accumulatedDelta
            * from the entities defined delay.
            *
            * @param e the entity to process.
            * @param accumulatedDelta the delta time since this system was last executed.
            */
            DelayedEntityProcessingSystem.prototype.processDelta = function (e, accumulatedDelta) { };
            DelayedEntityProcessingSystem.prototype.processExpired = function (e) { };
            /**
            * Start processing of entities after a certain amount of delta time.
            *
            * Cancels current delayed run and starts a new one.
            *
            * @param delta time delay until processing starts.
            */
            DelayedEntityProcessingSystem.prototype.restart = function (delay) {
                this.delay_ = delay;
                this.acc_ = 0;
                this.running_ = true;
            };
            /**
            * Restarts the system only if the delay offered is shorter than the
            * time that the system is currently scheduled to execute at.
            *
            * If the system is already stopped (not running) then the offered
            * delay will be used to restart the system with no matter its value.
            *
            * If the system is already counting down, and the offered delay is
            * larger than the time remaining, the system will ignore it. If the
            * offered delay is shorter than the time remaining, the system will
            * restart itself to run at the offered delay.
            *
            * @param delay
            */
            DelayedEntityProcessingSystem.prototype.offerDelay = function (delay) {
                if (!this.running_ || delay < this.getRemainingTimeUntilProcessing()) {
                    this.restart(delay);
                }
            };
            /**
            * Get the initial delay that the system was ordered to process entities after.
            *
            * @return the originally set delay.
            */
            DelayedEntityProcessingSystem.prototype.getInitialTimeDelay = function () {
                return this.delay_;
            };
            /**
            * Get the time until the system is scheduled to run at.
            * Returns zero (0) if the system is not running.
            * Use isRunning() before checking this value.
            *
            * @return time when system will run at.
            */
            DelayedEntityProcessingSystem.prototype.getRemainingTimeUntilProcessing = function () {
                if (this.running_) {
                    return this.delay_ - this.acc_;
                }
                return 0;
            };
            /**
            * Check if the system is counting down towards processing.
            *
            * @return true if it's counting down, false if it's not running.
            */
            DelayedEntityProcessingSystem.prototype.isRunning = function () {
                return this.running_;
            };
            /**
            * Stops the system from running, aborts current countdown.
            * Call offerDelay or restart to run it again.
            */
            DelayedEntityProcessingSystem.prototype.stop = function () {
                this.running_ = false;
                this.acc_ = 0;
            };
            return DelayedEntityProcessingSystem;
        })(EntitySystem);
        systems.DelayedEntityProcessingSystem = DelayedEntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=DelayedEntityProcessingSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * A typical entity system. Use this when you need to process entities possessing the
        * provided component types.
        *
        * @author Arni Arent
        *
        */
        var EntityProcessingSystem = (function (_super) {
            __extends(EntityProcessingSystem, _super);
            function EntityProcessingSystem(aspect) {
                _super.call(this, aspect);
            }
            /**
            * Process a entity this system is interested in.
            * @param e the entity to process.
            */
            EntityProcessingSystem.prototype.processEach = function (e) {
            };
            EntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    this.processEach(entities.get(i));
                }
            };
            EntityProcessingSystem.prototype.checkProcessing = function () {
                return true;
            };
            return EntityProcessingSystem;
        })(EntitySystem);
        systems.EntityProcessingSystem = EntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityProcessingSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * A system that processes entities at a interval in milliseconds.
        * A typical usage would be a collision system or physics system.
        *
        * @author Arni Arent
        *
        */
        var IntervalEntitySystem = (function (_super) {
            __extends(IntervalEntitySystem, _super);
            function IntervalEntitySystem(aspect, interval) {
                _super.call(this, aspect);
                this.acc_ = 0;
                this.interval_ = 0;
                this.interval_ = interval;
            }
            IntervalEntitySystem.prototype.checkProcessing = function () {
                this.acc_ += this.world.getDelta();
                if (this.acc_ >= this.interval_) {
                    this.acc_ -= this.interval_;
                    return true;
                }
                return false;
            };
            return IntervalEntitySystem;
        })(EntitySystem);
        systems.IntervalEntitySystem = IntervalEntitySystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=IntervalEntitySystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        var Aspect = artemis.Aspect;
        /**
        * This system has an empty aspect so it processes no entities, but it still gets invoked.
        * You can use this system if you need to execute some game logic and not have to concern
        * yourself about aspects or entities.
        *
        * @author Arni Arent
        *
        */
        var VoidEntitySystem = (function (_super) {
            __extends(VoidEntitySystem, _super);
            function VoidEntitySystem() {
                _super.call(this, Aspect.getEmpty());
            }
            VoidEntitySystem.prototype.processEntities = function (entities) {
                this.processSystem();
            };
            VoidEntitySystem.prototype.processSystem = function () { };
            VoidEntitySystem.prototype.checkProcessing = function () {
                return true;
            };
            return VoidEntitySystem;
        })(EntitySystem);
        systems.VoidEntitySystem = VoidEntitySystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=VoidEntitySystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var IntervalEntitySystem = artemis.systems.IntervalEntitySystem;
        /**
        * If you need to process entities at a certain interval then use this.
        * A typical usage would be to regenerate ammo or health at certain intervals, no need
        * to do that every game loop, but perhaps every 100 ms. or every second.
        *
        * @author Arni Arent
        *
        */
        var IntervalEntityProcessingSystem = (function (_super) {
            __extends(IntervalEntityProcessingSystem, _super);
            function IntervalEntityProcessingSystem(aspect, interval) {
                _super.call(this, aspect, interval);
            }
            /**
            * Process a entity this system is interested in.
            * @param e the entity to process.
            */
            IntervalEntityProcessingSystem.prototype.processEach = function (e) { };
            IntervalEntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    this.processEach(entities.get(i));
                }
            };
            return IntervalEntityProcessingSystem;
        })(IntervalEntitySystem);
        systems.IntervalEntityProcessingSystem = IntervalEntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=IntervalEntityProcessingSystem.js.map
(function (root, factory) {
    if ('function' === typeof define && undefined.amd) {
        define(factory);
    }
    else if ('object' == typeof exports) {
        module.exports = factory();
    }
    else {
        root['artemis'] = factory();
    }
})(this, function () { return artemis; });

var brokenspork;
(function (brokenspork) {
    var core;
    (function (core) {
        var Constants = (function () {
            function Constants() {
            }
            Constants.FRAME_WIDTH = 800;
            Constants.FRAME_HEIGHT = 450;
            Constants.Groups = {
                PLAYER_BULLETS: "player bullets",
                PLAYER_SHIP: "player ship",
                ENEMY_SHIPS: "enemy ships",
                ENEMY_BULLETS: "enemy bullets"
            };
            return Constants;
        })();
        core.Constants = Constants;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Constants.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Bounds = (function (_super) {
            __extends(Bounds, _super);
            function Bounds() {
                _super.apply(this, arguments);
            }
            Bounds.className = 'Bounds';
            return Bounds;
        })(Component);
        components.Bounds = Bounds;
        Bounds.prototype.radius = 0;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Bounds.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var ColorAnimation = (function (_super) {
            __extends(ColorAnimation, _super);
            function ColorAnimation() {
                _super.apply(this, arguments);
            }
            ColorAnimation.className = 'ColorAnimation';
            return ColorAnimation;
        })(Component);
        components.ColorAnimation = ColorAnimation;
        ColorAnimation.prototype.redMin = 0;
        ColorAnimation.prototype.redMax = 0;
        ColorAnimation.prototype.redSpeed = 0;
        ColorAnimation.prototype.redAnimate = false;
        ColorAnimation.prototype.greenMin = 0;
        ColorAnimation.prototype.greenMax = 0;
        ColorAnimation.prototype.greenSpeed = 0;
        ColorAnimation.prototype.greenAnimate = false;
        ColorAnimation.prototype.blueMin = 0;
        ColorAnimation.prototype.blueMax = 0;
        ColorAnimation.prototype.blueSpeed = 0;
        ColorAnimation.prototype.blueAnimate = false;
        ColorAnimation.prototype.alphaMin = 0;
        ColorAnimation.prototype.alphaMax = 0;
        ColorAnimation.prototype.alphaSpeed = 0;
        ColorAnimation.prototype.alphaAnimate = false;
        ColorAnimation.prototype.repeat = false;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ColorAnimation.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Enemy = (function (_super) {
            __extends(Enemy, _super);
            function Enemy() {
                _super.apply(this, arguments);
            }
            Enemy.className = 'Enemy';
            return Enemy;
        })(Component);
        components.Enemy = Enemy;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Enemy.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Expires = (function (_super) {
            __extends(Expires, _super);
            function Expires() {
                _super.apply(this, arguments);
            }
            Expires.className = 'Expires';
            return Expires;
        })(Component);
        components.Expires = Expires;
        Expires.prototype.delay = 0;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Expires.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Health = (function (_super) {
            __extends(Health, _super);
            function Health() {
                _super.apply(this, arguments);
            }
            Health.className = 'Health';
            return Health;
        })(Component);
        components.Health = Health;
        Health.prototype.health = 0;
        Health.prototype.maximumHealth = 0;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Health.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var ParallaxStar = (function (_super) {
            __extends(ParallaxStar, _super);
            function ParallaxStar() {
                _super.apply(this, arguments);
            }
            ParallaxStar.className = 'ParallaxStar';
            return ParallaxStar;
        })(Component);
        components.ParallaxStar = ParallaxStar;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ParallaxStar.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player() {
                _super.apply(this, arguments);
            }
            Player.className = 'Player';
            return Player;
        })(Component);
        components.Player = Player;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Player.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Position = (function (_super) {
            __extends(Position, _super);
            function Position() {
                _super.apply(this, arguments);
            }
            Position.className = 'Position';
            return Position;
        })(Component);
        components.Position = Position;
        Position.prototype.x = 0;
        Position.prototype.y = 0;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Position.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var ScaleAnimation = (function (_super) {
            __extends(ScaleAnimation, _super);
            function ScaleAnimation() {
                _super.apply(this, arguments);
            }
            ScaleAnimation.className = 'ScaleAnimation';
            return ScaleAnimation;
        })(Component);
        components.ScaleAnimation = ScaleAnimation;
        ScaleAnimation.prototype.min = 0;
        ScaleAnimation.prototype.max = 0;
        ScaleAnimation.prototype.speed = 0;
        ScaleAnimation.prototype.repeat = false;
        ScaleAnimation.prototype.active = false;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ScaleAnimation.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        (function (EFFECT) {
            EFFECT[EFFECT["PEW"] = 0] = "PEW";
            EFFECT[EFFECT["ASPLODE"] = 1] = "ASPLODE";
            EFFECT[EFFECT["SMALLASPLODE"] = 2] = "SMALLASPLODE";
        })(components.EFFECT || (components.EFFECT = {}));
        var EFFECT = components.EFFECT;
        ;
        var SoundEffect = (function (_super) {
            __extends(SoundEffect, _super);
            function SoundEffect() {
                _super.apply(this, arguments);
            }
            SoundEffect.className = 'SoundEffect';
            return SoundEffect;
        })(Component);
        components.SoundEffect = SoundEffect;
        SoundEffect.prototype.effect = EFFECT.PEW;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SoundEffect.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        (function (Layer) {
            Layer[Layer["DEFAULT"] = 0] = "DEFAULT";
            Layer[Layer["BACKGROUND"] = 1] = "BACKGROUND";
            Layer[Layer["ACTORS_1"] = 2] = "ACTORS_1";
            Layer[Layer["ACTORS_2"] = 3] = "ACTORS_2";
            Layer[Layer["ACTORS_3"] = 4] = "ACTORS_3";
            Layer[Layer["PARTICLES"] = 5] = "PARTICLES";
        })(components.Layer || (components.Layer = {}));
        var Layer = components.Layer;
        ;
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            // public int getLayerId() {
            // 	return ordinal();
            // }
            function Sprite() {
                _super.call(this);
                this.sprite_ = new cc.Sprite();
            }
            Object.defineProperty(Sprite.prototype, "name", {
                get: function () { return this.name_; },
                set: function (value) {
                    this.name_ = value;
                    this.sprite_.initWithSpriteFrameName(value + ".png");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "scaleX", {
                get: function () { return this.sprite_.getScaleX(); },
                set: function (value) { this.sprite_.setScaleX(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "scaleY", {
                get: function () { return this.sprite_.getScaleY(); },
                set: function (value) { this.sprite_.setScaleY(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "rotation", {
                get: function () { return this.sprite_.getRotation(); },
                set: function (value) { this.sprite_.setRotation(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "r", {
                get: function () { return this.r_; },
                set: function (value) {
                    this.r_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "g", {
                get: function () { return this.g_; },
                set: function (value) {
                    this.g_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "b", {
                get: function () { return this.b_; },
                set: function (value) {
                    this.b_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "a", {
                get: function () { return this.a_; },
                set: function (value) {
                    this.a_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_, this.a_));
                },
                enumerable: true,
                configurable: true
            });
            Sprite.className = 'Sprite';
            return Sprite;
        })(Component);
        components.Sprite = Sprite;
        Sprite.prototype.layer = Layer.DEFAULT;
        Sprite.prototype.name_ = '';
        Sprite.prototype.scaleX_ = 1;
        Sprite.prototype.scaleY_ = 1;
        Sprite.prototype.rotation_ = 0;
        Sprite.prototype.r_ = 255;
        Sprite.prototype.g_ = 255;
        Sprite.prototype.b_ = 255;
        Sprite.prototype.a_ = 255;
        Sprite.prototype.sprite_ = null;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Sprite.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Velocity = (function (_super) {
            __extends(Velocity, _super);
            function Velocity() {
                _super.apply(this, arguments);
            }
            Velocity.className = 'Velocity';
            return Velocity;
        })(Component);
        components.Velocity = Velocity;
        Velocity.prototype.vectorX = 0;
        Velocity.prototype.vectorY = 0;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Velocity.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Bag = artemis.utils.Bag;
        var Bounds = brokenspork.components.Bounds;
        var Expires = brokenspork.components.Expires;
        var Health = brokenspork.components.Health;
        var Position = brokenspork.components.Position;
        var Constants = brokenspork.core.Constants;
        var EntityFactory = brokenspork.core.EntityFactory;
        var Mapper = artemis.annotations.Mapper;
        var EntitySystem = artemis.EntitySystem;
        var Aspect = artemis.Aspect;
        var GroupManager = artemis.managers.GroupManager;
        var CollisionSystem = (function (_super) {
            __extends(CollisionSystem, _super);
            function CollisionSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Bounds));
                this.game = game;
            }
            CollisionSystem.prototype.initialize = function () {
                var self = this;
                this.collisionPairs = new Bag();
                this.collisionPairs.add(new CollisionPair(this, Constants.Groups.PLAYER_BULLETS, Constants.Groups.ENEMY_SHIPS, {
                    handleCollision: function (bullet, ship) {
                        var bp = self.pm.get(bullet);
                        EntityFactory.createSmallExplosion(self.game, self.world, bp.x, bp.y).addToWorld();
                        for (var i = 0; 4 > i; i++)
                            EntityFactory.createParticle(self.game, self.world, bp.x, bp.y).addToWorld();
                        //TODO: calling bullet.deleteFromWorld() was causing null pointer exceptions in ExpiringSystem and CollisionStstem because it did not exist anymore. 
                        //TODO: This did not happen in vanilla artemis.
                        //TODO: is this a Is this a bug in artemis-odb's DelayedEntityProcessingSystem?
                        bullet.deleteFromWorld();
                        //Expires bulletExpires = ex.get(bullet);
                        //if(bulletExpires != null) {
                        //    bulletExpires.delay = -1;
                        //}
                        var health = self.hm.get(ship);
                        var position = self.pm.get(ship);
                        health.health -= 1;
                        if (health.health < 0) {
                            health.health = 0;
                            ship.deleteFromWorld();
                            EntityFactory.createBigExplosion(self.game, self.world, position.x, position.y).addToWorld();
                        }
                    }
                }));
            };
            CollisionSystem.prototype.processEntities = function (entities) {
                for (var i = 0; this.collisionPairs.size() > i; i++) {
                    this.collisionPairs.get(i).checkForCollisions();
                }
            };
            CollisionSystem.prototype.checkProcessing = function () {
                return true;
            };
            __decorate([
                Mapper(Position)
            ], CollisionSystem.prototype, "pm");
            __decorate([
                Mapper(Bounds)
            ], CollisionSystem.prototype, "bm");
            __decorate([
                Mapper(Health)
            ], CollisionSystem.prototype, "hm");
            __decorate([
                Mapper(Expires)
            ], CollisionSystem.prototype, "ex");
            return CollisionSystem;
        })(EntitySystem);
        systems.CollisionSystem = CollisionSystem;
        var CollisionPair = (function () {
            function CollisionPair(cs, group1, group2, handler) {
                this.groupEntitiesA = cs.world.getManager(GroupManager).getEntities(group1);
                this.groupEntitiesB = cs.world.getManager(GroupManager).getEntities(group2);
                this.handler = handler;
                this.cs = cs;
            }
            CollisionPair.prototype.checkForCollisions = function () {
                for (var a = 0; this.groupEntitiesA.size() > a; a++) {
                    for (var b = 0; this.groupEntitiesB.size() > b; b++) {
                        var entityA = this.groupEntitiesA.get(a);
                        var entityB = this.groupEntitiesB.get(b);
                        if (this.collisionExists(entityA, entityB)) {
                            this.handler.handleCollision(entityA, entityB);
                        }
                    }
                }
            };
            CollisionPair.prototype.collisionExists = function (e1, e2) {
                if (e1 == null || e2 == null) {
                    return false;
                }
                //NPE!!!
                var p1 = this.cs.pm.get(e1);
                var p2 = this.cs.pm.get(e2);
                var b1 = this.cs.bm.get(e1);
                var b2 = this.cs.bm.get(e2);
                var a = p1.x - p2.x;
                var b = p1.y - p2.y;
                return Math.sqrt(a * a + b * b) - b1.radius < b2.radius;
                //return Utils.distance(p1.x, p1.y, p2.x, p2.y)-b1.radius < b2.radius;
            };
            return CollisionPair;
        })();
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=CollisionSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var ColorAnimation = brokenspork.components.ColorAnimation;
        var Sprite = brokenspork.components.Sprite;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var ColorAnimationSystem = (function (_super) {
            __extends(ColorAnimationSystem, _super);
            function ColorAnimationSystem() {
                _super.call(this, Aspect.getAspectForAll(ColorAnimation, Sprite));
            }
            ColorAnimationSystem.prototype.processEach = function (e) {
                var c = this.cam.get(e);
                var sprite = this.sm.get(e);
                if (c.alphaAnimate) {
                    sprite.a += c.alphaSpeed * this.world.delta;
                    if (sprite.a > c.alphaMax || sprite.a < c.alphaMin) {
                        if (c.repeat) {
                            c.alphaSpeed = -c.alphaSpeed;
                        }
                        else {
                            c.alphaAnimate = false;
                        }
                    }
                }
            };
            __decorate([
                Mapper(ColorAnimation)
            ], ColorAnimationSystem.prototype, "cam");
            __decorate([
                Mapper(Sprite)
            ], ColorAnimationSystem.prototype, "sm");
            return ColorAnimationSystem;
        })(EntityProcessingSystem);
        systems.ColorAnimationSystem = ColorAnimationSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ColorAnimationSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var MathUtils = artemis.utils.MathUtils;
        var Layer = brokenspork.components.Layer;
        var Constants = brokenspork.core.Constants;
        var EntityFactory = brokenspork.core.EntityFactory;
        var VoidEntitySystem = artemis.systems.VoidEntitySystem;
        var Timer = artemis.utils.Timer;
        var EntitySpawningTimerSystem = (function (_super) {
            __extends(EntitySpawningTimerSystem, _super);
            function EntitySpawningTimerSystem(game) {
                var _this = this;
                _super.call(this);
                this.game = game;
                this.timer1 = new Timer(2, true);
                this.timer1.execute = function () {
                    EntityFactory.createEnemyShip(_this.game, _this.world, "enemy1", Layer.ACTORS_3, 10, MathUtils.nextInt(Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 - 200, 0, -40, 20).addToWorld();
                };
                this.timer2 = new Timer(6, true);
                this.timer2.execute = function () {
                    EntityFactory.createEnemyShip(_this.game, _this.world, "enemy2", Layer.ACTORS_2, 20, MathUtils.nextInt(Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 - 100, 0, -30, 40).addToWorld();
                };
                this.timer3 = new Timer(12, true);
                this.timer3.execute = function () {
                    EntityFactory.createEnemyShip(_this.game, _this.world, "enemy3", Layer.ACTORS_1, 60, MathUtils.nextInt(Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 - 50, 0, -20, 70).addToWorld();
                };
            }
            EntitySpawningTimerSystem.prototype.processSystem = function () {
                this.timer1.update(this.world.delta);
                this.timer2.update(this.world.delta);
                this.timer3.update(this.world.delta);
            };
            return EntitySpawningTimerSystem;
        })(VoidEntitySystem);
        systems.EntitySpawningTimerSystem = EntitySpawningTimerSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=EntitySpawningTimerSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Expires = brokenspork.components.Expires;
        var Aspect = artemis.Aspect;
        var DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var ExpiringSystem = (function (_super) {
            __extends(ExpiringSystem, _super);
            function ExpiringSystem() {
                _super.call(this, Aspect.getAspectForAll(Expires));
            }
            ExpiringSystem.prototype.processDelta = function (e, accumulatedDelta) {
                var expires = this.em.get(e);
                expires.delay -= accumulatedDelta;
            };
            ExpiringSystem.prototype.processExpired = function (e) {
                e.deleteFromWorld();
            };
            ExpiringSystem.prototype.getRemainingDelay = function (e) {
                var expires = this.em.get(e);
                return expires.delay;
            };
            __decorate([
                Mapper(Expires)
            ], ExpiringSystem.prototype, "em");
            return ExpiringSystem;
        })(DelayedEntityProcessingSystem);
        systems.ExpiringSystem = ExpiringSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ExpiringSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Health = brokenspork.components.Health;
        var Position = brokenspork.components.Position;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var HealthRenderSystem = (function (_super) {
            __extends(HealthRenderSystem, _super);
            //private batch:SpriteBatch;
            // private OrthographicCamera camera;
            // private BitmapFont font;
            function HealthRenderSystem() {
                _super.call(this, Aspect.getAspectForAll(Position, Health));
            }
            HealthRenderSystem.prototype.initialize = function () {
                // batch = new SpriteBatch();
                // Texture fontTexture = new Texture(Gdx.files.internal("fonts/normal_0.png"));
                // fontTexture.setFilter(TextureFilter.Linear, TextureFilter.MipMapLinearLinear);
                // TextureRegion fontRegion = new TextureRegion(fontTexture);
                // font = new BitmapFont(Gdx.files.internal("fonts/normal.fnt"), fontRegion, false);
                // font.setUseIntegerPositions(false);
            };
            HealthRenderSystem.prototype.begin = function () {
                // batch.setProjectionMatrix(camera.combined);
                // batch.begin();
            };
            //public inserted(e:Entity) {
            //  var c:Sprite = e.getComponentByType(Sprite);
            //  console.log('HealthRenderSystem::inserted', c.name, e.uuid);
            //}
            //protected removed(e:Entity) {
            //  var c:Sprite = e.getComponentByType(Sprite);
            //  console.log('HealthRenderSystem::removed', c.name, e.uuid);
            //}
            HealthRenderSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                var health = this.hm.get(e);
                var percentage = Math.round(health.health / health.maximumHealth * 100);
                //font.draw(batch, percentage+"%", position.x, position.y);
            };
            HealthRenderSystem.prototype.end = function () {
                //batch.end();
            };
            __decorate([
                Mapper(Position)
            ], HealthRenderSystem.prototype, "pm");
            __decorate([
                Mapper(Health)
            ], HealthRenderSystem.prototype, "hm");
            return HealthRenderSystem;
        })(EntityProcessingSystem);
        systems.HealthRenderSystem = HealthRenderSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=HealthRenderSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Position = brokenspork.components.Position;
        var Sprite = brokenspork.components.Sprite;
        var VoidEntitySystem = artemis.systems.VoidEntitySystem;
        var Mapper = artemis.annotations.Mapper;
        // import com.badlogic.gdx.Gdx;
        // import com.badlogic.gdx.graphics.OrthographicCamera;
        // import com.badlogic.gdx.graphics.Texture;
        // import com.badlogic.gdx.graphics.Texture.TextureFilter;
        // import com.badlogic.gdx.graphics.g2d.BitmapFont;
        // import com.badlogic.gdx.graphics.g2d.SpriteBatch;
        // import com.badlogic.gdx.graphics.g2d.TextureAtlas;
        // import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;
        // import com.badlogic.gdx.graphics.g2d.TextureRegion;
        var HudRenderSystem = (function (_super) {
            __extends(HudRenderSystem, _super);
            // private HashMap<String, AtlasRegion> regions;
            // private TextureAtlas textureAtlas;
            // private SpriteBatch batch;
            // private OrthographicCamera camera;
            // private BitmapFont font;
            function HudRenderSystem() {
                _super.call(this);
                // this.camera = camera;
            }
            HudRenderSystem.prototype.initialize = function () {
                // regions = new HashMap<String, AtlasRegion>();
                // textureAtlas = new TextureAtlas("images-packed/pack.atlas");
                // for (AtlasRegion r : textureAtlas.getRegions()) {
                // 	regions.put(r.name, r);
                // }
                // batch = new SpriteBatch();
                // Texture fontTexture = new Texture(Gdx.files.internal("fonts/normal_0.png"));
                // fontTexture.setFilter(TextureFilter.Linear, TextureFilter.MipMapLinearLinear);
                // TextureRegion fontRegion = new TextureRegion(fontTexture);
                // font = new BitmapFont(Gdx.files.internal("fonts/normal.fnt"), fontRegion, false);
                // font.setUseIntegerPositions(false);
            };
            HudRenderSystem.prototype.begin = function () {
                // batch.setProjectionMatrix(camera.combined);
                // batch.begin();
            };
            HudRenderSystem.prototype.processSystem = function () {
                // batch.setColor(1, 1, 1, 1);
                // font.draw(batch, "FPS: " + Gdx.graphics.getFramesPerSecond(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 20);
                // font.draw(batch, "Active entities: " + world.getEntityManager().getActiveEntityCount(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 40);
                // font.draw(batch, "Total created: " + world.getEntityManager().getTotalCreated(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 60);
                // font.draw(batch, "Total deleted: " + world.getEntityManager().getTotalDeleted(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 80);
            };
            HudRenderSystem.prototype.end = function () {
                // batch.end();
            };
            __decorate([
                Mapper(Position)
            ], HudRenderSystem.prototype, "pm");
            __decorate([
                Mapper(Sprite)
            ], HudRenderSystem.prototype, "sm");
            return HudRenderSystem;
        })(VoidEntitySystem);
        systems.HudRenderSystem = HudRenderSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=HudRenderSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Position = brokenspork.components.Position;
        var Velocity = brokenspork.components.Velocity;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var MovementSystem = (function (_super) {
            __extends(MovementSystem, _super);
            //@SuppressWarnings("unchecked")
            function MovementSystem() {
                _super.call(this, Aspect.getAspectForAll(Position, Velocity));
            }
            MovementSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                var velocity = this.vm.get(e);
                if (velocity == null) {
                    return;
                }
                position.x += velocity.vectorX * this.world.delta;
                position.y -= velocity.vectorY * this.world.delta;
            };
            __decorate([
                Mapper(Position)
            ], MovementSystem.prototype, "pm");
            __decorate([
                Mapper(Velocity)
            ], MovementSystem.prototype, "vm");
            return MovementSystem;
        })(EntityProcessingSystem);
        systems.MovementSystem = MovementSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=MovementSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var ParallaxStar = brokenspork.components.ParallaxStar;
        var Position = brokenspork.components.Position;
        var Constants = brokenspork.core.Constants;
        var Aspect = artemis.Aspect;
        var IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var ParallaxStarRepeatingSystem = (function (_super) {
            __extends(ParallaxStarRepeatingSystem, _super);
            function ParallaxStarRepeatingSystem() {
                _super.call(this, Aspect.getAspectForAll(ParallaxStar, Position), 1);
            }
            ParallaxStarRepeatingSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                if (position.y >= Constants.FRAME_HEIGHT) {
                    position.y = 0;
                }
            };
            __decorate([
                Mapper(Position)
            ], ParallaxStarRepeatingSystem.prototype, "pm");
            return ParallaxStarRepeatingSystem;
        })(IntervalEntityProcessingSystem);
        systems.ParallaxStarRepeatingSystem = ParallaxStarRepeatingSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ParallaxStarRepeatingSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Player = brokenspork.components.Player;
        var Position = brokenspork.components.Position;
        var Velocity = brokenspork.components.Velocity;
        var EntityFactory = brokenspork.core.EntityFactory;
        var Aspect = artemis.Aspect;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Constants = brokenspork.core.Constants;
        var PlayerInputSystem = (function (_super) {
            __extends(PlayerInputSystem, _super);
            function PlayerInputSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Velocity, Player));
                this.timeToFire = 0;
                this.game = game;
            }
            PlayerInputSystem.prototype.initialize = function () {
                var _this = this;
                var listener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function (touch, event) {
                        _this.shoot = true;
                        _this.mouseVector = touch.getLocation();
                        return true;
                    },
                    onTouchEnded: function (touch, event) {
                        _this.shoot = false;
                        _this.mouseVector = touch.getLocation();
                    }
                });
                cc.eventManager.addListener(listener, this.game);
            };
            PlayerInputSystem.prototype.processEach = function (e) {
                if (this.mouseVector === undefined)
                    return;
                var position = this.pm.get(e);
                var velocity = this.vm.get(e);
                var destinationX = this.mouseVector.x;
                var destinationY = this.mouseVector.y;
                if (destinationX === undefined || destinationY === undefined)
                    return;
                position.x = this.mouseVector.x / 2;
                position.y = Constants.FRAME_HEIGHT - this.mouseVector.y;
                if (this.shoot) {
                    if (this.timeToFire <= 0) {
                        EntityFactory.createPlayerBullet(this.game, this.world, position.x - 27, position.y + 2).addToWorld();
                        EntityFactory.createPlayerBullet(this.game, this.world, position.x + 27, position.y + 2).addToWorld();
                        this.timeToFire = PlayerInputSystem.FireRate;
                    }
                }
                if (this.timeToFire > 0) {
                    this.timeToFire -= this.world.delta;
                    if (this.timeToFire < 0) {
                        this.timeToFire = 0;
                    }
                }
            };
            PlayerInputSystem.HorizontalThrusters = 300;
            PlayerInputSystem.HorizontalMaxSpeed = 300;
            PlayerInputSystem.VerticalThrusters = 200;
            PlayerInputSystem.VerticalMaxSpeed = 200;
            PlayerInputSystem.FireRate = 0.1;
            __decorate([
                Mapper(Position)
            ], PlayerInputSystem.prototype, "pm");
            __decorate([
                Mapper(Velocity)
            ], PlayerInputSystem.prototype, "vm");
            return PlayerInputSystem;
        })(EntityProcessingSystem);
        systems.PlayerInputSystem = PlayerInputSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=PlayerInputSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Bounds = brokenspork.components.Bounds;
        var Health = brokenspork.components.Health;
        var Position = brokenspork.components.Position;
        var Velocity = brokenspork.components.Velocity;
        var Constants = brokenspork.core.Constants;
        var Aspect = artemis.Aspect;
        var IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var RemoveOffscreenShipsSystem = (function (_super) {
            __extends(RemoveOffscreenShipsSystem, _super);
            //@SuppressWarnings("unchecked")
            function RemoveOffscreenShipsSystem() {
                _super.call(this, Aspect.getAspectForAll(Velocity, Position, Health, Bounds), 5);
            }
            RemoveOffscreenShipsSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                var bounds = this.bm.get(e);
                if (position.y < -Constants.FRAME_HEIGHT / 2 - bounds.radius) {
                    e.deleteFromWorld();
                }
            };
            __decorate([
                Mapper(Position)
            ], RemoveOffscreenShipsSystem.prototype, "pm");
            __decorate([
                Mapper(Bounds)
            ], RemoveOffscreenShipsSystem.prototype, "bm");
            return RemoveOffscreenShipsSystem;
        })(IntervalEntityProcessingSystem);
        systems.RemoveOffscreenShipsSystem = RemoveOffscreenShipsSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=RemoveOffscreenShipsSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var ScaleAnimation = brokenspork.components.ScaleAnimation;
        var Sprite = brokenspork.components.Sprite;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var ScaleAnimationSystem = (function (_super) {
            __extends(ScaleAnimationSystem, _super);
            //@SuppressWarnings("unchecked")
            function ScaleAnimationSystem() {
                _super.call(this, Aspect.getAspectForAll(ScaleAnimation));
            }
            ScaleAnimationSystem.prototype.processEach = function (e) {
                var scaleAnimation = this.sa.get(e);
                if (scaleAnimation.active) {
                    var sprite = this.sm.get(e);
                    sprite.scaleX += scaleAnimation.speed * this.world.delta;
                    sprite.scaleY = sprite.scaleX;
                    if (sprite.scaleX > scaleAnimation.max) {
                        sprite.scaleX = scaleAnimation.max;
                        scaleAnimation.active = false;
                    }
                    else if (sprite.scaleX < scaleAnimation.min) {
                        sprite.scaleX = scaleAnimation.min;
                        scaleAnimation.active = false;
                    }
                }
            };
            __decorate([
                Mapper(ScaleAnimation)
            ], ScaleAnimationSystem.prototype, "sa");
            __decorate([
                Mapper(Sprite)
            ], ScaleAnimationSystem.prototype, "sm");
            return ScaleAnimationSystem;
        })(EntityProcessingSystem);
        systems.ScaleAnimationSystem = ScaleAnimationSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ScaleAnimationSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var SoundEffect = brokenspork.components.SoundEffect;
        var EFFECT = brokenspork.components.EFFECT;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        // import  = badlogic.gdx.Gdx;
        // import  = badlogic.gdx.audio.Sound;
        var SoundEffectSystem = (function (_super) {
            __extends(SoundEffectSystem, _super);
            //@SuppressWarnings("unchecked")
            function SoundEffectSystem() {
                _super.call(this, Aspect.getAspectForAll(SoundEffect));
            }
            // pew:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/pew.wav"));
            // asplode:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/asplode.wav"));
            // smallasplode:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/smallasplode.wav"));
            SoundEffectSystem.prototype.initialize = function () {
            };
            SoundEffectSystem.prototype.processEach = function (e) {
                var soundEffect = this.se.get(e);
                switch (soundEffect.effect) {
                    case EFFECT.PEW:
                        //pew.play();
                        break;
                    case EFFECT.ASPLODE:
                        //asplode.play();
                        break;
                    case EFFECT.SMALLASPLODE:
                        //smallasplode.play();
                        break;
                    default:
                        break;
                }
                e.removeComponentInstance(soundEffect);
                e.changedInWorld();
            };
            __decorate([
                Mapper(SoundEffect)
            ], SoundEffectSystem.prototype, "se");
            return SoundEffectSystem;
        })(EntityProcessingSystem);
        systems.SoundEffectSystem = SoundEffectSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SoundEffectSystem.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var HashMap = artemis.utils.HashMap;
        var Position = brokenspork.components.Position;
        var Sprite = brokenspork.components.Sprite;
        var Aspect = artemis.Aspect;
        var EntitySystem = artemis.EntitySystem;
        var Bag = artemis.utils.Bag;
        var Mapper = artemis.annotations.Mapper;
        var Constants = brokenspork.core.Constants;
        var SpriteRenderSystem = (function (_super) {
            __extends(SpriteRenderSystem, _super);
            function SpriteRenderSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Sprite));
                this.game = game;
            }
            SpriteRenderSystem.prototype.initialize = function () {
                this.regions = new HashMap();
                cc.spriteFrameCache.addSpriteFrames("res/images-packed/pack.plist");
                var textureAtlas = cc.spriteFrameCache;
                for (var name in textureAtlas._spriteFrames) {
                    var r = textureAtlas._spriteFrames[name];
                    this.regions.put(name, r);
                }
                this.regionsByEntity = new Bag();
                this.sortedEntities = new Array();
            };
            SpriteRenderSystem.prototype.checkProcessing = function () {
                return true;
            };
            SpriteRenderSystem.prototype.processEntities = function (entities) {
                for (var i = 0; this.sortedEntities.length > i; i++) {
                    this.processEach(this.sortedEntities[i]);
                }
            };
            SpriteRenderSystem.prototype.processEach = function (e) {
                if (this.pm.has(e)) {
                    var position = this.pm.getSafe(e);
                    var sprite = this.sm.get(e);
                    sprite.sprite_.setPosition(cc.p(position.x * 2, Constants.FRAME_HEIGHT - position.y));
                }
            };
            SpriteRenderSystem.prototype.inserted = function (e) {
                var _this = this;
                var sprite = this.sm.get(e);
                this.regionsByEntity.set(e.getId(), this.regions.get(sprite.name));
                // sortedEntities.add(e);
                this.sortedEntities.push(e);
                this.sortedEntities.sort(function (e1, e2) {
                    var s1 = _this.sm.get(e1);
                    var s2 = _this.sm.get(e2);
                    return s1.layer - s2.layer;
                });
            };
            SpriteRenderSystem.prototype.removed = function (e) {
                var c = e.getComponentByType(Sprite);
                //console.log('SpriteRenderSystem::removed', c.name, e.uuid);
                this.game.removeChild(c.sprite_);
                this.regionsByEntity.set(e.getId(), null);
                var index = this.sortedEntities.indexOf(e);
                if (index != -1) {
                    this.sortedEntities.splice(index, 1);
                }
            };
            __decorate([
                Mapper(Position)
            ], SpriteRenderSystem.prototype, "pm");
            __decorate([
                Mapper(Sprite)
            ], SpriteRenderSystem.prototype, "sm");
            return SpriteRenderSystem;
        })(EntitySystem);
        systems.SpriteRenderSystem = SpriteRenderSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SpriteRenderSystem.js.map
var brokenspork;
(function (brokenspork) {
    var core;
    (function (core) {
        var MathUtils = artemis.utils.MathUtils;
        var Bounds = brokenspork.components.Bounds;
        var ColorAnimation = brokenspork.components.ColorAnimation;
        var Expires = brokenspork.components.Expires;
        var Health = brokenspork.components.Health;
        var ParallaxStar = brokenspork.components.ParallaxStar;
        var Player = brokenspork.components.Player;
        var Position = brokenspork.components.Position;
        var ScaleAnimation = brokenspork.components.ScaleAnimation;
        var SoundEffect = brokenspork.components.SoundEffect;
        var Sprite = brokenspork.components.Sprite;
        var Velocity = brokenspork.components.Velocity;
        var Constants = brokenspork.core.Constants;
        var Layer = brokenspork.components.Layer;
        var EFFECT = brokenspork.components.EFFECT;
        var GroupManager = artemis.managers.GroupManager;
        var EntityFactory = (function () {
            function EntityFactory() {
            }
            EntityFactory.createPlayer = function (game, world, x, y) {
                var e = world.createEntity();
                var position = new Position();
                position.x = x;
                position.y = y;
                e.addComponent(position);
                var sprite = new Sprite();
                sprite.name = "fighter";
                sprite.r = 93;
                sprite.g = 255;
                sprite.b = 129;
                sprite.layer = Layer.ACTORS_3;
                e.addComponent(sprite);
                game.addChild(sprite.sprite_);
                var velocity = new Velocity();
                velocity.vectorX = 0;
                velocity.vectorY = 0;
                e.addComponent(velocity);
                var bounds = new Bounds();
                bounds.radius = 43;
                e.addComponent(bounds);
                e.addComponent(new Player());
                world.getManager(GroupManager).add(e, Constants.Groups.PLAYER_SHIP);
                return e;
            };
            EntityFactory.createPlayerBullet = function (game, world, x, y) {
                var e = world.createEntity();
                var position = new Position();
                position.x = x;
                position.y = y;
                e.addComponent(position);
                var sprite = new Sprite();
                sprite.name = "bullet";
                sprite.layer = Layer.PARTICLES;
                e.addComponent(sprite);
                game.addChild(sprite.sprite_);
                var velocity = new Velocity();
                velocity.vectorY = 800;
                e.addComponent(velocity);
                var bounds = new Bounds();
                bounds.radius = 5;
                e.addComponent(bounds);
                var expires = new Expires();
                expires.delay = 5;
                e.addComponent(expires);
                var sf = new SoundEffect();
                sf.effect = EFFECT.PEW;
                e.addComponent(sf);
                world.getManager(GroupManager).add(e, Constants.Groups.PLAYER_BULLETS);
                return e;
            };
            EntityFactory.createEnemyShip = function (game, world, name, layer, health, x, y, velocityX, velocityY, boundsRadius) {
                var e = world.createEntity();
                var position = new Position();
                position.x = x;
                position.y = y;
                e.addComponent(position);
                var sprite = new Sprite();
                sprite.name = name;
                sprite.r = 255;
                sprite.g = 0;
                sprite.b = 142;
                sprite.layer = layer;
                e.addComponent(sprite);
                game.addChild(sprite.sprite_);
                var velocity = new Velocity();
                velocity.vectorX = velocityX;
                velocity.vectorY = velocityY;
                e.addComponent(velocity);
                var bounds = new Bounds();
                bounds.radius = boundsRadius;
                e.addComponent(bounds);
                var h = new Health();
                h.health = h.maximumHealth = health;
                e.addComponent(h);
                world.getManager(GroupManager).add(e, Constants.Groups.ENEMY_SHIPS);
                return e;
            };
            EntityFactory.createSmallExplosion = function (game, world, x, y) {
                var e = this.createExplosion(game, world, x, y, 0.1);
                var sf = new SoundEffect();
                sf.effect = EFFECT.SMALLASPLODE;
                e.addComponent(sf);
                return e;
            };
            EntityFactory.createBigExplosion = function (game, world, x, y) {
                var e = this.createExplosion(game, world, x, y, 0.5);
                var sf = new SoundEffect();
                sf.effect = EFFECT.ASPLODE;
                e.addComponent(sf);
                return e;
            };
            EntityFactory.createExplosion = function (game, world, x, y, scale) {
                var e = world.createEntity();
                var position = new Position();
                position.x = x;
                position.y = y;
                e.addComponent(position);
                var sprite = new Sprite();
                sprite.name = "explosion";
                sprite.scaleX = sprite.scaleY = scale;
                sprite.r = 255;
                sprite.g = 216;
                sprite.b = 0;
                sprite.a = 128;
                sprite.layer = Layer.PARTICLES;
                e.addComponent(sprite);
                game.addChild(sprite.sprite_);
                var expires = new Expires();
                expires.delay = 0.5;
                e.addComponent(expires);
                var scaleAnimation = new ScaleAnimation();
                scaleAnimation.active = true;
                scaleAnimation.max = scale;
                scaleAnimation.min = scale / 100;
                scaleAnimation.speed = -3.0;
                scaleAnimation.repeat = false;
                e.addComponent(scaleAnimation);
                return e;
            };
            EntityFactory.createStar = function (game, world) {
                var e = world.createEntity();
                var position = new Position();
                //position.x = MathUtils.random(-Constants.FRAME_WIDTH/2, Constants.FRAME_WIDTH/2);
                //position.y = MathUtils.random(-Constants.FRAME_HEIGHT/2, Constants.FRAME_HEIGHT/2);
                position.x = MathUtils.nextInt(Constants.FRAME_WIDTH / 2);
                position.y = MathUtils.nextInt(Constants.FRAME_HEIGHT);
                e.addComponent(position);
                var sprite = new Sprite();
                sprite.name = "particle";
                sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
                sprite.a = MathUtils.random(0.1, 0.5);
                sprite.layer = Layer.BACKGROUND;
                e.addComponent(sprite);
                game.addChild(sprite.sprite_);
                var velocity = new Velocity();
                velocity.vectorY = MathUtils.random(-10, -60);
                e.addComponent(velocity);
                e.addComponent(new ParallaxStar());
                var colorAnimation = new ColorAnimation();
                colorAnimation.alphaAnimate = true;
                colorAnimation.repeat = true;
                colorAnimation.alphaSpeed = MathUtils.random(0.2, 0.7);
                colorAnimation.alphaMin = 0.1;
                colorAnimation.alphaMax = 0.5;
                e.addComponent(colorAnimation);
                return e;
            };
            EntityFactory.createParticle = function (game, world, x, y) {
                var e = world.createEntity();
                var position = new Position();
                position.x = x;
                position.y = y;
                e.addComponent(position);
                var sprite = new Sprite();
                sprite.name = "particle";
                sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
                sprite.r = 255;
                sprite.g = 216;
                sprite.b = 0;
                sprite.a = 1;
                sprite.layer = Layer.PARTICLES;
                e.addComponent(sprite);
                game.addChild(sprite.sprite_);
                var radians = MathUtils.random(2 * Math.PI);
                var magnitude = MathUtils.random(400);
                var velocity = new Velocity();
                velocity.vectorX = magnitude * Math.cos(radians);
                velocity.vectorY = magnitude * Math.sin(radians);
                e.addComponent(velocity);
                var expires = new Expires();
                expires.delay = 1;
                e.addComponent(expires);
                var colorAnimation = new ColorAnimation();
                colorAnimation.alphaAnimate = true;
                colorAnimation.alphaSpeed = -1;
                colorAnimation.alphaMin = 0;
                colorAnimation.alphaMax = 1;
                colorAnimation.repeat = false;
                e.addComponent(colorAnimation);
                return e;
            };
            return EntityFactory;
        })();
        core.EntityFactory = EntityFactory;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=EntityFactory.js.map
var brokenspork;
(function (brokenspork) {
    var core;
    (function (core) {
        var CollisionSystem = brokenspork.systems.CollisionSystem;
        var ColorAnimationSystem = brokenspork.systems.ColorAnimationSystem;
        var EntitySpawningTimerSystem = brokenspork.systems.EntitySpawningTimerSystem;
        var ExpiringSystem = brokenspork.systems.ExpiringSystem;
        var HealthRenderSystem = brokenspork.systems.HealthRenderSystem;
        var HudRenderSystem = brokenspork.systems.HudRenderSystem;
        var MovementSystem = brokenspork.systems.MovementSystem;
        var ParallaxStarRepeatingSystem = brokenspork.systems.ParallaxStarRepeatingSystem;
        var PlayerInputSystem = brokenspork.systems.PlayerInputSystem;
        var RemoveOffscreenShipsSystem = brokenspork.systems.RemoveOffscreenShipsSystem;
        var ScaleAnimationSystem = brokenspork.systems.ScaleAnimationSystem;
        var SoundEffectSystem = brokenspork.systems.SoundEffectSystem;
        var SpriteRenderSystem = brokenspork.systems.SpriteRenderSystem;
        var GroupManager = artemis.managers.GroupManager;
        var Constants = brokenspork.core.Constants;
        var GameScreen = (function () {
            function GameScreen(game) {
                this.game = game;
                this.game = game;
                this.world = new artemis.World();
                this.world.setManager(new GroupManager());
                this.world.setSystem(new MovementSystem());
                this.playerInputSystem = new PlayerInputSystem(game);
                this.world.setSystem(this.playerInputSystem);
                this.world.setSystem(new SoundEffectSystem());
                this.world.setSystem(new CollisionSystem(game));
                this.world.setSystem(new ExpiringSystem());
                this.world.setSystem(new EntitySpawningTimerSystem(game));
                this.world.setSystem(new ParallaxStarRepeatingSystem());
                this.world.setSystem(new ColorAnimationSystem());
                this.world.setSystem(new ScaleAnimationSystem());
                this.world.setSystem(new RemoveOffscreenShipsSystem());
                this.spriteRenderSystem = this.world.setSystem(new SpriteRenderSystem(game), true);
                this.healthRenderSystem = this.world.setSystem(new HealthRenderSystem(), true);
                this.hudRenderSystem = this.world.setSystem(new HudRenderSystem(), true);
                this.world.initialize();
                core.EntityFactory.createPlayer(this.game, this.world, Constants.FRAME_WIDTH / 4, Constants.FRAME_HEIGHT - 80).addToWorld();
                for (var i = 0; 500 > i; i++) {
                    core.EntityFactory.createStar(this.game, this.world).addToWorld();
                }
            }
            GameScreen.prototype.render = function (delta) {
                this.world.setDelta(delta);
                this.world.process();
                this.spriteRenderSystem.process();
                this.healthRenderSystem.process();
                this.hudRenderSystem.process();
            };
            GameScreen.ASPECT_RATIO = Constants.FRAME_WIDTH / Constants.FRAME_HEIGHT;
            return GameScreen;
        })();
        core.GameScreen = GameScreen;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=GameScreen.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var core;
    (function (core) {
        var SpaceshipWarrior = (function (_super) {
            __extends(SpaceshipWarrior, _super);
            /**
             *
             * @constructor
             * @extends {cc.Layer}
             * @param {cc.Scene} scene
             */
            function SpaceshipWarrior(scene) {
                _super.call(this);
                this.scene = scene;
                return new (cc.Layer.extend(this));
            }
            /**
              * Start the menu
              * @return {cc.Scene} the menu scene
              */
            SpaceshipWarrior.start = function () {
                var scene = new cc.Scene();
                scene.addChild(new SpaceshipWarrior(scene));
                return scene;
            };
            SpaceshipWarrior.prototype.ctor = function () {
                this._super();
                this.gameScreen = new core.GameScreen(this);
                //setScreen(gameScreen);
                this.scheduleUpdate();
            };
            SpaceshipWarrior.prototype.update = function (time) {
                this.gameScreen.render(time);
            };
            return SpaceshipWarrior;
        })(CCLayer);
        core.SpaceshipWarrior = SpaceshipWarrior;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SpaceshipWarrior.js.map
(function (root, factory) {
    if ('function' === typeof define && undefined.amd) {
        define(factory);
    }
    else if ('object' == typeof exports) {
        module.exports = factory();
    }
    else {
        root['brokenspork'] = factory();
    }
})(this, function () { return brokenspork; });
