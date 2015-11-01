module example.systems {
	
	import Position = example.components.Position;
	import Velocity = example.components.Velocity;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	import Mapper = artemis.annotations.Mapper;
	
	export class MovementSystem extends EntityProcessingSystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Velocity) vm:ComponentMapper<Velocity>;
	
		//@SuppressWarnings("unchecked")
		constructor() {
			super(Aspect.getAspectForAll(Position, Velocity));
		}
	
		
		public processEach(e:Entity) {
			var position:Position = this.pm.get(e);
			var velocity:Velocity = this.vm.get(e);

			position.x += velocity.vectorX*this.world.delta;
			position.y -= velocity.vectorY*this.world.delta;
		}

	}
}

