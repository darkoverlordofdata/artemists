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
        var Health = example.components.Health;
        var Position = example.components.Position;
        var Sprite = example.components.Sprite;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var Constants = example.core.Constants;
        var HealthRenderSystem = (function (_super) {
            __extends(HealthRenderSystem, _super);
            function HealthRenderSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Health));
                this.game = game;
                this.texts = {};
            }
            HealthRenderSystem.prototype.inserted = function (e) {
                // add a text element to the sprite
                var c = e.getComponentByType(Sprite);
                var b = new cc.LabelBMFont('100%', "res/fonts/normal.fnt");
                b.setScale(1 / 2);
                this.game.addChild(b);
                this.texts[e.uuid] = b;
            };
            HealthRenderSystem.prototype.removed = function (e) {
                // remove the text element from the sprite
                var c = e.getComponentByType(Sprite);
                this.game.removeChild(this.texts[e.uuid]);
                this.texts[e.uuid] = null;
                delete this.texts[e.uuid];
            };
            HealthRenderSystem.prototype.processEach = function (e) {
                // update the text element on the sprite
                if (this.texts[e.uuid]) {
                    var position = this.pm.get(e);
                    var health = this.hm.get(e);
                    var text = this.texts[e.uuid];
                    var percentage = Math.round(health.health / health.maximumHealth * 100);
                    text.setPosition(cc.p(position.x * 2, Constants.FRAME_HEIGHT - position.y));
                    text.setString(percentage + "%");
                }
            };
            __decorate([
                Mapper(Position)
            ], HealthRenderSystem.prototype, "pm");
            __decorate([
                Mapper(Health)
            ], HealthRenderSystem.prototype, "hm");
            return HealthRenderSystem;
        })(EntityProcessingSystem);
        systems.HealthRenderSystem = HealthRenderSystem;
    })(systems = example.systems || (example.systems = {}));
})(example || (example = {}));
//# sourceMappingURL=HealthRenderSystem.js.map