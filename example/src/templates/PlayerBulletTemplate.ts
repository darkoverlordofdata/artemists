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

    protected template: Texture;
    protected sprites: Container;

    constructor() {
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');

      var sprite:Sprite = new Sprite(Texture.fromFrame('bullet.png'));
      sprite.tint = 0xffffff;
      this.template = sprite.generateTexture(bosco['renderer']);
    }

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var sprite:Sprite = new Sprite(this.template);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      this.sprites.addChild(sprite);

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