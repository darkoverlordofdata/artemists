module artemis.systems {
  "use strict";

	import ImmutableBag = artemis.utils.ImmutableBag;
	import EntitySystem = artemis.EntitySystem;
	import Aspect = artemis.Aspect;

	/**
	* This system has an empty aspect so it processes no entities, but it still gets invoked.
	* You can use this system if you need to execute some game logic and not have to concern
	* yourself about aspects or entities.
	*
	* @author Arni Arent
	*
	*/
	export class VoidEntitySystem extends EntitySystem {

		constructor() {
			super(Aspect.getEmpty());
		}


		protected processEntities(entities:ImmutableBag<Entity>) {
			this.processSystem();
		}

		protected processSystem() {}


		protected checkProcessing():boolean {
			return true;
		}

	}
}
