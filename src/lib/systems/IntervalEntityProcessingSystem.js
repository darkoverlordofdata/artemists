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