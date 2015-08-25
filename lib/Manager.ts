module artemis {
	
	
	/**
	* Manager.
	* 
	* @author Arni Arent
	* 
	*/
	export class Manager implements EntityObserver {
		protected world_:World;
		public uuid:string;
		
		constructor() {
			this.uuid = UUID.randomUUID(); 
		}
		
		public initialize() {
			throw Error('Abstract Method');
		}
	
		public setWorld(world:World) {
			this.world_ = world;
		}
	
		public getWorld():World {
			return this.world_;
		}
		
		//@Override
		public added(e:Entity) {
		}
		
		//@Override
		public changed(e:Entity) {
		}
		
		//@Override
		public deleted(e:Entity) {
		}
		
		//@Override
		public disabled(e:Entity) {
		}
		
		//@Override
		public enabled(e:Entity) {
		}
	}
}

