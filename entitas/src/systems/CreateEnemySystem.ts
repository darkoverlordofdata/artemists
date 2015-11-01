module shmup {

  import Layer = shmup.Layer;
  import Groups = shmup.Groups;
  import Timer = artemis.utils.Timer;
  import MathUtils = artemis.utils.MathUtils;
  import VoidEntitySystem = artemis.systems.VoidEntitySystem;

  export class CreateEnemySystem extends VoidEntitySystem  {

    private timer1:Timer;
    private timer2:Timer;
    private timer3:Timer;
    private k:number=0;

    constructor() {
      super();
      this.initialize();
    }

    public processSystem() {
      var rnd = Math.random();
      if (rnd<.5) rnd = 1-rnd;
      var delta = rnd*bosco.delta;

      this.timer1.update(delta);
      this.timer2.update(delta);
      this.timer3.update(delta);
    }

    public initialize() {
      this.timer1 = new Timer(2, true);

      this.timer1.execute = () => {
        var config = bosco.config;
        this.world.createEntity("Enemy1")
          .setEnemy(true)
          .addResource("enemy1")
          .addLayer(Layer.ACTORS_1)
          .addVelocity(0, 1)
          .addBounds(10)
          .addHealth(10, 10)
          .addPosition(MathUtils.nextInt(config.width), config.height / 2 - 200)
          .setAddView(true)
          .start(Groups.ENEMY_SHIPS);
      };

      this.timer2 = new Timer(6, true);

      this.timer2.execute = () => {
        var config = bosco.config;
        this.world.createEntity("Enemy2")
          .setEnemy(true)
          .addResource("enemy2")
          .addLayer(Layer.ACTORS_2)
          .addVelocity(0, .5)
          .addBounds(40)
          .addHealth(20, 20)
          .addPosition(MathUtils.nextInt(config.width), config.height / 2 - 100)
          .setAddView(true)
          .start(Groups.ENEMY_SHIPS);
      };

      this.timer3 = new Timer(12, true);

      this.timer3.execute = () => {
        var config = bosco.config;
        this.world.createEntity("Enemy3")
          .setEnemy(true)
          .addResource("enemy3")
          .addLayer(Layer.ACTORS_3)
          .addVelocity(0, .25)
          .addBounds(70)
          .addHealth(60, 60)
          .addPosition(MathUtils.nextInt(config.width), config.height / 2 - 50)
          .setAddView(true)
          .start(Groups.ENEMY_SHIPS);
      };

    }
  }
}