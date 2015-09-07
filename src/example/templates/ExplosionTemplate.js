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
    var templates;
    (function (templates) {
        var Position = example.components.Position;
        var Sprite = example.components.Sprite;
        var Expires = example.components.Expires;
        var SoundEffect = example.components.SoundEffect;
        var ScaleAnimation = example.components.ScaleAnimation;
        var Layer = example.components.Layer;
        var EFFECT = example.components.EFFECT;
        var EntitySystem = artemis.EntitySystem;
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var ExplosionTemplate = (function () {
            function ExplosionTemplate() {
            }
            ExplosionTemplate.prototype.buildEntity = function (entity, world, x, y, scale) {
                entity.addComponent(Position, x, y);
                entity.addComponent(Expires, 0.5);
                entity.addComponent(Sprite, 'explosion', cc.color(255, 216, 0, 128), function (sprite) {
                    sprite.scaleX = sprite.scaleY = scale;
                    sprite.layer = Layer.PARTICLES;
                    sprite.addTo(EntitySystem.blackBoard.getEntry('game'));
                });
                entity.addComponent(ScaleAnimation, function (scaleAnimation) {
                    scaleAnimation.active = true;
                    scaleAnimation.max = scale;
                    scaleAnimation.min = scale / 100;
                    scaleAnimation.speed = -3.0;
                    scaleAnimation.repeat = false;
                });
                return entity;
            };
            return ExplosionTemplate;
        })();
        var SmallExplosionTemplate = (function (_super) {
            __extends(SmallExplosionTemplate, _super);
            function SmallExplosionTemplate() {
                _super.apply(this, arguments);
            }
            SmallExplosionTemplate.prototype.buildEntity = function (entity, world, x, y) {
                _super.prototype.buildEntity.call(this, entity, world, x, y, 0.1);
                var sf = new SoundEffect();
                sf.effect = EFFECT.SMALLASPLODE;
                entity.addComponent(sf);
                return entity;
            };
            SmallExplosionTemplate = __decorate([
                EntityTemplate('small')
            ], SmallExplosionTemplate);
            return SmallExplosionTemplate;
        })(ExplosionTemplate);
        templates.SmallExplosionTemplate = SmallExplosionTemplate;
        var BigExplosionTemplate = (function (_super) {
            __extends(BigExplosionTemplate, _super);
            function BigExplosionTemplate() {
                _super.apply(this, arguments);
            }
            BigExplosionTemplate.prototype.buildEntity = function (entity, world, x, y) {
                _super.prototype.buildEntity.call(this, entity, world, x, y, 0.5);
                var sf = new SoundEffect();
                sf.effect = EFFECT.ASPLODE;
                entity.addComponent(sf);
                return entity;
            };
            BigExplosionTemplate = __decorate([
                EntityTemplate('big')
            ], BigExplosionTemplate);
            return BigExplosionTemplate;
        })(ExplosionTemplate);
        templates.BigExplosionTemplate = BigExplosionTemplate;
    })(templates = example.templates || (example.templates = {}));
})(example || (example = {}));
//# sourceMappingURL=ExplosionTemplate.js.map