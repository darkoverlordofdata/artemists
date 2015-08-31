module brokenspork.systems {
	
	import Health = brokenspork.components.Health;
	import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;

	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	import MathUtils = artemis.utils.MathUtils;
	import Mapper = artemis.annotations.Mapper;

	export class HealthRenderSystem extends EntityProcessingSystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Health) hm:ComponentMapper<Health>;
		
		//private batch:SpriteBatch;
		// private OrthographicCamera camera;
		// private BitmapFont font;
		
		public constructor() {
			super(Aspect.getAspectForAll(Position, Health));
		}
		
		
		public initialize() {
			// batch = new SpriteBatch();
			
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

    //public inserted(e:Entity) {
    //  var c:Sprite = e.getComponentByType(Sprite);
    //  console.log('HealthRenderSystem::inserted', c.name, e.uuid);
    //}
    //protected removed(e:Entity) {
    //  var c:Sprite = e.getComponentByType(Sprite);
    //  console.log('HealthRenderSystem::removed', c.name, e.uuid);
    //}

		public processEach(e:Entity) {
			var position:Position = this.pm.get(e);
			var health:Health = this.hm.get(e);
			
			var percentage:number = Math.round(health.health/health.maximumHealth*100);
			//font.draw(batch, percentage+"%", position.x, position.y);
		}


		protected end() {
			//batch.end();
		}
	}
}
