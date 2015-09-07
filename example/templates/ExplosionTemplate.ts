module example.templates {

  import Position = example.components.Position;
  import Sprite = example.components.Sprite;
  import Velocity = example.components.Velocity;
  import Bounds = example.components.Bounds;
  import Player = example.components.Player;
  import Expires = example.components.Expires;
  import SoundEffect = example.components.SoundEffect;
  import ScaleAnimation = example.components.ScaleAnimation;
  import Layer = example.components.Layer;
  import EFFECT = example.components.EFFECT;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;


  class ExplosionTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number, scale:number):artemis.Entity {

      entity.addComponent(Position, x, y);
      entity.addComponent(Expires, 0.5);
      entity.addComponent(Sprite, 'explosion', cc.color(255, 216, 0, 128), (sprite:Sprite) => {
        sprite.scaleX = sprite.scaleY = scale;
        sprite.layer = Layer.PARTICLES;
        sprite.addTo(EntitySystem.blackBoard.getEntry<cc.Layer>('game'));
      });
      entity.addComponent(ScaleAnimation, (scaleAnimation:ScaleAnimation) => {
        scaleAnimation.active = true;
        scaleAnimation.max = scale;
        scaleAnimation.min = scale/100;
        scaleAnimation.speed = -3.0;
        scaleAnimation.repeat = false;
      });
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