module example.systems {
	
	import ParallaxStar = example.components.ParallaxStar;
	import Position = example.components.Position;
	import Constants = example.core.Constants;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
	import Mapper = artemis.annotations.Mapper;
	
	export class ParallaxStarRepeatingSystem extends IntervalEntityProcessingSystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
	
		constructor() {
			super(Aspect.getAspectForAll(ParallaxStar, Position), 1);
		}
	
		
		public processEach(e:Entity) {
			var position:Position = this.pm.get(e);

			if (position.y >= Constants.FRAME_HEIGHT) {
        position.y = 0;
      }
		}
	
	}
}

