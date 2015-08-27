module brokenspork.components {

	import Component = artemis.Component;

	export class Health extends Component {
  	public static className = 'Health';
		public health:number;
		public maximumHealth:number;
	}
	
	Health.prototype.health = 0;
	Health.prototype.maximumHealth = 0;
}
