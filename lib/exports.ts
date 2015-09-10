declare var define;
declare var exports;
declare var module;

/**
 * Universal Module Interface
 */
(function (root, factory) {
    /**
     * Are we using requirejs?
     */
    if ('function' === typeof define && define.amd) {
        define(factory);
    }
    /**
     * How about commonjs?
     */
    else if ('object' === typeof exports) {
        module.exports['artemis'] = factory();
    }
    /**
     * fallback to global
     */
    else {
        root['artemis'] = factory();
    }
})(this, function () { return artemis; });
