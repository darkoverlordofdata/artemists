module shmup {

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import PositionComponent = artemis.components.PositionComponent;
  import VelocityComponent = artemis.components.VelocityComponent;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class MotionSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(PositionComponent, VelocityComponent));
    }

    /**
     * Motion
     */
    public processEach(e:Entity) {
      var vel = e.velocity;
      var pos = e.position;
      var x = pos.x + vel.x;
      var y = pos.y + vel.y;

      if (y < 0 || y > bosco.config.height) {
        e.isDestroy = true;
      }
      //e.replacePosition(x, y);
      e.position.x = x;
      e.position.y = y;
    }
  }
}