module example.templates {

  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;
  import Entity = artemis.Entity;
  import World = artemis.World;

  import Position = example.components.Position;
  import Sprite = example.components.Sprite;
  import Velocity = example.components.Velocity;
  import Bounds = example.components.Bounds;
  import Player = example.components.Player;
  import Layer = example.components.Layer;
  import Constants = example.core.Constants;

  @EntityTemplate('player')
  export class PlayerTemplate implements IEntityTemplate {

    public buildEntity(entity:Entity, world:World):Entity {

      var x = Constants.FRAME_WIDTH/4;
      var y = Constants.FRAME_HEIGHT-80;

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