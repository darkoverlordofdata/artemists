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
        })(artemis.EntitySystem);
        systems.IntervalEntitySystem = IntervalEntitySystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=IntervalEntitySystem.js.map