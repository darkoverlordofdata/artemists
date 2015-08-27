module brokenspork.components {
	
	import Component = artemis.Component;
	
	export class Bounds extends Component {
		
    public static className = 'Bounds';
		
		public radius:number;
	}
	
	Bounds.prototype.radius = 0;
}
