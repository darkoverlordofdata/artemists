module artemis.systems {

	import EntitySystem = artemis.EntitySystem;
	import Aspect = artemis.Aspect;

	/**
	* A system that processes entities at a interval in milliseconds.
	* A typical usage would be a collision system or physics system.
	*
	* @author Arni Arent
	*
	*/
	export class IntervalEntitySystem extends EntitySystem {
		private acc_:number;
		private interval_:number;

		constructor(aspect:Aspect, interval:number) {
			super(aspect);
			this.interval_ = interval;
		}


		protected checkProcessing():boolean {
			this.acc_ += this.world.getDelta();
			if(this.acc_ >= this.interval_) {
				this.acc_ -= this.interval_;
				return true;
			}
			return false;
		}

	}
}
