module brokenspork.templates {

  import Position = brokenspork.components.Position;
  import Sprite = brokenspork.components.Sprite;
  import Velocity = brokenspork.components.Velocity;
  import Bounds = brokenspork.components.Bounds;
  import Expires = brokenspork.components.Expires;
  import SoundEffect = brokenspork.components.SoundEffect;
  import Layer = brokenspork.components.Layer;
  import EFFECT = brokenspork.components.EFFECT;
  import GroupManager = artemis.managers.GroupManager;
  import EntitySystem = artemis.EntitySystem;
  import Constants = brokenspork.core.Constants;
  import EntityTemplate = artemis.annotations.EntityTemplate;
  import IEntityTemplate = artemis.IEntityTemplate;

  @EntityTemplate('bullet')

  export class PlayerBulletTemplate implements IEntityTemplate {

    public buildEntity(entity:artemis.Entity, world:artemis.World, x:number, y:number):artemis.Entity {

      var position:Position = new Position();
      position.x = x;
      position.y = y;
      entity.addComponent(position);

      var sprite:Sprite = new Sprite();
      sprite.name = "bullet";
      sprite.layer = Layer.PARTICLES;
      entity.addComponent(sprite);
      sprite.addTo(EntitySystem.blackBoard.getEntry<CCLayer>('game'));

      var velocity:Velocity = new Velocity();
      velocity.vectorY = 800;
      entity.addComponent(velocity);

      var bounds:Bounds = new Bounds();
      bounds.radius = 5;
      entity.addComponent(bounds);

      var expires:Expires = new Expires();
      expires.delay = 5;
      entity.addComponent(expires);

      var sf:SoundEffect = new SoundEffect();
      sf.effect = EFFECT.PEW;
      entity.addComponent(sf);

      world.getManager<GroupManager>(GroupManager).add(entity, Constants.Groups.PLAYER_BULLETS);


      return entity;

    }
  }
}