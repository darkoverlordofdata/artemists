module shmup {

  declare var viewContainer;

  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import DestroyComponent = artemis.components.DestroyComponent;
  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;

  export class DestroySystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(DestroyComponent));
    }


    /**
     * Execute when a Destroy component is added
     * @param entities
     */
    public processEach(e:Entity) {
      viewContainer.removeChild(e.view.sprite);
      e.deleteFromWorld();
    }
  }
}