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
        var ColorAnimation = example.components.ColorAnimation;
        var Expires = example.components.Expires;
        var Layer = example.components.Layer;
        var EntitySystem = artemis.EntitySystem;
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var ParticleTemplate = (function () {
            function ParticleTemplate() {
            }
            ParticleTemplate.prototype.buildEntity = function (entity, world, x, y) {
                var radians = MathUtils.random(2 * Math.PI);
                var magnitude = MathUtils.random(400);
                var velocityX = magnitude * Math.cos(radians);
                var velocityY = magnitude * Math.sin(radians);
                entity.addComponent(Position, x, y);
                entity.addComponent(Velocity, velocityX, velocityY);
                entity.addComponent(Expires, 1);
                entity.addComponent(Sprite, 'particle', cc.color(255, 216, 0, 255), function (sprite) {
                    sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
                    sprite.layer = Layer.PARTICLES;
                    sprite.addTo(EntitySystem.blackBoard.getEntry('game'));
                });
                entity.addComponent(ColorAnimation, function (colorAnimation) {
                    colorAnimation.alphaAnimate = true;
                    colorAnimation.alphaSpeed = -1;
                    colorAnimation.alphaMin = 0;
                    colorAnimation.alphaMax = 1;
                    colorAnimation.repeat = false;
                });
                return entity;
            };
            ParticleTemplate = __decorate([
                EntityTemplate('particle')
            ], ParticleTemplate);
            return ParticleTemplate;
        })();
        templates.ParticleTemplate = ParticleTemplate;
    })(templates = example.templates || (example.templates = {}));
})(example || (example = {}));
//# sourceMappingURL=ParticleTemplate.js.map