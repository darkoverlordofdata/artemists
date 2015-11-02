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

  @EntityTemplate('particle')

  export class ParticleTemplate implements IEntityTemplate {

    protected template: Texture;
    protected sprites: Container;

    constructor() {
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');
      var sprite:Sprite = new Sprite(Texture.fromFrame('particle.png'));
      sprite.tint = 0xffd800ff;
      this.template = sprite.generateTexture(bosco['renderer']);
    }

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var radians:number = MathUtils.random(2*Math.PI);
      var magnitude:number = MathUtils.random(400);
      var velocityX = magnitude * Math.cos(radians);
      var velocityY = magnitude * Math.sin(radians);
      var scale = MathUtils.random(0.5, 1);

      var sprite:Sprite = new Sprite(this.template);
      sprite.anchor.set(0.5, 0.5);
      sprite.scale.set(scale, scale);
      sprite.position.set(~~x, ~~y);
      this.sprites.addChild(sprite);

      return entity
        .addPosition(~~x, ~~y)
        .addVelocity(velocityX, velocityY)
        .addExpires(1)
        .addSprite(Layer.PARTICLES, sprite)
        .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, false, false, false, true, true)
        .start();
    }
  }
}