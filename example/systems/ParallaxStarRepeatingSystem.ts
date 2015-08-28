module brokenspork.systems {
	
	import ParallaxStar = brokenspork.components.ParallaxStar;
	import Position = brokenspork.components.Position;
	import Constants = brokenspork.core.Constants;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
	import Mapper = artemis.annotations.Mapper;
	
	export class ParallaxStarRepeatingSystem extends IntervalEntityProcessingSystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
	
		//@SuppressWarnings("unchecked")
		constructor() {
			super(Aspect.getAspectForAll(ParallaxStar, Position), 1);
		}
	
		
		public processEach(e:Entity) {
			var position:Position = this.pm.get(e);
	
			if (position.y < -Constants.FRAME_HEIGHT / 2) {
				position.y = Constants.FRAME_HEIGHT / 2;
			}
		}
	
	}
}

