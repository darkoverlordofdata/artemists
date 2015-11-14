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

  export class ExplosionTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number, scale:number):artemis.Entity {

      var sprite:Sprite = bosco.prefab('explosion');
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      sprite.scale.set(scale, scale);
      bosco.viewContainer.addChild(sprite);

      return entity
        .addPosition(~~x, ~~y)
        .addExpires(0.5)
        .addSprite(Layer.PARTICLES, sprite)
        .addScaleAnimation(scale/100, scale, -3, false, true)
        .start();
    }
  }

  @EntityTemplate('small')
  export class SmallExplosionTemplate extends ExplosionTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {
      super.buildEntity(entity, world, x, y, 0.1);
      return entity.addSoundEffect(EFFECT.SMALLASPLODE);
    }
  }

  @EntityTemplate('big')
  export class BigExplosionTemplate extends ExplosionTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {
      super.buildEntity(entity, world, x, y, 0.5);
      return entity.addSoundEffect(EFFECT.ASPLODE);
    }
  }
}