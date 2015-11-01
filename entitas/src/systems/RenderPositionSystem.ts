module shmup {

  import ViewComponent = artemis.components.ViewComponent;
  import PositionComponent = artemis.components.PositionComponent;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  export class RenderPositionSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(PositionComponent, ViewComponent));
    }

    protected scaleX:number;
    protected scaleY:number;

    public processEach(e:Entity) {
      var pos = e.position;
      var sprite:PIXI.Sprite = <PIXI.Sprite>e.view.sprite;
      sprite.position.set(pos.x, pos.y);
    }
  }
}