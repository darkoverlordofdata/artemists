var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var Bounds = brokenspork.components.Bounds;
        var Health = brokenspork.components.Health;
        var Position = brokenspork.components.Position;
        var Velocity = brokenspork.components.Velocity;
        var Constants = brokenspork.core.Constants;
        var Aspect = artemis.Aspect;
        var IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var RemoveOffscreenShipsSystem = (function (_super) {
            __extends(RemoveOffscreenShipsSystem, _super);
            function RemoveOffscreenShipsSystem() {
                _super.call(this, Aspect.getAspectForAll(Velocity, Position, Health, Bounds), 5);
            }
            RemoveOffscreenShipsSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                var bounds = this.bm.get(e);
                if (position.y < Constants.FRAME_HEIGHT / 2 - bounds.radius) {
                    e.deleteFromWorld();
                }
            };
            __decorate([
                Mapper(Position)
            ], RemoveOffscreenShipsSystem.prototype, "pm");
            __decorate([
                Mapper(Bounds)
            ], RemoveOffscreenShipsSystem.prototype, "bm");
            return RemoveOffscreenShipsSystem;
        })(IntervalEntityProcessingSystem);
        systems.RemoveOffscreenShipsSystem = RemoveOffscreenShipsSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=RemoveOffscreenShipsSystem.js.map