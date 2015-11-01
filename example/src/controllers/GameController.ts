module example {

  import MathUtils = artemis.utils.MathUtils;
  import CollisionSystem = example.systems.CollisionSystem;
  import ColorAnimationSystem = example.systems.ColorAnimationSystem;
  import EntitySpawningTimerSystem = example.systems.EntitySpawningTimerSystem;
  import ExpiringSystem = example.systems.ExpiringSystem;
  import HealthRenderSystem = example.systems.HealthRenderSystem;
  import HudRenderSystem = example.systems.HudRenderSystem;
  import MovementSystem = example.systems.MovementSystem;
  import ParallaxStarRepeatingSystem = example.systems.ParallaxStarRepeatingSystem;
  import PlayerInputSystem = example.systems.PlayerInputSystem;
  import RemoveOffscreenShipsSystem = example.systems.RemoveOffscreenShipsSystem;
  import ScaleAnimationSystem = example.systems.ScaleAnimationSystem;
  import SoundEffectSystem = example.systems.SoundEffectSystem;
  import SpriteRenderSystem = example.systems.SpriteRenderSystem;
  import World = artemis.World;
  import GroupManager = artemis.managers.GroupManager;
  import TagManager = artemis.managers.TagManager;
  import Constants = example.core.Constants;
  import EntitySystem = artemis.EntitySystem;
  import PlayerTemplate = example.templates.PlayerTemplate;
  import Layer = example.components.Layer;

  declare var viewContainer;

  export class GameController {

    private world:World;

    private spriteRenderSystem:SpriteRenderSystem;
    private healthRenderSystem:HealthRenderSystem;
    private hudRenderSystem:HudRenderSystem;

    constructor() {

      EntitySystem.blackBoard.setEntry('sprites', viewContainer);
    }

    start() {

      var world:World = this.world = new artemis.World();
      world.setManager(new GroupManager());
      world.setManager(new TagManager());
      world.initMappers();

      world.setSystem(new MovementSystem());
      world.setSystem(new PlayerInputSystem(viewContainer));
      world.setSystem(new SoundEffectSystem());
      world.setSystem(new CollisionSystem(viewContainer));
      world.setSystem(new ExpiringSystem());
      world.setSystem(new EntitySpawningTimerSystem(viewContainer));
      world.setSystem(new ParallaxStarRepeatingSystem());
      world.setSystem(new ColorAnimationSystem());
      world.setSystem(new ScaleAnimationSystem());
      world.setSystem(new RemoveOffscreenShipsSystem());

      this.spriteRenderSystem = world.setSystem(new SpriteRenderSystem(viewContainer), true);
      this.healthRenderSystem = world.setSystem(new HealthRenderSystem(viewContainer), true);
      this.hudRenderSystem = world.setSystem(new HudRenderSystem(viewContainer), true);

      world.initialize();
      var x = Constants.FRAME_WIDTH/2;
      var y = Constants.FRAME_HEIGHT-80;

      world.createEntity("Player")
        .setPlayer(true)
        .addPosition(~~x, ~~y)
        .addVelocity(0, 0)
        .addBounds(43)
        .addSprite(Layer.ACTORS_3, bosco.prefab('fighter', viewContainer))
        .start(Constants.Groups.PLAYER_SHIP);

      for (var i = 0; 500 > i; i++) {
        var x = MathUtils.nextInt(Constants.FRAME_WIDTH);
        var y = MathUtils.nextInt(Constants.FRAME_HEIGHT);
        var scale = MathUtils.random(0.5, 1);
        var options = {
          scale: {x:scale, y:scale},
          position: {x:~~x, y:~~y}
        };
        world.createEntity('Star')
          .setParallaxStar(true)
          .addPosition(~~x, ~~y)
          .addVelocity(0, MathUtils.random(-10, -60))
          .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, MathUtils.random(0.2, 0.7), false, false, false, true, true)
          .addSprite(Layer.BACKGROUND, bosco.prefab('star', viewContainer, options))
          .start();

      }
    }

    public update(delta:number) {
      this.world.setDelta(delta);
      this.world.process();

      this.spriteRenderSystem.process();
      this.healthRenderSystem.process();
      this.hudRenderSystem.process();
    }
  }
}

