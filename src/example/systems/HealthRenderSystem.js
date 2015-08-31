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
        var Health = brokenspork.components.Health;
        var Position = brokenspork.components.Position;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var HealthRenderSystem = (function (_super) {
            __extends(HealthRenderSystem, _super);
            //private batch:SpriteBatch;
            // private OrthographicCamera camera;
            // private BitmapFont font;
            function HealthRenderSystem() {
                _super.call(this, Aspect.getAspectForAll(Position, Health));
            }
            HealthRenderSystem.prototype.initialize = function () {
                // batch = new SpriteBatch();
                // Texture fontTexture = new Texture(Gdx.files.internal("fonts/normal_0.png"));
                // fontTexture.setFilter(TextureFilter.Linear, TextureFilter.MipMapLinearLinear);
                // TextureRegion fontRegion = new TextureRegion(fontTexture);
                // font = new BitmapFont(Gdx.files.internal("fonts/normal.fnt"), fontRegion, false);
                // font.setUseIntegerPositions(false);
            };
            HealthRenderSystem.prototype.begin = function () {
                // batch.setProjectionMatrix(camera.combined);
                // batch.begin();
            };
            //public inserted(e:Entity) {
            //  var c:Sprite = e.getComponentByType(Sprite);
            //  console.log('HealthRenderSystem::inserted', c.name, e.uuid);
            //}
            //protected removed(e:Entity) {
            //  var c:Sprite = e.getComponentByType(Sprite);
            //  console.log('HealthRenderSystem::removed', c.name, e.uuid);
            //}
            HealthRenderSystem.prototype.processEach = function (e) {
                var position = this.pm.get(e);
                var health = this.hm.get(e);
                var percentage = Math.round(health.health / health.maximumHealth * 100);
                //font.draw(batch, percentage+"%", position.x, position.y);
            };
            HealthRenderSystem.prototype.end = function () {
                //batch.end();
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
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=HealthRenderSystem.js.map