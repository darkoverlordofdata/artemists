module brokenspork.systems {
	
	import MathUtils = artemis.utils.MathUtils;
	import Sprite = brokenspork.components.Sprite;
	import Layer = brokenspork.components.Layer;
	import Constants = brokenspork.core.Constants;
	import EntityFactory = brokenspork.core.EntityFactory;
	
	import VoidEntitySystem = artemis.systems.VoidEntitySystem;
	
	import Timer = artemis.utils.Timer;
	
	export class EntitySpawningTimerSystem extends VoidEntitySystem {
	
		private timer1:Timer;
		private timer2:Timer;
		private timer3:Timer;
	
		constructor() {
			super();
			
			this.timer1 = new Timer(2, true);
				
			this.timer1.execute = () => {
				EntityFactory.createEnemyShip(this.world, "enemy1", Layer.ACTORS_3, 10, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 50, 0, -40, 20).addToWorld();
			}
	
			this.timer2 = new Timer(6, true);
				
			this.timer2.execute = () => {
				EntityFactory.createEnemyShip(this.world, "enemy2", Layer.ACTORS_2, 20, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 100, 0, -30, 40).addToWorld();
			}
	
			this.timer3 = new Timer(12, true);
				
			this.timer3.execute = () => {
				EntityFactory.createEnemyShip(this.world, "enemy3", Layer.ACTORS_1, 60, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 200, 0, -20, 70).addToWorld();
			}
		}
	
		
		protected processSystem() {
			this.timer1.update(this.world.delta);
			this.timer2.update(this.world.delta);
			this.timer3.update(this.world.delta);
		}
	
	}
}

