module example.systems {

  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import EntitySystem = artemis.EntitySystem;
  import ImmutableBag = artemis.utils.ImmutableBag;
  import SpriteComponent = artemis.components.SpriteComponent;
  import PositionComponent = artemis.components.PositionComponent;

  export class SpriteRenderSystem extends EntitySystem {

    private sprites:PIXI.Container;

    constructor() {
      super(Aspect.getAspectForAll(PositionComponent, SpriteComponent));
    }


    public initialize() {
      this.sprites = EntitySystem.blackBoard.getEntry<PIXI.Container>('sprites');
    }

    protected checkProcessing():boolean {
      return true;
    }


    public processEntities(entities:ImmutableBag<Entity>) {

      for (var i = 0, l = entities.size(); i < l; i++) {
        var e = entities.get(i);

        if (e.hasPosition) {
          if (e.hasSprite) {
            var s:PIXI.Sprite = <PIXI.Sprite>e.sprite.object;
            var p = e.position;
            s.position.set(p.x, p.y);

          }
        }
      }
    }

    protected removed(e:Entity) {
      this.sprites.removeChild(<PIXI.Sprite>e.sprite.object);
    }
  }
}

