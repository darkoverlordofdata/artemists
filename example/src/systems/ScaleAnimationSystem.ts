module example.systems {


	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	import SpriteComponent = artemis.components.SpriteComponent;
	import ScaleAnimationComponent = artemis.components.ScaleAnimationComponent;

	export class ScaleAnimationSystem extends EntityProcessingSystem {

		constructor() {
			super(Aspect.getAspectForAll(ScaleAnimationComponent));
		}
	
		
		public processEach(e:Entity) {
			var scaleAnimation:ScaleAnimationComponent = e.scaleAnimation;

			if (scaleAnimation.active) {
				var sprite:PIXI.Sprite = <PIXI.Sprite>e.sprite.object;

				sprite.scale.x += scaleAnimation.speed * this.world.delta;
				sprite.scale.y = sprite.scale.x;
	
				if (sprite.scale.x > scaleAnimation.max) {
					sprite.scale.x = scaleAnimation.max;
					scaleAnimation.active = false;
				} else if (sprite.scale.x < scaleAnimation.min) {
					sprite.scale.x = scaleAnimation.min;
					scaleAnimation.active = false;
				}
			}
		}
	
	}
}

