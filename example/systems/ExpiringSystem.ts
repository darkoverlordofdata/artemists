module brokenspork.systems {
	
	import Expires = brokenspork.components.Expires;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;
	
	export class ExpiringSystem extends DelayedEntityProcessingSystem {
		@Mapper Expires
		em:ComponentMapper<Expires>;
	
		//@SuppressWarnings("unchecked")
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

