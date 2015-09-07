var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        var Blackboard = (function () {
            function Blackboard() {
                this.intelligence = {};
            }
            Blackboard.prototype.getEntry = function (name) {
                return this.intelligence[name];
            };
            Blackboard.prototype.setEntry = function (name, intel) {
                this.intelligence[name] = intel;
            };
            Blackboard.prototype.removeEntry = function (name) {
                if (this.intelligence[name])
                    delete this.intelligence[name];
            };
            return Blackboard;
        })();
        utils.Blackboard = Blackboard;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Blackboard.js.map