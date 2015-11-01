module shmup {

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import ExpiresComponent = artemis.components.ExpiresComponent;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class ExpiringSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(ExpiresComponent));
    }

    /**
     * Countdown to destroy
     */
    public processEach(e:Entity) {
      var expires = e.expires;
      expires.delay-= bosco.delta;
      if (expires.delay < 0) {
        e.isDestroy = true;
      }
    }
  }
}