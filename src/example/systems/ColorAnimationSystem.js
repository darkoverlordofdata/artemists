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
        var ColorAnimation = brokenspork.components.ColorAnimation;
        var Sprite = brokenspork.components.Sprite;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Aspect = artemis.Aspect;
        var ColorAnimationSystem = (function (_super) {
            __extends(ColorAnimationSystem, _super);
            function ColorAnimationSystem() {
                _super.call(this, Aspect.getAspectForAll(ColorAnimation, Sprite));
            }
            ColorAnimationSystem.prototype.processEach = function (e) {
                var c = this.cam.get(e);
                var sprite = this.sm.get(e);
                if (c.alphaAnimate) {
                    sprite.a += c.alphaSpeed * this.world.delta;
                    if (sprite.a > c.alphaMax || sprite.a < c.alphaMin) {
                        if (c.repeat) {
                            c.alphaSpeed = -c.alphaSpeed;
                        }
                        else {
                            c.alphaAnimate = false;
                        }
                    }
                }
            };
            __decorate([
                Mapper(ColorAnimation)
            ], ColorAnimationSystem.prototype, "cam");
            __decorate([
                Mapper(Sprite)
            ], ColorAnimationSystem.prototype, "sm");
            return ColorAnimationSystem;
        })(EntityProcessingSystem);
        systems.ColorAnimationSystem = ColorAnimationSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ColorAnimationSystem.js.map