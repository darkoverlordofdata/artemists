module brokenspork.components {
	
	import Component = artemis.Component;

	export class ScaleAnimation extends Component {
  	public static className = 'ScaleAnimation';
		
		public min:number;
		public max:number;
		public speed:number;
		public repeat:boolean;
		public active:boolean;
	}
	
	ScaleAnimation.prototype.min = 0;
	ScaleAnimation.prototype.max = 0;
	ScaleAnimation.prototype.speed = 0;
	ScaleAnimation.prototype.repeat = false;
	ScaleAnimation.prototype.active = false;

}
