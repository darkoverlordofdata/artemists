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
        var Position = brokenspork.components.Position;
        var Sprite = brokenspork.components.Sprite;
        var VoidEntitySystem = artemis.systems.VoidEntitySystem;
        var Mapper = artemis.annotations.Mapper;
        // import com.badlogic.gdx.Gdx;
        // import com.badlogic.gdx.graphics.OrthographicCamera;
        // import com.badlogic.gdx.graphics.Texture;
        // import com.badlogic.gdx.graphics.Texture.TextureFilter;
        // import com.badlogic.gdx.graphics.g2d.BitmapFont;
        // import com.badlogic.gdx.graphics.g2d.SpriteBatch;
        // import com.badlogic.gdx.graphics.g2d.TextureAtlas;
        // import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;
        // import com.badlogic.gdx.graphics.g2d.TextureRegion;
        var HudRenderSystem = (function (_super) {
            __extends(HudRenderSystem, _super);
            // private HashMap<String, AtlasRegion> regions;
            // private TextureAtlas textureAtlas;
            // private SpriteBatch batch;
            // private OrthographicCamera camera;
            // private BitmapFont font;
            function HudRenderSystem() {
                _super.call(this);
                // this.camera = camera;
            }
            HudRenderSystem.prototype.initialize = function () {
                // regions = new HashMap<String, AtlasRegion>();
                // textureAtlas = new TextureAtlas("images-packed/pack.atlas");
                // for (AtlasRegion r : textureAtlas.getRegions()) {
                // 	regions.put(r.name, r);
                // }
                // batch = new SpriteBatch();
                // Texture fontTexture = new Texture(Gdx.files.internal("fonts/normal_0.png"));
                // fontTexture.setFilter(TextureFilter.Linear, TextureFilter.MipMapLinearLinear);
                // TextureRegion fontRegion = new TextureRegion(fontTexture);
                // font = new BitmapFont(Gdx.files.internal("fonts/normal.fnt"), fontRegion, false);
                // font.setUseIntegerPositions(false);
            };
            HudRenderSystem.prototype.begin = function () {
                // batch.setProjectionMatrix(camera.combined);
                // batch.begin();
            };
            HudRenderSystem.prototype.processSystem = function () {
                // batch.setColor(1, 1, 1, 1);
                // font.draw(batch, "FPS: " + Gdx.graphics.getFramesPerSecond(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 20);
                // font.draw(batch, "Active entities: " + world.getEntityManager().getActiveEntityCount(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 40);
                // font.draw(batch, "Total created: " + world.getEntityManager().getTotalCreated(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 60);
                // font.draw(batch, "Total deleted: " + world.getEntityManager().getTotalDeleted(), -(Constants.FRAME_WIDTH / 2) + 20, Constants.FRAME_HEIGHT / 2 - 80);
            };
            HudRenderSystem.prototype.end = function () {
                // batch.end();
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
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=HudRenderSystem.js.map