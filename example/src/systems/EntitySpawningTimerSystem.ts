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

        var pos = {
          x: ~~MathUtils.nextInt(Constants.FRAME_WIDTH),
          y: ~~(Constants.FRAME_HEIGHT / 2 - 200)
        };

        this.world.createEntity("enemy")
          .addHealth(10, 10)
          .addPosition(pos.x, pos.y)
          .addVelocity(0, -40)
          .addBounds(20)
          .addSprite(Layer.ACTORS_3, bosco.prefab('enemy1', this.sprites, pos))
          .start(Constants.Groups.ENEMY_SHIPS);
      };

      this.timer2 = new Timer(6, true);
      this.timer2.execute = () => {
        var pos = {
          x: ~~MathUtils.nextInt(Constants.FRAME_WIDTH),
          y: ~~(Constants.FRAME_HEIGHT / 2 - 100)
        };

        this.world.createEntity("enemy")
          .addHealth(20, 20)
          .addPosition(pos.x, pos.y)
          .addVelocity(0, -30)
          .addBounds(40)
          .addSprite(Layer.ACTORS_2, bosco.prefab('enemy2', this.sprites, pos))
          .start(Constants.Groups.ENEMY_SHIPS);
      };

      this.timer3 = new Timer(12, true);
      this.timer3.execute = () => {
        var pos = {
          x: ~~MathUtils.nextInt(Constants.FRAME_WIDTH),
          y: ~~(Constants.FRAME_HEIGHT / 2 - 50)
        };

        this.world.createEntity("enemy")
          .addHealth(60, 60)
          .addPosition(pos.x,pos.y)
          .addVelocity(0, -20)
          .addBounds(70)
          .addSprite(Layer.ACTORS_1, bosco.prefab('enemy3', this.sprites, pos))
          .start(Constants.Groups.ENEMY_SHIPS);

      };
    }


    protected processSystem() {
      this.timer1.update(this.world.delta);
      this.timer2.update(this.world.delta);
      this.timer3.update(this.world.delta);
    }

  }
}

