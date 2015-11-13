module example.systems {


  import Aspect = artemis.Aspect;
  import Entity = artemis.Entity;
  import Constants = example.core.Constants;
  import Layer = example.components.Layer;
  import EFFECT = example.components.EFFECT;
  import EntitySystem = artemis.EntitySystem;
  import PlayerComponent = artemis.components.PlayerComponent;
  import PositionComponent = artemis.components.PositionComponent;
  import VelocityComponent = artemis.components.VelocityComponent;
  import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;

  import Container = PIXI.Container;

  export class PlayerInputSystem extends EntityProcessingSystem  {
    private static FireRate = .1;

    private shoot:boolean;
    private timeToFire:number=0;
    private mouseVector;
    private sprites:Container;

    constructor() {
      //super(Aspect.getAspectForAll(PositionComponent, VelocityComponent, PlayerComponent));
      super(Aspect.getAspectForAll(PlayerComponent));
      this.sprites = EntitySystem.blackBoard.getEntry<Container>('sprites');
    }

    public initialize() {
      document.addEventListener('touchstart', this.onTouchStart, true);
      document.addEventListener('touchmove', this.onTouchMove, true);
      document.addEventListener('touchend', this.onTouchEnd, true);
      document.addEventListener('mousedown', this.onTouchStart, true);
      document.addEventListener('mousemove', this.onTouchMove, true);
      document.addEventListener('mouseup', this.onTouchEnd, true);
      this.world.createEntityFromTemplate('player');
    }

    protected processEach(e:Entity) {

      if (this.mouseVector === undefined) return;

      var position:PositionComponent = e.position;
      var destinationX = this.mouseVector.x;
      var destinationY = this.mouseVector.y;

      if (destinationX === undefined || destinationY === undefined) return;

      position.x = this.mouseVector.x;
      position.y = this.mouseVector.y;


      if (this.shoot) {
        if (this.timeToFire <= 0) {
          this.world.createEntityFromTemplate('bullet', position.x - 27, position.y + 2);
          this.world.createEntityFromTemplate('bullet', position.x + 27, position.y + 2);
          this.timeToFire = PlayerInputSystem.FireRate;
        }
      }
      if (this.timeToFire > 0) {
        this.timeToFire -= this.world.delta;
        if (this.timeToFire < 0) {
          this.timeToFire = 0;
        }
      }
    }

    protected onTouchStart = (event) => {
      event = event.changedTouches ? event.changedTouches[0] : event;
      this.shoot = true;
      this.mouseVector = {
        x: parseInt(event.clientX),
        y: parseInt(event.clientY)
      };
      return true;
    };

    protected onTouchMove = (event) => {
      event = event.changedTouches ? event.changedTouches[0] : event;
      this.mouseVector = {
        x: parseInt(event.clientX),
        y: parseInt(event.clientY)
      };
      return true;
    };

    protected onTouchEnd = (event) => {
      this.shoot = false;
    };


  }
}
