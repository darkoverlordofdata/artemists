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
        var GroupManager = artemis.managers.GroupManager;
        var EntitySystem = artemis.EntitySystem;
        var EntityTemplate = artemis.annotations.EntityTemplate;
        var Position = example.components.Position;
        var Sprite = example.components.Sprite;
        var Velocity = example.components.Velocity;
        var Bounds = example.components.Bounds;
        var Player = example.components.Player;
        var Layer = example.components.Layer;
        var Constants = example.core.Constants;
        var PlayerTemplate = (function () {
            function PlayerTemplate() {
            }
            PlayerTemplate.prototype.buildEntity = function (entity, world) {
                var x = Constants.FRAME_WIDTH / 4;
                var y = Constants.FRAME_HEIGHT - 80;
                entity.addComponent(Position, x, y);
                entity.addComponent(Velocity, 0, 0);
                entity.addComponent(Bounds, 43);
                entity.addComponent(Player);
                entity.addComponent(Sprite, 'fighter', cc.color(93, 255, 129), function (sprite) {
                    sprite.layer = Layer.ACTORS_3;
                    sprite.addTo(EntitySystem.blackBoard.getEntry('game'));
                });
                world.getManager(GroupManager).add(entity, Constants.Groups.PLAYER_SHIP);
                return entity;
            };
            PlayerTemplate = __decorate([
                EntityTemplate('player')
            ], PlayerTemplate);
            return PlayerTemplate;
        })();
        templates.PlayerTemplate = PlayerTemplate;
    })(templates = example.templates || (example.templates = {}));
})(example || (example = {}));
//# sourceMappingURL=PlayerTemplate.js.map