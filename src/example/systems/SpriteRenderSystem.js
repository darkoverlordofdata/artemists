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
        var HashMap = artemis.utils.HashMap;
        var Position = brokenspork.components.Position;
        var Sprite = brokenspork.components.Sprite;
        var Aspect = artemis.Aspect;
        var EntitySystem = artemis.EntitySystem;
        var Bag = artemis.utils.Bag;
        var Mapper = artemis.annotations.Mapper;
        var Constants = brokenspork.core.Constants;
        var SpriteRenderSystem = (function (_super) {
            __extends(SpriteRenderSystem, _super);
            function SpriteRenderSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Sprite));
                this.game = game;
            }
            SpriteRenderSystem.prototype.initialize = function () {
                this.regions = new HashMap();
                cc.spriteFrameCache.addSpriteFrames("res/images-packed/pack.plist");
                var textureAtlas = cc.spriteFrameCache;
                for (var name in textureAtlas._spriteFrames) {
                    var r = textureAtlas._spriteFrames[name];
                    this.regions.put(name, r);
                }
                this.regionsByEntity = new Bag();
                this.sortedEntities = new Array();
            };
            SpriteRenderSystem.prototype.checkProcessing = function () {
                return true;
            };
            SpriteRenderSystem.prototype.processEntities = function (entities) {
                for (var i = 0; this.sortedEntities.length > i; i++) {
                    this.processEach(this.sortedEntities[i]);
                }
            };
            SpriteRenderSystem.prototype.processEach = function (e) {
                if (this.pm.has(e)) {
                    var position = this.pm.getSafe(e);
                    var sprite = this.sm.get(e);
                    sprite.sprite_.setPosition(cc.p(position.x * 2, Constants.FRAME_HEIGHT - position.y));
                }
            };
            SpriteRenderSystem.prototype.inserted = function (e) {
                var _this = this;
                var sprite = this.sm.get(e);
                this.regionsByEntity.set(e.getId(), this.regions.get(sprite.name));
                // sortedEntities.add(e);
                this.sortedEntities.push(e);
                this.sortedEntities.sort(function (e1, e2) {
                    var s1 = _this.sm.get(e1);
                    var s2 = _this.sm.get(e2);
                    return s1.layer - s2.layer;
                });
            };
            SpriteRenderSystem.prototype.removed = function (e) {
                var c = e.getComponentByType(Sprite);
                //console.log('SpriteRenderSystem::removed', c.name, e.uuid);
                this.game.removeChild(c.sprite_);
                this.regionsByEntity.set(e.getId(), null);
                var index = this.sortedEntities.indexOf(e);
                if (index != -1) {
                    this.sortedEntities.splice(index, 1);
                }
            };
            __decorate([
                Mapper(Position)
            ], SpriteRenderSystem.prototype, "pm");
            __decorate([
                Mapper(Sprite)
            ], SpriteRenderSystem.prototype, "sm");
            return SpriteRenderSystem;
        })(EntitySystem);
        systems.SpriteRenderSystem = SpriteRenderSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SpriteRenderSystem.js.map