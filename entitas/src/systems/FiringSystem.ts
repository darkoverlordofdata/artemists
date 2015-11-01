module shmup {

  import Input = bosco.utils.Input;
  import Groups = shmup.Groups;
  import VoidEntitySystem = artemis.systems.VoidEntitySystem;

  export class FiringSystem extends VoidEntitySystem  {

    protected timeToFire:number = 0;
    protected shoot:boolean = false;
    protected mouseVector;
    static FireRate = 0.1;

    constructor() {
      super();
      document.addEventListener('touchstart', this.onTouchStart, true);
      document.addEventListener('touchmove', this.onTouchMove, true);
      document.addEventListener('touchend', this.onTouchEnd, true);
      document.addEventListener('mousedown', this.onTouchStart, true);
      document.addEventListener('mousemove', this.onTouchMove, true);
      document.addEventListener('mouseup', this.onTouchEnd, true);
    }

    public processSystem() {

      if (this.mouseVector === undefined)
        return;
      var mouseVector = this.mouseVector;
      if (mouseVector.x === undefined || mouseVector.y === undefined)
        return;
      if (this.shoot) {
        if (this.timeToFire <= 0) {
          this.fire(mouseVector.x - 27, mouseVector.y);
          this.fire(mouseVector.x + 27, mouseVector.y);
          this.timeToFire = FiringSystem.FireRate;
        }
      }
      if (this.timeToFire > 0) {
        this.timeToFire -= bosco.delta;
        if (this.timeToFire < 0) {
          this.timeToFire = 0;
        }
      }
    }


    protected fire(x:number, y:number) {
      this.world.createEntity("Bullet")
        .setBullet(true)
        .addResource("bullet")
        .addLayer(Layer.PARTICLES)
        .addBounds(5)
        .addTint(0xffffff)
        .addVelocity(0, -10)
        .addPosition(x, y)
        .setAddView(true)
        .start(Groups.PLAYER_BULLETS);
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
      //this.shoot = true;
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