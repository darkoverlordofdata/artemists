module example.templates {

  import MathUtils = artemis.utils.MathUtils;
  import Position = example.components.Position;
  import Sprite = example.components.Sprite;
  import Velocity = example.components.Velocity;
  import Bounds = example.components.Bounds;
  import ParallaxStar = example.components.ParallaxStar;
  import ColorAnimation = example.components.ColorAnimation;
  import Layer = example.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('star')
  export class StarTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World):artemis.Entity {

      var x = MathUtils.nextInt(Constants.FRAME_WIDTH/2);
      var y = MathUtils.nextInt(Constants.FRAME_HEIGHT);

      entity.addComponent(Position, x, y);
      entity.addComponent(Velocity, 0, MathUtils.random(-10, -60));
      entity.addComponent(ParallaxStar);
      entity.addComponent(Sprite, 'particle', cc.color(255, 216, 0, 255), (sprite:Sprite) => {
        sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
        sprite.a = MathUtils.random(127);
        sprite.layer = Layer.BACKGROUND;
        sprite.addTo(EntitySystem.blackBoard.getEntry<cc.Layer>('game'));
      });
      entity.addComponent(ColorAnimation, (colorAnimation:ColorAnimation) => {
        colorAnimation.alphaAnimate = true;
        colorAnimation.repeat = true;
        colorAnimation.alphaSpeed = MathUtils.random(0.2, 0.7);
        colorAnimation.alphaMin = 0;
        colorAnimation.alphaMax = 255;
      });
      return entity;
    }
  }
}