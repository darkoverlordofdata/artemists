module brokenspork.components {
	
	export class Position extends Component {
  	public static className = 'Position';
		public x:number;
		public y:number;
	}
	
	Position.prototype.x = 0;
	Position.prototype.y = 0;
}
