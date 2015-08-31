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