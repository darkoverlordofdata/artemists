module brokenspork.components {
	
	import Component = artemis.Component;

	export class Expires extends Component {
  	public static className = 'Expires';
		public delay:number;
	}
	
	Expires.prototype.delay = 0;
}
