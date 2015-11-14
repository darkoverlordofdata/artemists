module example.templates {

  import Layer = example.components.Layer;
  import EFFECT = example.components.EFFECT;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;

  @EntityTemplate('bullet')

  export class PlayerBulletTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var sprite:Sprite = bosco.prefab('bullet');
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      bosco.viewContainer.addChild(sprite);

      return entity
        .addPosition(~~x, ~~y)
        .addVelocity(0, 800)
        .addBounds(5)
        .addExpires(5)
        .addSoundEffect(EFFECT.PEW)
        .addSprite(Layer.PARTICLES, sprite)
        .start(Constants.Groups.PLAYER_BULLETS);
    }
  }
}