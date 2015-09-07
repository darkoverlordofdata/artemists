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
        var Position = example.components.Position;
        var Sprite = example.components.Sprite;
        var VoidEntitySystem = artemis.systems.VoidEntitySystem;
        var Mapper = artemis.annotations.Mapper;
        var HudRenderSystem = (function (_super) {
            __extends(HudRenderSystem, _super);
            function HudRenderSystem(game) {
                _super.call(this);
                this.game = game;
            }
            HudRenderSystem.prototype.initialize = function () {
                //cc.LabelBMFont
                //
                //this.activeEntities = new cc.LabelBMFont("Active entities: ", "res/fonts/normal.fnt", 200, cc.TEXT_ALIGNMENT_LEFT);
                //this.totalCreated = new cc.LabelBMFont("Total created: ", "res/fonts/normal.fnt", 200, cc.TEXT_ALIGNMENT_LEFT);
                //this.totalDeleted = new cc.LabelBMFont("Total deleted: ", "res/fonts/normal.fnt", 200, cc.TEXT_ALIGNMENT_LEFT);
                //
                //this.activeEntities.setPosition(cc.p(80,140));
                //this.totalCreated.setPosition(cc.p(80, 160));
                //this.totalDeleted.setPosition(cc.p(80, 180));
                //
                //this.game.addChild(this.activeEntities);
                //this.game.addChild(this.totalCreated);
                //this.game.addChild(this.totalDeleted);
            };
            HudRenderSystem.prototype.processSystem = function () {
                //this.activeEntities.setString("Active entities: "+this.world.getEntityManager().getActiveEntityCount());
                //this.totalCreated.setString("Active entities: "+this.world.getEntityManager().getTotalCreated());
                //this.totalDeleted.setString("Active entities: "+this.world.getEntityManager().getTotalDeleted());
            };
            __decorate([
                Mapper(Position)
            ], HudRenderSystem.prototype, "pm");
            __decorate([
                Mapper(Sprite)
            ], HudRenderSystem.prototype, "sm");
            return HudRenderSystem;
        })(VoidEntitySystem);
        systems.HudRenderSystem = HudRenderSystem;
    })(systems = example.systems || (example.systems = {}));
})(example || (example = {}));
//# sourceMappingURL=HudRenderSystem.js.map