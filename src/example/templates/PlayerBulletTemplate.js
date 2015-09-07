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
        /**
         * Position
         * Sprite
         * Velocity
         * Bounds
         * Expires
         * SoundEffect
         */
        var Position = example.components.Position;
        var Sprite = example.components.Sprite;
        var Velocity = example.components.Velocity;
        var Bounds = example.components.Bounds;
        var Expires = example.components.Expires;
        var SoundEffect = example.components.SoundEffect;
        var Layer = example.components.Layer;
        var EFFECT = example.components.EFFECT;
        var GroupManager = artemis.managers.GroupManager;
        var EntitySystem = artemis.EntitySystem;
        var Constants = example.core.Constants;
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var PlayerBulletTemplate = (function () {
            function PlayerBulletTemplate() {
            }
            PlayerBulletTemplate.prototype.buildEntity = function (entity, world, x, y) {
                entity.addComponent(Position, x, y);
                entity.addComponent(Velocity, 0, 800);
                entity.addComponent(Bounds, 5);
                entity.addComponent(Expires, 5);
                entity.addComponent(SoundEffect, EFFECT.PEW);
                entity.addComponent(Sprite, 'bullet', cc.color(255, 255, 255), function (sprite) {
                    sprite.layer = Layer.PARTICLES;
                    sprite.addTo(EntitySystem.blackBoard.getEntry('game'));
                });
                world.getManager(GroupManager).add(entity, Constants.Groups.PLAYER_BULLETS);
                return entity;
            };
            PlayerBulletTemplate = __decorate([
                EntityTemplate('bullet')
            ], PlayerBulletTemplate);
            return PlayerBulletTemplate;
        })();
        templates.PlayerBulletTemplate = PlayerBulletTemplate;
    })(templates = example.templates || (example.templates = {}));
})(example || (example = {}));
//# sourceMappingURL=PlayerBulletTemplate.js.map