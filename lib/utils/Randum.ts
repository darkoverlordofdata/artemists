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
class Randum implements IRandum {
    /*
     * Generates a random boolean value.
    */

    public nextBool() {
        return ((~~(Math.random() * 32767)) & 1) === 1;
    }

    /*
     * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
    */

    public nextDouble() {
        return Math.random();
    }

    /*
     * Generates a random int value from 0, inclusive, to max, exclusive.
    */

    public nextInt(max) {
        return ~~(Math.random() * max);
    }
}
