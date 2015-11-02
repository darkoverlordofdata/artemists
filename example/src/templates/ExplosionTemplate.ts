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

    protected template: Texture;
    protected sprites: Container;

    constructor() {
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');
      var sprite:Sprite = new Sprite(Texture.fromFrame('explosion.png'));
      sprite.tint = 0xffd80080;
      this.template = sprite.generateTexture(bosco['renderer']);
    }

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number, scale:number):artemis.Entity {

      var sprite:Sprite = new Sprite(this.template);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      sprite.scale.set(scale, scale);
      this.sprites.addChild(sprite);

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