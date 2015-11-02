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

    protected template: Texture;
    protected sprites: Container;

    constructor() {
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');
      var sprite:Sprite = new Sprite(Texture.fromFrame('particle.png'));
      sprite.tint = 0xffd800ff;
      this.template = sprite.generateTexture(bosco['renderer']);
    }

    public buildEntity(entity:artemis.Entity, world:artemis.World):artemis.Entity {

      var x = MathUtils.nextInt(Constants.FRAME_WIDTH);
      var y = MathUtils.nextInt(Constants.FRAME_HEIGHT);

      var sprite:Sprite = new Sprite(this.template);
      sprite.alpha = MathUtils.random(127);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      this.sprites.addChild(sprite);

      return entity
        .addPosition(~~x, ~~y)
        .addVelocity(0, MathUtils.random(-10, -60))
        .setParallaxStar(true)
        .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, MathUtils.random(0.2, 0.7), false, false, false, true, true)
        .addSprite(Layer.BACKGROUND, sprite);
    }
  }
}