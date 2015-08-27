module brokenspork.components {
	
	import Component = artemis.Component;

	export class Velocity extends Component {
		
  	public static className = 'Velocity';
		
		public vectorX:number;
		public vectorY:number;
	}
	
	Velocity.prototype.vectorX = 0;
	Velocity.prototype.vectorY = 0;
	
}

