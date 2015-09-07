module example.systems {
	
	import ColorAnimation = example.components.ColorAnimation;
	import Sprite = example.components.Sprite;
	import Mapper = artemis.annotations.Mapper;
	
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	import ComponentMapper = artemis.ComponentMapper;
	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;

	export class ColorAnimationSystem extends EntityProcessingSystem {
		@Mapper(ColorAnimation) cam:ComponentMapper<ColorAnimation>;
		@Mapper(Sprite) sm:ComponentMapper<Sprite>;

		constructor() {
			super(Aspect.getAspectForAll(ColorAnimation, Sprite));
		}
	
		
		protected processEach(e:Entity) {
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

