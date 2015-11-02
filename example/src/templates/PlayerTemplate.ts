module example.templates {

  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import Entity = artemis.Entity;
  import World = artemis.World;
  import Layer = example.components.Layer;
  import Constants = example.core.Constants;

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;

  @EntityTemplate('player')
  export class PlayerTemplate implements IEntityTemplate {

    protected template: Texture;

    protected sprites: Container;

    constructor() {
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');
      var sprite:Sprite = new Sprite(Texture.fromFrame('fighter.png'));
      sprite.tint = 0x5dff81;
      this.template = sprite.generateTexture(bosco['renderer']);
    }

    public buildEntity(entity:Entity, world:World):Entity {

      var x = Constants.FRAME_WIDTH/4;
      var y = Constants.FRAME_HEIGHT-80;

      var sprite:Sprite = new Sprite(this.template);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      this.sprites.addChild(sprite);

      return entity
        .setPlayer(true)
        .addPosition(~~x, ~~y)
        .addVelocity(0, 0)
        .addBounds(43)
        .addSprite(Layer.ACTORS_3, sprite)
        .start(Constants.Groups.PLAYER_SHIP);
    }
  }
}