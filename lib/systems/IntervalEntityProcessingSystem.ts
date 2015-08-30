module artemis.systems {

	import ImmutableBag = artemis.utils.ImmutableBag;
	import IntervalEntitySystem = artemis.systems.IntervalEntitySystem;

	/**
	* If you need to process entities at a certain interval then use this.
	* A typical usage would be to regenerate ammo or health at certain intervals, no need
	* to do that every game loop, but perhaps every 100 ms. or every second.
	*
	* @author Arni Arent
	*
	*/
	export class IntervalEntityProcessingSystem extends IntervalEntitySystem {

		constructor(aspect:Aspect, interval:number) {
			super(aspect, interval);
		}


		/**
		* Process a entity this system is interested in.
		* @param e the entity to process.
		*/
		public processEach(e:Entity){}



		protected processEntities(entities:ImmutableBag<Entity>) {
			for (var i = 0, s = entities.size(); s > i; i++) {
				this.processEach(entities.get(i));
			}
		}

	}
}
