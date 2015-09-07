module example.components {
	
	import Component = artemis.Component;

	export class ScaleAnimation extends Component {
  	public static className = 'ScaleAnimation';
    public initialize(lambda?) {
      if (lambda !== undefined) {
        lambda(this);
      }
    }
		//public initialize(min:number=0, max:number=0, speed:number=0, repeat:boolean=false, active:boolean=false) {
		//	this.min = min;
		//	this.max = max;
     // this.speed = speed;
     // this.repeat = repeat;
     // this.active = active;
		//}

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
