module shmup {

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ScaleAnimationComponent = artemis.components.ScaleAnimationComponent;
  import ViewComponent = artemis.components.ViewComponent;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import Sprite = PIXI.Sprite;

  export class ScaleAnimationSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(ScaleAnimationComponent, ViewComponent));
    }

    public processEach(e:Entity) {

      var scaleAnimation:ScaleAnimationComponent = e.scaleAnimation;

      if (scaleAnimation.active) {
        var sprite:Sprite = <Sprite>e.view.sprite;
        var scale = sprite.scale;

        scale.x += scaleAnimation.speed * bosco.delta;
        scale.y = scale.x;

        if (scale.x > scaleAnimation.max) {
          scale.x = scaleAnimation.max;
          scale.y = scale.x;
          scaleAnimation.active = false;
        } else if (scale.x < scaleAnimation.min) {
          scale.x = scaleAnimation.min;
          scale.y = scale.x;
          scaleAnimation.active = false;
        }
      }
    }
  }
}