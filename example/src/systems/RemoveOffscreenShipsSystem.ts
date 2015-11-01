module example.systems {

  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import Constants = example.core.Constants;
  import BoundsComponent = artemis.components.BoundsComponent;
  import HealthComponent = artemis.components.HealthComponent;
  import PlayerComponent = artemis.components.PlayerComponent;
  import PositionComponent = artemis.components.PositionComponent;
  import VelocityComponent = artemis.components.VelocityComponent;
  import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;

  export class RemoveOffscreenShipsSystem extends IntervalEntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(VelocityComponent, PositionComponent, HealthComponent, BoundsComponent), 5);
    }


    public processEach(e:Entity) {

      if (e.position.y > Constants.FRAME_HEIGHT - e.bounds.radius) {
        e.deleteFromWorld();
      }
    }

  }
}

