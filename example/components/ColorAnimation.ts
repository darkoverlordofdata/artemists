module example.components {
	
	import Component = artemis.Component;

	export class ColorAnimation extends Component {
		
    public static className = 'ColorAnimation';

		public redMin:number;
		public redMax:number;
		public redSpeed:number;
		public greenMin:number;
		public greenMax:number;
		public greenSpeed:number;
		public blueMin:number;
		public blueMax:number;
		public blueSpeed:number;
		public alphaMin:number;
		public alphaMax:number;
		public alphaSpeed:number;
		
		public redAnimate:boolean;
		public greenAnimate:boolean;
		public blueAnimate:boolean;
		public alphaAnimate:boolean;
		public repeat:boolean;

    public initialize(lambda?) {
      if (lambda !== undefined) {
        lambda(this);
      }
    }

	}
	
	ColorAnimation.prototype.redMin = 0;
	ColorAnimation.prototype.redMax = 0;
	ColorAnimation.prototype.redSpeed = 0;
	ColorAnimation.prototype.redAnimate = false;

	ColorAnimation.prototype.greenMin = 0;
	ColorAnimation.prototype.greenMax = 0;
	ColorAnimation.prototype.greenSpeed = 0;
	ColorAnimation.prototype.greenAnimate = false;

	ColorAnimation.prototype.blueMin = 0;
	ColorAnimation.prototype.blueMax = 0;
	ColorAnimation.prototype.blueSpeed = 0;
	ColorAnimation.prototype.blueAnimate = false;

	ColorAnimation.prototype.alphaMin = 0;
	ColorAnimation.prototype.alphaMax = 0;
	ColorAnimation.prototype.alphaSpeed = 0;
	ColorAnimation.prototype.alphaAnimate = false;
	
	ColorAnimation.prototype.repeat = false;
}
