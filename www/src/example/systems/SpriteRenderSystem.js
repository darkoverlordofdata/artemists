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
        var Aspect = artemis.Aspect;
        var EntitySystem = artemis.EntitySystem;
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
        var SpriteRenderSystem = (function (_super) {
            __extends(SpriteRenderSystem, _super);
            // private HashMap<String, AtlasRegion> regions;
            // private TextureAtlas textureAtlas;
            // private SpriteBatch batch;
            // private OrthographicCamera camera;
            // private BitmapFont font;
            // private Bag<AtlasRegion> regionsByEntity;
            //private List<Entity> sortedEntities;
            //@SuppressWarnings("unchecked")
            function SpriteRenderSystem() {
                _super.call(this, Aspect.getAspectForAll(Position, Sprite));
            }
            SpriteRenderSystem.prototype.initialize = function () {
                // regions = new HashMap<String, AtlasRegion>();
                // textureAtlas = new TextureAtlas(Gdx.files.internal("images-packed/pack.atlas"));
                // for (AtlasRegion r : textureAtlas.getRegions()) {
                // 	regions.put(r.name, r);
                // }
                // regionsByEntity = new Bag<AtlasRegion>();
                // batch = new SpriteBatch();
                // sortedEntities = new ArrayList<Entity>();
                // Texture fontTexture = new Texture(Gdx.files.internal("fonts/normal_0.png"));
                // fontTexture.setFilter(TextureFilter.Linear, TextureFilter.MipMapLinearLinear);
                // TextureRegion fontRegion = new TextureRegion(fontTexture);
                // font = new BitmapFont(Gdx.files.internal("fonts/normal.fnt"), fontRegion, false);
                // font.setUseIntegerPositions(false);
            };
            SpriteRenderSystem.prototype.begin = function () {
                // batch.setProjectionMatrix(camera.combined);
                // batch.begin();
            };
            SpriteRenderSystem.prototype.checkProcessing = function () {
                return true;
            };
            SpriteRenderSystem.prototype.processEntities = function (entities) {
                // for (var i = 0; this.sortedEntities.size() > i; i++) {
                // 	process(this.sortedEntities.get(i));
                // }
            };
            SpriteRenderSystem.prototype.process = function (e) {
                if (this.pm.has(e)) {
                    var position = this.pm.getSafe(e);
                    var sprite = this.sm.get(e);
                }
            };
            SpriteRenderSystem.prototype.end = function () {
                //batch.end();
            };
            SpriteRenderSystem.prototype.inserted = function (e) {
                // Sprite sprite = sm.get(e);
                // regionsByEntity.set(e.getId(), regions.get(sprite.name));
                // sortedEntities.add(e);
                // Collections.sort(sortedEntities, new Comparator<Entity>() {
                // 	public int compare(Entity e1, Entity e2) {
                // 		Sprite s1 = sm.get(e1);
                // 		Sprite s2 = sm.get(e2);
                // 		return s1.layer.compareTo(s2.layer);
                // 	}
                // });
            };
            SpriteRenderSystem.prototype.removed = function (e) {
                // this.regionsByEntity.set(e.getId(), null);
                // this.sortedEntities.remove(e);
            };
            __decorate([
                Mapper
            ], SpriteRenderSystem.prototype, "Position");
            __decorate([
                Mapper
            ], SpriteRenderSystem.prototype, "Sprite");
            return SpriteRenderSystem;
        })(EntitySystem);
        systems.SpriteRenderSystem = SpriteRenderSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SpriteRenderSystem.js.map