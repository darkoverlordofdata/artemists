/**
 *--------------------------------------------------------------------+
 * MersenneTwister.ts
 *--------------------------------------------------------------------+
 * Copyright DarkOverlordOfData (c) 2014-2015
 *--------------------------------------------------------------------+
 *
 * This file is a part of Alien Zone
 *
 * Alien Zone is free software; you can copy, modify, and distribute
 * it under the terms of the GPLv3 License
 *
 * MersenneTwister:
 *  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 *  All rights reserved.
 *
 *--------------------------------------------------------------------+
 *  An alternative PRNG
 *
 */
var MersenneTwister = (function () {
    function MersenneTwister(seed) {
        if (seed === void 0) { seed = Date.now(); }
        this.mt = null;
        this.mti = MersenneTwister.N + 1;
        this.mt = new Array(MersenneTwister.N);
        for (var i = 0; i < MersenneTwister.N; i++) {
            this.mt[i] = i;
        }
        switch (typeof seed) {
            case "number":
                this.init_genrand(seed);
                break;
            case "object":
                //this.init_by_array(seed, seed.length);
                break;
            default:
                this.init_genrand(Date.now() % MersenneTwister.LOWER_MASK);
        }
    }
    /*
     * Generates a random boolean value.
    */
    MersenneTwister.prototype.nextBool = function () {
        return (this.genrand_int32() & 1) === 1;
    };
    /*
     * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
    */
    MersenneTwister.prototype.nextDouble = function () {
        return this.genrand_res53();
    };
    /*
     * Generates a random int value from 0, inclusive, to max, exclusive.
    */
    MersenneTwister.prototype.nextInt = function (max) {
        return ~~(this.genrand_res53() * max);
    };
    /*
     * initializes mt[N]  a seed
    */
    MersenneTwister.prototype.init_genrand = function (s) {
        this.mt[0] = s & -1;
        this.mti = 1;
        while (this.mti < MersenneTwister.N) {
            this.mt[this.mti] = 1812433253 * (this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)) + this.mti;
            /*
            # See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. #
            # In the previous versions, MSBs of the seed affect   #
            # only MSBs of the array mt[].                        #
            # 2002/01/09 modified by Makoto Matsumoto             #
            */
            this.mt[this.mti] = (this.mt[this.mti] & -1) >>> 0;
            /*
            # for >32 bit machines #
            */
            this.mti++;
        }
    };
    MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
        var i, j, k;
        this.init_genrand(19650218);
        i = 1;
        j = 0;
        k = MersenneTwister.N > key_length ? MersenneTwister.N : key_length;
        while (k > 0) {
            this.mt[i] = (this.mt[i] ^ ((this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) * 1664525)) + init_key[j] + j;
            this.mt[i] &= -1;
            i++;
            j++;
            if (i >= MersenneTwister.N) {
                this.mt[0] = this.mt[MersenneTwister.N - 1];
                i = 1;
            }
            if (j >= key_length) {
                j = 0;
            }
            k--;
        }
        k = MersenneTwister.N - 1;
        while (k > 0) {
            this.mt[i] = (this.mt[i] ^ ((this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)) * 1566083941)) - i;
            this.mt[i] &= -1;
            i++;
            if (i >= MersenneTwister.N) {
                this.mt[0] = this.mt[MersenneTwister.N - 1];
                i = 1;
            }
            k--;
        }
        this.mt[0] = MersenneTwister.UPPER_MASK;
    };
    /*
     * generates a random number on [0,0xffffffff]-interval
    */
    MersenneTwister.prototype.genrand_int32 = function () {
        var kk, mag01, y;
        mag01 = [0, MersenneTwister.MATRIX_A];
        if (this.mti >= MersenneTwister.N) {
            if (this.mti === MersenneTwister.N + 1) {
                this.init_genrand(5489);
            }
            kk = 0;
            while (kk < MersenneTwister.N - MersenneTwister.M) {
                y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
                this.mt[kk] = this.mt[kk + MersenneTwister.M] ^ (y >>> 1) ^ mag01[y & 1];
                kk++;
            }
            while (kk < MersenneTwister.N - 1) {
                y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
                this.mt[kk] = this.mt[kk + (MersenneTwister.M - MersenneTwister.N)] ^ (y >>> 1) ^ mag01[y & 1];
                kk++;
            }
            y = (this.mt[MersenneTwister.N - 1] & MersenneTwister.UPPER_MASK) | (this.mt[0] & MersenneTwister.LOWER_MASK);
            this.mt[MersenneTwister.N - 1] = this.mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ mag01[y & 1];
            this.mti = 0;
        }
        y = this.mt[this.mti++];
        y ^= y >>> 11;
        y ^= (y << 7) & -1658038656;
        y ^= (y << 15) & -272236544;
        y ^= y >>> 18;
        return y >>> 0;
    };
    /*
    * generates a random number on [0,0x7fffffff]-interval
    */
    MersenneTwister.prototype.genrand_int31 = function () {
        return this.genrand_int32() >>> 1;
    };
    /*
     * generates a random number on [0,1]-real-interval
    */
    MersenneTwister.prototype.genrand_real1 = function () {
        return this.genrand_int32() * 2.32830643653869629e-10;
    };
    /*
     * generates a random number on [0,1)-real-interval
    */
    MersenneTwister.prototype.genrand_real2 = function () {
        return this.genrand_int32() * 2.32830643653869629e-10;
    };
    /*
     * generates a random number on (0,1)-real-interval
    */
    MersenneTwister.prototype.genrand_real3 = function () {
        return (this.genrand_int32() + 0.5) * 2.32830643653869629e-10;
    };
    /*
     * generates a random number on [0,1] 53-bit resolution
    */
    MersenneTwister.prototype.genrand_res53 = function () {
        var a, b;
        a = this.genrand_int32() >>> 5;
        b = this.genrand_int32() >>> 6;
        return (a * 67108864.0 + b) * 1.11022302462515654e-16;
    };
    MersenneTwister.N = 624;
    MersenneTwister.M = 397;
    MersenneTwister.MATRIX_A = -1727483681;
    MersenneTwister.UPPER_MASK = -2147483648;
    MersenneTwister.LOWER_MASK = 2147483647;
    return MersenneTwister;
})();
/*
# These real versions are due to Isaku Wada, 2002/01/09 added
*/
/**
 A C-program for MT19937, with initialization improved 2002/1/26.
 Coded by Takuji Nishimura and Makoto Matsumoto.
 Before using, initialize the state by using init_genrand(seed)
 or init_by_array(init_key, key_length).
 Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 All rights reserved.
 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 3. The names of its contributors may not be used to endorse or promote
 products derived from this software without specific prior written
 permission.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 Any feedback is very welcome.
 http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
 email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
 */
//# sourceMappingURL=MersenneTwister.js.map