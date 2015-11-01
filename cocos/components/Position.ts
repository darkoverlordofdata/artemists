module example.components {
	
	import Component = artemis.Component;
  import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Position extends PooledComponent {
  	public static className = 'Position';
		public initialize(x:number=0, y:number=0) {
			this.x = x;
      this.y = y;
		}
		public x:number;
		public y:number;
	}
	
	Position.prototype.x = 0;
	Position.prototype.y = 0;
}
