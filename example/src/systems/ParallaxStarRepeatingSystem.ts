module example.systems {
	

	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import Constants = example.core.Constants;
	import PositionComponent = artemis.components.PositionComponent;
	import ParallaxStarComponent = artemis.components.ParallaxStarComponent;
	import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;

	export class ParallaxStarRepeatingSystem extends IntervalEntityProcessingSystem {

		constructor() {
			super(Aspect.getAspectForAll(ParallaxStarComponent, PositionComponent), 1);
		}
	
		
		public processEach(e:Entity) {
			var position:PositionComponent = e.position;

			if (position.y >= Constants.FRAME_HEIGHT) {
        position.y = 0;
      }
		}
	
	}
}

