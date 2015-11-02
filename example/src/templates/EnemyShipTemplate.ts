module example.templates {

  import Layer = example.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;

  @EntityTemplate('enemy')
  export class EnemyShipTemplate implements IEntityTemplate {

    protected cache = {};

    protected sprites: Container;

    constructor() {
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');
      var sprite:Sprite = new Sprite(Texture.fromFrame('enemy1.png'));
      sprite.tint = 0xff008e;
      this.cache['enemy1'] = sprite.generateTexture(bosco['renderer']);

      var sprite:Sprite = new Sprite(Texture.fromFrame('enemy2.png'));
      sprite.tint = 0xff008e;
      this.cache['enemy2'] = sprite.generateTexture(bosco['renderer']);

      var sprite:Sprite = new Sprite(Texture.fromFrame('enemy3.png'));
      sprite.tint = 0xff008e;
      this.cache['enemy3'] = sprite.generateTexture(bosco['renderer']);
    }

    public buildEntity(entity:artemis.Entity, world:artemis.World, name:string, layer:Layer, health:number, x:number, y:number, velocityX:number, velocityY:number, boundsRadius:number):artemis.Entity {

      var sprite:Sprite = new Sprite(this.cache[name]);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      this.sprites.addChild(sprite);

      return entity
        .addPosition(~~x, ~~y)
        .addVelocity(velocityX, velocityY)
        .addBounds(boundsRadius)
        .addHealth(health, health)
        .addSprite(layer, sprite)
        .start(Constants.Groups.ENEMY_SHIPS);
    }
  }
}