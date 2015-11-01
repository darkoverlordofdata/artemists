module example.systems {
	

	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import ExpiresComponent = artemis.components.ExpiresComponent;
	import DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;

	export class ExpiringSystem extends DelayedEntityProcessingSystem {

		constructor() {
			super(Aspect.getAspectForAll(ExpiresComponent));
		}
		
		
		protected processDelta(e:Entity, accumulatedDelta:number) {
			e.expires.delay -= accumulatedDelta;
		}
	
		
		protected processExpired(e:Entity) {
			e.deleteFromWorld();
		}
		
		
		protected getRemainingDelay(e:Entity):number {
      return e.expires.delay;

		}
	}
}

