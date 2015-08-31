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