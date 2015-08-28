module brokenspork.systems {
	
	import HashMap = artemis.utils.HashMap;
	
	import Position = brokenspork.components.Position;
	import Sprite = brokenspork.components.Sprite;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntitySystem = artemis.EntitySystem;
	import Bag = artemis.utils.Bag;
	import ImmutableBag = artemis.utils.ImmutableBag;
	import Mapper = artemis.annotations.Mapper;
	// import com.badlogic.gdx.Gdx;
	// import com.badlogic.gdx.graphics.OrthographicCamera;
	// import com.badlogic.gdx.graphics.Texture;
	// import com.badlogic.gdx.graphics.Texture.TextureFilter;
	// import com.badlogic.gdx.graphics.g2d.BitmapFont;
	// import com.badlogic.gdx.graphics.g2d.SpriteBatch;
	// import com.badlogic.gdx.graphics.g2d.TextureAtlas;
	// import com.badlogic.gdx.graphics.g2d.TextureAtlas.AtlasRegion;
	// import com.badlogic.gdx.graphics.g2d.TextureRegion;
	
	export class SpriteRenderSystem extends EntitySystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Sprite) sm:ComponentMapper<Sprite>;
	
		// private HashMap<String, AtlasRegion> regions;
		// private TextureAtlas textureAtlas;
		// private SpriteBatch batch;
		// private OrthographicCamera camera;
		// private BitmapFont font;
	
		// private Bag<AtlasRegion> regionsByEntity;
		//private List<Entity> sortedEntities;
	
		//@SuppressWarnings("unchecked")
		constructor() {
			super(Aspect.getAspectForAll(Position, Sprite));
		}
	
		
		public initialize() {
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
		}
	
		
		protected begin() {
			// batch.setProjectionMatrix(camera.combined);
			// batch.begin();
		}
	
		
		protected checkProcessing():boolean {
			return true;
		}
	
		
		public processEntities(entities:ImmutableBag<Entity>) {
			// for (var i = 0; this.sortedEntities.size() > i; i++) {
			// 	process(this.sortedEntities.get(i));
			// }
		}
	
		public processEach(e:Entity) {
			if (this.pm.has(e)) {
				var position:Position = this.pm.getSafe(e);
				var sprite:Sprite = this.sm.get(e);
	
				// AtlasRegion spriteRegion = regionsByEntity.get(e.getId());
				// batch.setColor(sprite.r, sprite.g, sprite.b, sprite.a);
	
				// float posX = position.x - (spriteRegion.getRegionWidth() / 2 * sprite.scaleX);
				// float posY = position.y - (spriteRegion.getRegionHeight() / 2 * sprite.scaleX);
				// batch.draw(spriteRegion, posX, posY, 0, 0, spriteRegion.getRegionWidth(), spriteRegion.getRegionHeight(), sprite.scaleX, sprite.scaleY, sprite.rotation);
				// GdxUtils.drawCentered(batch, spriteRegion, position.x,
				// position.y);
			}
		}
	
		protected end() {
			//batch.end();
		}
	
		
		protected inserted(e:Entity) {
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
		}
	
		
		protected removed(e:Entity) {
			// this.regionsByEntity.set(e.getId(), null);
			// this.sortedEntities.remove(e);
		}
	
	}
}

