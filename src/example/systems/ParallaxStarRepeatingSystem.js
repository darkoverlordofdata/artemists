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
var example;
(function (example) {
    var systems;
    (function (systems) {
        var ParallaxStar = example.components.ParallaxStar;
        var Position = example.components.Position;
        var Constants = example.core.Constants;
        var Aspect = artemis.Aspect;
        var IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var ParallaxStarRepeatingSystem = (function (_super) {
            __extends(ParallaxStarRepeatingSystem, _super);
            function ParallaxStarRepeatingSystem() {
                _super.call(this, Aspect.getAspectForAll(ParallaxStar, Position), 1);
            }
            ParallaxStarRepeatingSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                if (position.y >= Constants.FRAME_HEIGHT) {
                    position.y = 0;
                }
            };
            __decorate([
                Mapper(Position)
            ], ParallaxStarRepeatingSystem.prototype, "pm");
            return ParallaxStarRepeatingSystem;
        })(IntervalEntityProcessingSystem);
        systems.ParallaxStarRepeatingSystem = ParallaxStarRepeatingSystem;
    })(systems = example.systems || (example.systems = {}));
})(example || (example = {}));
//# sourceMappingURL=ParallaxStarRepeatingSystem.js.map