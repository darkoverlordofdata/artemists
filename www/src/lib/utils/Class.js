var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var Class = (function () {
            function Class(obj, name) {
                this.class_ = obj.constructor;
                if (name === null) {
                    this.name = this.class_.name;
                }
                else {
                    this.name = name;
                }
            }
            Class.prototype.getSimpleName = function () {
                return this.name;
            };
            return Class;
        })();
        utils.Class = Class;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Class.js.map