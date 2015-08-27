module brokenspork.systems {
	
	import ColorAnimation = brokenspork.components.ColorAnimation;
	import Sprite = brokenspork.components.Sprite;

	export class ColorAnimationSystem extends EntityProcessingSystem {
		@Mapper ColorAnimation 
		cam:ComponentMapper<ColorAnimation>;

		@Mapper Sprite 
		sm:ComponentMapper<Sprite>;

		constructor() {
			super(Aspect.getAspectForAll(ColorAnimation, Sprite));
		}
	
		
		public process(e:Entity) {
			var c:ColorAnimation = this.cam.get(e);
			var sprite:Sprite = this.sm.get(e);
			
			if(c.alphaAnimate) {
				sprite.a += c.alphaSpeed * this.world.delta;
				
				if(sprite.a > c.alphaMax || sprite.a < c.alphaMin) {
					if(c.repeat) {
						c.alphaSpeed = -c.alphaSpeed;
					} else {
						c.alphaAnimate = false;
					}
				}
			}
		}
	
	}
}

