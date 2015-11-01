module shmup {

  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import Input = bosco.utils.Input;
  import PlayerComponent = artemis.components.PlayerComponent;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  export class PlayerMoveSystem extends EntityProcessingSystem {

    constructor() {
      super(Aspect.getAspectForAll(PlayerComponent));
    }

    public processEach(e:Entity) {
      var pos = Input.mousePosition;
      e.position.x = pos.x;
      e.position.y = pos.y;
    }

  }
}