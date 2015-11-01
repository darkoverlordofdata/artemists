module example.templates {

  import Position = example.components.Position;
  import Sprite = example.components.Sprite;
  import Velocity = example.components.Velocity;
  import Bounds = example.components.Bounds;
  import Health = example.components.Health;
  import Layer = example.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('enemy')
  export class EnemyShipTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, name:string, layer:Layer, health:number, x:number, y:number, velocityX:number, velocityY:number, boundsRadius:number):artemis.Entity {

      entity.addComponent(Position, x, y);
      entity.addComponent(Velocity, velocityX, velocityY);
      entity.addComponent(Bounds, boundsRadius);
      entity.addComponent(Health, health, health);
      entity.addComponent(Sprite, name, cc.color(255, 0, 142), (sprite:Sprite) => {
        sprite.layer = layer;
        sprite.addTo(EntitySystem.blackBoard.getEntry<cc.Layer>('game'));
      });
      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.ENEMY_SHIPS);
      return entity;
    }
  }
}