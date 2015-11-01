module example.templates {

  import MathUtils = artemis.utils.MathUtils;
  import Position = example.components.Position;
  import Sprite = example.components.Sprite;
  import Velocity = example.components.Velocity;
  import ColorAnimation = example.components.ColorAnimation;
  import Expires = example.components.Expires;
  import Layer = example.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('particle')

  export class ParticleTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var radians:number = MathUtils.random(2*Math.PI);
      var magnitude:number = MathUtils.random(400);
      var velocityX = magnitude * Math.cos(radians);
      var velocityY = magnitude * Math.sin(radians);

      entity.addComponent(Position, x, y);
      entity.addComponent(Velocity, velocityX, velocityY);
      entity.addComponent(Expires, 1);
      entity.addComponent(Sprite, 'particle', cc.color(255, 216, 0, 255), (sprite:Sprite) => {
        sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
        sprite.layer = Layer.PARTICLES;
        sprite.addTo(EntitySystem.blackBoard.getEntry<cc.Layer>('game'));
      });
      entity.addComponent(ColorAnimation, (colorAnimation:ColorAnimation) => {
        colorAnimation.alphaAnimate = true;
        colorAnimation.alphaSpeed = -1;
        colorAnimation.alphaMin = 0;
        colorAnimation.alphaMax = 1;
        colorAnimation.repeat = false;
      });
      return entity;
    }
  }
}