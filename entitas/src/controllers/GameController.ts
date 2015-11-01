module shmup {

  declare var dat;

  import World = artemis.World;

  export class GameController {

    public world:World;

    start() {

      var html = document.getElementsByTagName('html')[0];
      html.style.backgroundImage = 'none';

      var world:World = this.world = new artemis.World();
      world.setManager(new artemis.managers.GroupManager());
      world.setManager(new artemis.managers.TagManager());
      world.initMappers();


      // Initialize
      world.setSystem(new shmup.CreateEnemySystem());
      world.setSystem(new shmup.CreatePlayerSystem());
      // Input
      world.setSystem(new shmup.FiringSystem());
      // Update
      world.setSystem(new shmup.PlayerMoveSystem());
      world.setSystem(new shmup.MotionSystem());
      world.setSystem(new shmup.CollisionSystem());
      world.setSystem(new shmup.ExpiringSystem());
      world.setSystem(new shmup.ScaleAnimationSystem());
      // Render
      world.setSystem(new shmup.AddViewSystem());
      world.setSystem(new shmup.RenderPositionSystem());

      // Destroy
      world.setSystem(new shmup.DestroySystem());
      //
      world.initialize();
    }

    update(delta:number) {
      this.world.setDelta(delta);
      this.world.process();
    }
  }
}

