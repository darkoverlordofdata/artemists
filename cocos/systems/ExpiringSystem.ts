module example.systems {
	
	import Expires = example.components.Expires;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;
	import Mapper = artemis.annotations.Mapper;
	
	export class ExpiringSystem extends DelayedEntityProcessingSystem {
		@Mapper(Expires) em:ComponentMapper<Expires>;
	
		constructor() {
			super(Aspect.getAspectForAll(Expires));
		}
		
		
		protected processDelta(e:Entity, accumulatedDelta:number) {
			var expires:Expires = this.em.get(e);
			expires.delay -= accumulatedDelta;
		}
	
		
		protected processExpired(e:Entity) {
			e.deleteFromWorld();
		}
		
		
		protected getRemainingDelay(e:Entity):number {
			var expires:Expires = this.em.get(e);
      return expires.delay;

		}
	}
}

