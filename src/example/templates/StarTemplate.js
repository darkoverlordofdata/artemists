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
    var templates;
    (function (templates) {
        var MathUtils = artemis.utils.MathUtils;
        var Position = example.components.Position;
        var Sprite = example.components.Sprite;
        var Velocity = example.components.Velocity;
        var ParallaxStar = example.components.ParallaxStar;
        var ColorAnimation = example.components.ColorAnimation;
        var Layer = example.components.Layer;
        var EntitySystem = artemis.EntitySystem;
        var Constants = example.core.Constants;
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var StarTemplate = (function () {
            function StarTemplate() {
            }
            StarTemplate.prototype.buildEntity = function (entity, world) {
                var x = MathUtils.nextInt(Constants.FRAME_WIDTH / 2);
                var y = MathUtils.nextInt(Constants.FRAME_HEIGHT);
                entity.addComponent(Position, x, y);
                entity.addComponent(Velocity, 0, MathUtils.random(-10, -60));
                entity.addComponent(ParallaxStar);
                entity.addComponent(Sprite, 'particle', cc.color(255, 216, 0, 255), function (sprite) {
                    sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
                    sprite.a = MathUtils.random(127);
                    sprite.layer = Layer.BACKGROUND;
                    sprite.addTo(EntitySystem.blackBoard.getEntry('game'));
                });
                entity.addComponent(ColorAnimation, function (colorAnimation) {
                    colorAnimation.alphaAnimate = true;
                    colorAnimation.repeat = true;
                    colorAnimation.alphaSpeed = MathUtils.random(0.2, 0.7);
                    colorAnimation.alphaMin = 0;
                    colorAnimation.alphaMax = 255;
                });
                return entity;
            };
            StarTemplate = __decorate([
                EntityTemplate('star')
            ], StarTemplate);
            return StarTemplate;
        })();
        templates.StarTemplate = StarTemplate;
    })(templates = example.templates || (example.templates = {}));
})(example || (example = {}));
//# sourceMappingURL=StarTemplate.js.map