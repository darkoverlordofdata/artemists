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

    protected sprites: Container;

    public buildEntity(entity:artemis.Entity, world:artemis.World, name:string, layer:Layer, health:number, x:number, y:number, velocityX:number, velocityY:number, boundsRadius:number):artemis.Entity {

      var sprite:Sprite = bosco.prefab(name);
      sprite.anchor.set(0.5, 0.5);
      sprite.position.set(~~x, ~~y);
      bosco.viewContainer.addChild(sprite);

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