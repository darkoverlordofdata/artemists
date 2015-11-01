module example.components {
	
	import Component = artemis.Component;
	import PooledComponent = artemis.PooledComponent;
	import Pooled = artemis.annotations.Pooled;

	@Pooled()
	export class Velocity extends PooledComponent {
		
  	public static className = 'Velocity';
		public initialize(vectorX:number=0, vectorY:number=0) {
			this.vectorX = vectorX;
			this.vectorY = vectorY;
		}

		public vectorX:number;
		public vectorY:number;
	}
	
	Velocity.prototype.vectorX = 0;
	Velocity.prototype.vectorY = 0;
	
}

