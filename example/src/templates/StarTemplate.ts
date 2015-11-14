module example.templates {

  import MathUtils = artemis.utils.MathUtils;
  import Layer = example.components.Layer;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;

  @EntityTemplate('star')
  export class StarTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World):artemis.Entity {

      var x = MathUtils.nextInt(Constants.FRAME_WIDTH);
      var y = MathUtils.nextInt(Constants.FRAME_HEIGHT);

      var sprite:Sprite = bosco.prefab('particle');
      sprite.alpha = MathUtils.random(127);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      bosco.viewContainer.addChild(sprite);

      return entity
        .addPosition(~~x, ~~y)
        .addVelocity(0, MathUtils.random(-10, -60))
        .setParallaxStar(true)
        .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, MathUtils.random(0.2, 0.7), false, false, false, true, true)
        .addSprite(Layer.BACKGROUND, sprite);
    }
  }
}