module brokenspork.components {
	
	export enum Layer {
		DEFAULT,
		BACKGROUND,
		ACTORS_1,
		ACTORS_2,
		ACTORS_3,
		PARTICLES
		
		// getLayerId() {
		// 	return ordinal();
		// }
	};
	
	export class Sprite extends Component {
    public static className = 'Bounds';
		
		public name:string;
		public scaleX:number;
		public scaleY:number;
		public rotation:number;
		public r:number;
		public g:number;
		public b:number;
		public a:number;
		public layer:Layer;
		
			// public int getLayerId() {
			// 	return ordinal();
			// }
	}
		
	Sprite.prototype.name = '';
	Sprite.prototype.scaleX = 1;
	Sprite.prototype.scaleY = 1;
	Sprite.prototype.rotation = 0;
	Sprite.prototype.r = 1;
	Sprite.prototype.g = 1;
	Sprite.prototype.b = 1;
	Sprite.prototype.a = 1;
	Sprite.prototype.layer = Layer.DEFAULT;
}

