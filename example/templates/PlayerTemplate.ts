module example.templates {

  import Position = example.components.Position;
  import Sprite = example.components.Sprite;
  import Velocity = example.components.Velocity;
  import Bounds = example.components.Bounds;
  import Player = example.components.Player;
  import Layer = example.components.Layer;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = example.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('player')

  export class PlayerTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      entity.addComponent(Position, x, y);
      entity.addComponent(Velocity, 0, 0);
      entity.addComponent(Bounds, 43);
      entity.addComponent(Player);
      entity.addComponent(Sprite, 'fighter', cc.color(93, 255, 129), (sprite:Sprite) => {
          sprite.layer = Layer.ACTORS_3;
          sprite.addTo(EntitySystem.blackBoard.getEntry<cc.Layer>('game'));
      });
      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.PLAYER_SHIP);
      return entity;
    }
  }
}