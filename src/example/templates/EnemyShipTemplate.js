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
        var Velocity = example.components.Velocity;
        var Bounds = example.components.Bounds;
        var Health = example.components.Health;
        var GroupManager = artemis.managers.GroupManager;
        var EntitySystem = artemis.EntitySystem;
        var Constants = example.core.Constants;
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var EnemyShipTemplate = (function () {
            function EnemyShipTemplate() {
            }
            EnemyShipTemplate.prototype.buildEntity = function (entity, world, name, layer, health, x, y, velocityX, velocityY, boundsRadius) {
                entity.addComponent(Position, x, y);
                entity.addComponent(Velocity, velocityX, velocityY);
                entity.addComponent(Bounds, boundsRadius);
                entity.addComponent(Health, health, health);
                entity.addComponent(Sprite, name, cc.color(255, 0, 142), function (sprite) {
                    sprite.layer = layer;
                    sprite.addTo(EntitySystem.blackBoard.getEntry('game'));
                });
                world.getManager(GroupManager).add(entity, Constants.Groups.ENEMY_SHIPS);
                return entity;
            };
            EnemyShipTemplate = __decorate([
                EntityTemplate('enemy')
            ], EnemyShipTemplate);
            return EnemyShipTemplate;
        })();
        templates.EnemyShipTemplate = EnemyShipTemplate;
    })(templates = example.templates || (example.templates = {}));
})(example || (example = {}));
//# sourceMappingURL=EnemyShipTemplate.js.map