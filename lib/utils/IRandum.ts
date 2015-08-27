/**
 *--------------------------------------------------------------------+
 * IRandum.ts
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
 * A more useful PRNG interface, based on MersenneTwister
 */
interface IRandum {
    /*
     * Generates a random boolean value.
    */

    nextBool();

    /*
     * Generates a random real value from 0.0, inclusive, to 1.0, exclusive.
    */

    nextDouble();

    /*
     * Generates a random int value from 0, inclusive, to max, exclusive.
    */

    nextInt(max);
}
