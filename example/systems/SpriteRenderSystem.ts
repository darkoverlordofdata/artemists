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
	
		private regions:HashMap<String, cc.SpriteFrame>;
		// private TextureAtlas textureAtlas;
		// private SpriteBatch batch;
		// private OrthographicCamera camera;
		private font:cc.LabelBMFont;
	
		private regionsByEntity:Bag<cc.SpriteFrame>;
		private sortedEntities:Array<Entity>;
	
		//@SuppressWarnings("unchecked")
		constructor() {
			super(Aspect.getAspectForAll(Position, Sprite));
		}
	
		
		public initialize() {
			
			this.regions = new HashMap<String, cc.SpriteFrame>();
			cc.spriteFrameCache.addSpriteFrames("res/images-packed/pack.plist");
			
			
			var textureAtlas:any = cc.spriteFrameCache;
			for (var name in textureAtlas._spriteFrames) {
				var r = textureAtlas._spriteFrames[name];
				this.regions.put(name, r);
			}
			this.regionsByEntity = new Bag<cc.SpriteFrame>();
			
			this.sortedEntities = new Array<Entity>();
	
		}
	
		
		protected begin() {
			// batch.setProjectionMatrix(camera.combined);
			// batch.begin();
		}
	
		
		protected checkProcessing():boolean {
			return true;
		}
	
		
		public processEntities(entities:ImmutableBag<Entity>) {
			for (var i = 0; this.sortedEntities.length > i; i++) {
				this.processEach(this.sortedEntities[i]);
			}
		}
	
		public processEach(e:Entity) {
			if (this.pm.has(e)) {
				var position:Position = this.pm.getSafe(e);
				var sprite:Sprite = this.sm.get(e);
				//var spriteRegion:cc.SpriteFrame = this.regionsByEntity.get(e.getId());
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
	
		
		public inserted(e:Entity) {
			var sprite:Sprite = this.sm.get(e);
			this.regionsByEntity.set(e.getId(), this.regions.get(sprite.name));
	
			// sortedEntities.add(e);
			this.sortedEntities.push(e);
			
			this.sortedEntities.sort((e1:Entity, e2:Entity) => {
					var s1:Sprite = this.sm.get(e1);
					var s2:Sprite = this.sm.get(e2);
					return s1.layer - s2.layer;
			});
			
		}
	
		
		protected removed(e:Entity) {
			this.regionsByEntity.set(e.getId(), null);
			var index = this.sortedEntities.indexOf(e);
			if (index != -1) {
				this.sortedEntities.splice(index, 1);
			}
		}
	
	}
}

