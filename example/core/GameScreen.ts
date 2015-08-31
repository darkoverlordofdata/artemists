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
	import World = artemis.World;
	import GroupManager = artemis.managers.GroupManager;
	import Constants = brokenspork.core.Constants;

	export class GameScreen {
	
		private world:World;
	
		private spriteRenderSystem:SpriteRenderSystem;
		private healthRenderSystem:HealthRenderSystem;
		private hudRenderSystem:HudRenderSystem;
		//private batch:SpriteBatch;
		private viewport;
		private playerInputSystem:PlayerInputSystem;
	
		private static ASPECT_RATIO = Constants.FRAME_WIDTH / Constants.FRAME_HEIGHT;
	
		constructor(public game:CCLayer) {
			this.game = game;

			this.world = new artemis.World();
	
			this.world.setManager(new GroupManager());
			this.world.setSystem(new MovementSystem());
			this.playerInputSystem = new PlayerInputSystem(game);
			this.world.setSystem(this.playerInputSystem);
			this.world.setSystem(new SoundEffectSystem());
			this.world.setSystem(new CollisionSystem(game));
			this.world.setSystem(new ExpiringSystem());
			this.world.setSystem(new EntitySpawningTimerSystem(game));
			this.world.setSystem(new ParallaxStarRepeatingSystem());
			this.world.setSystem(new ColorAnimationSystem());
			this.world.setSystem(new ScaleAnimationSystem());
			this.world.setSystem(new RemoveOffscreenShipsSystem());
	
			this.spriteRenderSystem = this.world.setSystem(new SpriteRenderSystem(game), true);
			this.healthRenderSystem = this.world.setSystem(new HealthRenderSystem(), true);
			this.hudRenderSystem = this.world.setSystem(new HudRenderSystem(), true);
	
			this.world.initialize();
	
			EntityFactory.createPlayer(this.game, this.world, Constants.FRAME_WIDTH/4, Constants.FRAME_HEIGHT-80).addToWorld();
	
			for (var i = 0; 500 > i; i++) {
				EntityFactory.createStar(this.game, this.world).addToWorld();
			}
	
		}
	
		public render(delta:number) {
			this.world.setDelta(delta);
			this.world.process();
	
			this.spriteRenderSystem.process();
			this.healthRenderSystem.process();
			this.hudRenderSystem.process();
		}
	
		
	}
}

