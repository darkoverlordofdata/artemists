module brokenspork.core {
	
	import CollisionSystem = brokenspork.systems.CollisionSystem;
	import ColorAnimationSystem = brokenspork.systems.ColorAnimationSystem;
	import EntitySpawningTimerSystem = brokenspork.systems.EntitySpawningTimerSystem;
	import ExpiringSystem = brokenspork.systems.ExpiringSystem;
	import HealthRenderSystem = brokenspork.systems.HealthRenderSystem;
	import HudRenderSystem = brokenspork.systems.HudRenderSystem;
	import MovementSystem = brokenspork.systems.MovementSystem;
	import ParallaxStarRepeatingSystem = brokenspork.systems.ParallaxStarRepeatingSystem;
	import PlayerInputSystem = brokenspork.systems.PlayerInputSystem;
	import RemoveOffscreenShipsSystem = brokenspork.systems.RemoveOffscreenShipsSystem;
	import ScaleAnimationSystem = brokenspork.systems.ScaleAnimationSystem;
	import SoundEffectSystem = brokenspork.systems.SoundEffectSystem;
	import SpriteRenderSystem = brokenspork.systems.SpriteRenderSystem;
	
	export class GameScreen {
	
		private game:Game;
		private world:World;
	
		private spriteRenderSystem:SpriteRenderSystem;
		private healthRenderSystem:HealthRenderSystem;
		private hudRenderSystem:HudRenderSystem;
		private batch:SpriteBatch;
		private viewport;
		private playerInputSystem:PlayerInputSystem;
	
		private static ASPECT_RATIO = Constants.FRAME_WIDTH / Constants.FRAME_HEIGHT;
	
		constructor(game:Game) {
			//this.batch = new SpriteBatch();
			this.game = game;
			//this.camera = new OrthographicCamera(Constants.FRAME_WIDTH, Constants.FRAME_HEIGHT);
	
			this.world = new artemis.World();
	
			this.world.setManager(new GroupManager());
			this.world.setSystem(new MovementSystem());
			this.playerInputSystem = new PlayerInputSystem(camera, viewport);
			this.world.setSystem(playerInputSystem);
			this.world.setSystem(new SoundEffectSystem());
			this.world.setSystem(new CollisionSystem());
			this.world.setSystem(new ExpiringSystem());
			this.world.setSystem(new EntitySpawningTimerSystem());
			this.world.setSystem(new ParallaxStarRepeatingSystem());
			this.world.setSystem(new ColorAnimationSystem());
			this.world.setSystem(new ScaleAnimationSystem());
			this.world.setSystem(new RemoveOffscreenShipsSystem());
	
			this.spriteRenderSystem = this.world.setSystem(new SpriteRenderSystem(camera, batch), true);
			this.healthRenderSystem = this.world.setSystem(new HealthRenderSystem(camera), true);
			this.hudRenderSystem = this.world.setSystem(new HudRenderSystem(camera), true);
	
			this.world.initialize();
	
			EntityFactory.createPlayer(this.world, 0, 0).addToWorld();
	
			for (var i = 0; 500 > i; i++) {
				EntityFactory.createStar(this.world).addToWorld();
			}
	
		}
	
		public render(delta:number) {
			this.world.setDelta(delta);
			if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
				for (var i = 0; 10 > i; i++) {
					this.world.process();
				}
			}
			this.world.process();
	
			this.spriteRenderSystem.process();
			this.healthRenderSystem.process();
			this.hudRenderSystem.process();
		}
	
		
		// public void resize(int width, int height) {
		// 	// calculate new viewport
		// 	float aspectRatio = (float) width / (float) height;
		// 	float scale = 1f;
		// 	Vector2 crop = new Vector2(0f, 0f);
	
		// 	if (aspectRatio > ASPECT_RATIO) {
		// 		scale = (float) height / (float) Constants.FRAME_HEIGHT;
		// 		crop.x = (width - Constants.FRAME_WIDTH * scale) / 2f;
		// 	} else if (aspectRatio < ASPECT_RATIO) {
		// 		scale = (float) width / (float) Constants.FRAME_WIDTH;
		// 		crop.y = (height - Constants.FRAME_HEIGHT * scale) / 2f;
		// 	} else {
		// 		scale = (float) width / (float) Constants.FRAME_WIDTH;
		// 	}
	
		// 	float w = (float) Constants.FRAME_WIDTH * scale;
		// 	float h = (float) Constants.FRAME_HEIGHT * scale;
		// 	viewport = new Rectangle(crop.x, crop.y, w, h);
		// 	playerInputSystem.setViewport(viewport);
		// }
	
		
		public show() {
		}
	
		
		public hide() {
		}
	
		
		public pause() {
		}
	
		
		public resume() {
		}
	
		
		public dispose() {
		}
	
	}
}

