module artemis {
  "use strict";
	
	import EntityObserver = artemis.EntityObserver;

	/**
	* Manager.
	* 
	* @author Arni Arent
	* 
	*/
	export class Manager implements EntityObserver {
		protected world_:World;
		
		public initialize() {
		}
	
		public setWorld(world:World) {
			this.world_ = world;
		}
	
		public getWorld():World {
			return this.world_;
		}
		
		
		public added(e:Entity) {
		}
		
		
		public changed(e:Entity) {
		}
		
		
		public deleted(e:Entity) {
		}
		
		
		public disabled(e:Entity) {
		}
		
		
		public enabled(e:Entity) {
		}
	}
}

