module example.systems {

  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import PositionComponent = artemis.components.PositionComponent;
  import VelocityComponent = artemis.components.VelocityComponent;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  export class MovementSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(PositionComponent, VelocityComponent));
    }


    public processEach(e:Entity) {

      var delta = this.world.delta;

      e.position.x += (e.velocity.x * delta);
      e.position.y -= (e.velocity.y * delta);

    }
  }
}

