module brokenspork.templates {

  import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;
  import Velocity = brokenspork.components.Velocity;
  import Bounds = brokenspork.components.Bounds;
  import Player = brokenspork.components.Player;
  import Expires = brokenspork.components.Expires;
  import SoundEffect = brokenspork.components.SoundEffect;
  import ScaleAnimation = brokenspork.components.ScaleAnimation;
  import Layer = brokenspork.components.Layer;
  import EFFECT = brokenspork.components.EFFECT;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = brokenspork.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;


  class ExplosionTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number, scale:number):artemis.Entity {

      var position:Position = new Position();
      position.x = x;
      position.y = y;
      entity.addComponent(position);

      var sprite:Sprite = new Sprite();
      sprite.name = "explosion";
      sprite.scaleX = sprite.scaleY = scale;
      sprite.r = 255;
      sprite.g = 216;
      sprite.b = 0;
      sprite.a = 128;
      sprite.layer = Layer.PARTICLES;
      entity.addComponent(sprite);
      sprite.addTo(EntitySystem.blackboard.getEntry<CCLayer>('game'));

      var expires:Expires = new Expires();
      expires.delay = 0.5;
      entity.addComponent(expires);

      var scaleAnimation:ScaleAnimation = new ScaleAnimation();
      scaleAnimation.active = true;
      scaleAnimation.max = scale;
      scaleAnimation.min = scale/100;
      scaleAnimation.speed = -3.0;
      scaleAnimation.repeat = false;
      entity.addComponent(scaleAnimation);

      return entity;

    }
  }

  @EntityTemplate('small')
  export class SmallExplosionTemplate extends ExplosionTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      super.buildEntity(entity, world, x, y, 0.1);

      var sf:SoundEffect = new SoundEffect();
      sf.effect = EFFECT.SMALLASPLODE;
      entity.addComponent(sf);
     return entity;

    }
  }

  @EntityTemplate('big')
  export class BigExplosionTemplate extends ExplosionTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {
      super.buildEntity(entity, world, x, y, 0.5);

      var sf:SoundEffect = new SoundEffect();
      sf.effect = EFFECT.ASPLODE;
      entity.addComponent(sf);
      return entity;

    }
  }


}