module brokenspork.templates {

  import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;
  import Velocity = brokenspork.components.Velocity;
  import Bounds = brokenspork.components.Bounds;
  import Health = brokenspork.components.Health;
  import Layer = brokenspork.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = brokenspork.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('enemy')

  export class EnemyShipTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, name:string, layer:Layer, health:number, x:number, y:number, velocityX:number, velocityY:number, boundsRadius:number):artemis.Entity {

      var position:Position = new Position();
      position.x = x;
      position.y = y;
      entity.addComponent(position);

      var sprite:Sprite = new Sprite();
      sprite.name = name;
      sprite.r = 255;
      sprite.g = 0;
      sprite.b = 142;
      sprite.layer = layer;
      entity.addComponent(sprite);
      sprite.addTo(EntitySystem.blackBoard.getEntry<CCLayer>('game'));

      var velocity:Velocity = new Velocity();
      velocity.vectorX = velocityX;
      velocity.vectorY = velocityY;
      entity.addComponent(velocity);

      var bounds:Bounds = new Bounds();
      bounds.radius = boundsRadius;
      entity.addComponent(bounds);

      var h:Health = new Health();
      h.health = h.maximumHealth = health;
      entity.addComponent(h);

      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.ENEMY_SHIPS);

      return entity;

    }
  }
}