module example.systems {

  import Timer = artemis.utils.Timer;
  import Layer = example.components.Layer;
  import Constants = example.core.Constants;
  import MathUtils = artemis.utils.MathUtils;
  import SpriteComponent = artemis.components.SpriteComponent;
  import VoidEntitySystem = artemis.systems.VoidEntitySystem;


  export class EntitySpawningTimerSystem extends VoidEntitySystem {

    private sprites:PIXI.Container;
    private timer1:Timer;
    private timer2:Timer;
    private timer3:Timer;

    constructor(sprites:PIXI.Container) {
      super();
      this.sprites = sprites;

      this.timer1 = new Timer(2, true);
      this.timer1.execute = () => {

        this.world.createEntityFromTemplate('enemy', "enemy1", Layer.ACTORS_3, 10, MathUtils.nextInt(Constants.FRAME_WIDTH), Constants.FRAME_HEIGHT / 2 - 200, 0, -40, 20);
      };

      this.timer2 = new Timer(6, true);
      this.timer2.execute = () => {

        var x = MathUtils.nextInt(Constants.FRAME_WIDTH);
        var y = Constants.FRAME_HEIGHT / 2 - 100;
        this.world.createEntityFromTemplate('enemy', "enemy2", Layer.ACTORS_2, 20, x, y, 0, -30, 40);
      };

      this.timer3 = new Timer(12, true);
      this.timer3.execute = () => {

        var x = MathUtils.nextInt(Constants.FRAME_WIDTH);
        var y = Constants.FRAME_HEIGHT / 2 - 50;
        this.world.createEntityFromTemplate('enemy', "enemy3", Layer.ACTORS_1, 60, x, y, 0, -20, 70);
      };
    }


    protected processSystem() {
      this.timer1.update(this.world.delta);
      this.timer2.update(this.world.delta);
      this.timer3.update(this.world.delta);
    }

  }
}

