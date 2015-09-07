module example.components {

	import Component = artemis.Component;

	export class Health extends Component {
  	public static className = 'Health';

		public initialize(health:number=0, maximumHealth:number=0) {
			this.health = health;
			this.maximumHealth = maximumHealth;
		}

		public health:number;
		public maximumHealth:number;
	}
	
	Health.prototype.health = 0;
	Health.prototype.maximumHealth = 0;
}
