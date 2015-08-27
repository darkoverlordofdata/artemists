module brokenspork.systems {
	
	import Position = brokenspork.components.Position;
	import Velocity = brokenspork.components.Velocity;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	
	export class MovementSystem extends EntityProcessingSystem {
		@Mapper Position
		pm:ComponentMapper<Position>;
		@Mapper Velocity
		vm:ComponentMapper<Velocity>;
	
		//@SuppressWarnings("unchecked")
		constructor() {
			super(Aspect.getAspectForAll(Position, Velocity));
		}
	
		
		public process(e:Entity) {
			var position:Position = this.pm.get(e);
			var velocity:Velocity = this.vm.get(e);
			
			if(velocity == null) {
					return;
			}
			position.x += velocity.vectorX*this.world.delta;
			position.y += velocity.vectorY*this.world.delta;
		}
	
	}
}

