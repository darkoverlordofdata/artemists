module example.components {
	
	import Component = artemis.Component;
  import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;

  @Pooled()
	export class Bounds extends PooledComponent {
		
    public static className = 'Bounds';

		public initialize(radius:number=0) {
      this.radius = radius;
    }

		public radius:number;
	}
	
	Bounds.prototype.radius = 0;
}
