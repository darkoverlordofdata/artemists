module example.systems {
	
	import MathUtils = artemis.utils.MathUtils;
	import Sprite = example.components.Sprite;
	import Layer = example.components.Layer;
	import Constants = example.core.Constants;

	import VoidEntitySystem = artemis.systems.VoidEntitySystem;
	
	import Timer = artemis.utils.Timer;
	
	export class EntitySpawningTimerSystem extends VoidEntitySystem {
	
		private game:CCLayer;
		private timer1:Timer;
		private timer2:Timer;
		private timer3:Timer;
	
		constructor(game:CCLayer) {
			super();
			this.game = game;
			
			this.timer1 = new Timer(2, true);
				
			this.timer1.execute = () => {
        this.world.createEntityFromTemplate('enemy', "enemy1", Layer.ACTORS_3, 10, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 200, 0, -40, 20).addToWorld();
        //EntityFactory.createEnemyShip(this.game, this.world, "enemy1", Layer.ACTORS_3, 10, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 200, 0, -40, 20).addToWorld();
			};
	
			this.timer2 = new Timer(6, true);
				
			this.timer2.execute = () => {
        this.world.createEntityFromTemplate('enemy', "enemy2", Layer.ACTORS_2, 20, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 100, 0, -30, 40).addToWorld();
				//EntityFactory.createEnemyShip(this.game, this.world, "enemy2", Layer.ACTORS_2, 20, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 100, 0, -30, 40).addToWorld();
			};
	
			this.timer3 = new Timer(12, true);
				
			this.timer3.execute = () => {
        this.world.createEntityFromTemplate('enemy', "enemy3", Layer.ACTORS_1, 60, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 50, 0, -20, 70).addToWorld();
				//EntityFactory.createEnemyShip(this.game, this.world, "enemy3", Layer.ACTORS_1, 60, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 50, 0, -20, 70).addToWorld();
			};
		}
	
		
		protected processSystem() {
			this.timer1.update(this.world.delta);
			this.timer2.update(this.world.delta);
			this.timer3.update(this.world.delta);
		}
	
	}
}

