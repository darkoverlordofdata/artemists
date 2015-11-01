module example.systems {
	
	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import SpriteComponent = artemis.components.SpriteComponent;
	import ColorAnimationComponent = artemis.components.ColorAnimationComponent;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

	export class ColorAnimationSystem extends EntityProcessingSystem {

		constructor() {
			super(Aspect.getAspectForAll(ColorAnimationComponent, SpriteComponent));
		}
	
		protected processEach(e:Entity) {
			var c:ColorAnimationComponent = e.colorAnimation;
      var sprite:PIXI.Sprite = <PIXI.Sprite>e.sprite.object;

      if(c.alphaAnimate) {
        sprite.alpha += c.alphaSpeed * this.world.delta;

        if(sprite.alpha > c.alphaMax || sprite.alpha < c.alphaMin) {
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

