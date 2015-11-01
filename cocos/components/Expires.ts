module example.components {
	
	import Component = artemis.Component;
	import PooledComponent = artemis.PooledComponent;
	import Pooled = artemis.annotations.Pooled;

	@Pooled()
	export class Expires extends PooledComponent {
  	public static className = 'Expires';
		public initialize(delay:number=0) {
			this.delay = delay;
		}
		public delay:number;
	}
	
	Expires.prototype.delay = 0;
}
