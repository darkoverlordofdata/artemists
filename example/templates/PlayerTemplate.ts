module brokenspork.templates {

  import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;
  import Velocity = brokenspork.components.Velocity;
  import Bounds = brokenspork.components.Bounds;
  import Player = brokenspork.components.Player;
  import Layer = brokenspork.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = brokenspork.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('player')

  export class PlayerTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var position:Position = new Position();
      position.x = x;
      position.y = y;
      entity.addComponent(position);

      var sprite:Sprite = new Sprite();
      sprite.name = "fighter";
      sprite.r = 93;
      sprite.g = 255;
      sprite.b = 129;
      sprite.layer = Layer.ACTORS_3;
      entity.addComponent(sprite);
      sprite.addTo(EntitySystem.blackboard.getEntry<CCLayer>('game'));

      var velocity:Velocity = new Velocity();
      velocity.vectorX = 0;
      velocity.vectorY = 0;
      entity.addComponent(velocity);

      var bounds:Bounds = new Bounds();
      bounds.radius = 43;
      entity.addComponent(bounds);

      entity.addComponent(new Player());

      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.PLAYER_SHIP);

      return entity;

    }
  }
}