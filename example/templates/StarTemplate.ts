module brokenspork.templates {

  import MathUtils = artemis.utils.MathUtils;
  import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;
  import Velocity = brokenspork.components.Velocity;
  import Bounds = brokenspork.components.Bounds;
  import ParallaxStar = brokenspork.components.ParallaxStar;
  import ColorAnimation = brokenspork.components.ColorAnimation;
  import Layer = brokenspork.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = brokenspork.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('star')
  export class StarTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World):artemis.Entity {

      var position:Position = new Position();
      position.x = MathUtils.nextInt(Constants.FRAME_WIDTH/2);
      position.y = MathUtils.nextInt(Constants.FRAME_HEIGHT);
      entity.addComponent(position);

      var sprite:Sprite = new Sprite();
      sprite.name = "particle";
      sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
      sprite.a = MathUtils.random(127);
      sprite.layer = Layer.BACKGROUND;
      entity.addComponent(sprite);
      sprite.addTo(EntitySystem.blackboard.getEntry<CCLayer>('game'));

      var velocity:Velocity = new Velocity();
      velocity.vectorY = MathUtils.random(-10, -60);
      entity.addComponent(velocity);

      entity.addComponent(new ParallaxStar());

      var colorAnimation:ColorAnimation = new ColorAnimation();
      colorAnimation.alphaAnimate = true;
      colorAnimation.repeat = true;
      colorAnimation.alphaSpeed = MathUtils.random(0.2, 0.7);
      colorAnimation.alphaMin = 0;
      colorAnimation.alphaMax = 255;
      entity.addComponent(colorAnimation);

      return entity;

    }
  }
}