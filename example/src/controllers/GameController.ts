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
  import Constants = example.core.Constants;
  import EntitySystem = artemis.EntitySystem;
  import PlayerTemplate = example.templates.PlayerTemplate;
  import Layer = example.components.Layer;

  export class GameController {

    private world:World;

    private spriteRenderSystem:SpriteRenderSystem;
    private healthRenderSystem:HealthRenderSystem;
    private hudRenderSystem:HudRenderSystem;

    constructor() {
      EntitySystem.blackBoard.setEntry('sprites', bosco.viewContainer);
    }

    start() {

      var world:World = this.world = new artemis.World();
      world.loadExtensions();
      world.setScore(0);

      world.setSystem(new MovementSystem());
      world.setSystem(new PlayerInputSystem());
      world.setSystem(new SoundEffectSystem());
      world.setSystem(new CollisionSystem());
      world.setSystem(new ExpiringSystem());
      world.setSystem(new EntitySpawningTimerSystem());
      world.setSystem(new ParallaxStarRepeatingSystem());
      world.setSystem(new ColorAnimationSystem());
      world.setSystem(new ScaleAnimationSystem());
      world.setSystem(new RemoveOffscreenShipsSystem());

      this.spriteRenderSystem = world.setSystem(new SpriteRenderSystem(), true);
      this.healthRenderSystem = world.setSystem(new HealthRenderSystem(), true);
      this.hudRenderSystem = world.setSystem(new HudRenderSystem(), true);

      world.initialize();
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

