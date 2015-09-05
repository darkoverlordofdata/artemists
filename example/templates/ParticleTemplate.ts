module brokenspork.templates {

  import MathUtils = artemis.utils.MathUtils;
  import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;
  import Velocity = brokenspork.components.Velocity;
  import ColorAnimation = brokenspork.components.ColorAnimation;
  import Expires = brokenspork.components.Expires;
  import Layer = brokenspork.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = brokenspork.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('particle')

  export class ParticleTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {
      var position:Position = new Position();
      position.x = x;
      position.y = y;
      entity.addComponent(position);

      var sprite:Sprite = new Sprite();
      sprite.name = "particle";
      sprite.scaleX = sprite.scaleY = MathUtils.random(0.5, 1);
      sprite.r = 255;
      sprite.g = 216;
      sprite.b = 0;
      sprite.a = 1;
      sprite.layer = Layer.PARTICLES;
      entity.addComponent(sprite);
      sprite.addTo(EntitySystem.blackboard.getEntry<CCLayer>('game'));

      var radians:number = MathUtils.random(2*Math.PI);
      var magnitude:number = MathUtils.random(400);

      var velocity:Velocity = new Velocity();
      velocity.vectorX = magnitude * Math.cos(radians);
      velocity.vectorY = magnitude * Math.sin(radians);
      entity.addComponent(velocity);

      var expires:Expires = new Expires();
      expires.delay = 1;
      entity.addComponent(expires);

      var colorAnimation:ColorAnimation = new ColorAnimation();
      colorAnimation.alphaAnimate = true;
      colorAnimation.alphaSpeed = -1;
      colorAnimation.alphaMin = 0;
      colorAnimation.alphaMax = 1;
      colorAnimation.repeat = false;
      entity.addComponent(colorAnimation);

      return entity;

    }
  }
}