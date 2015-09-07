module example.systems {
	
	import HashMap = artemis.utils.HashMap;
	
	import Position = example.components.Position;
	import Sprite = example.components.Sprite;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntitySystem = artemis.EntitySystem;
	import Bag = artemis.utils.Bag;
	import ImmutableBag = artemis.utils.ImmutableBag;
	import Mapper = artemis.annotations.Mapper;
	import Constants = example.core.Constants;

	export class SpriteRenderSystem extends EntitySystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Sprite) sm:ComponentMapper<Sprite>;
	
		private regions:HashMap<String, cc.SpriteFrame>;
		private font:cc.LabelBMFont;
	
		private regionsByEntity:Bag<cc.SpriteFrame>;
		private sortedEntities:Array<Entity>;

    private game:CCLayer;

    constructor(game:CCLayer) {
			super(Aspect.getAspectForAll(Position, Sprite));
      this.game = game;
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

        sprite.sprite_.setPosition(cc.p(position.x*2, Constants.FRAME_HEIGHT - position.y));
			}
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
      var c:Sprite = <Sprite> e.getComponentByType(Sprite);
      c.removeFrom(this.game);

			this.regionsByEntity.set(e.getId(), null);
			var index = this.sortedEntities.indexOf(e);
			if (index != -1) {
				this.sortedEntities.splice(index, 1);
			}
		}
	
	}
}

