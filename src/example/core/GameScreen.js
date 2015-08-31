var brokenspork;
(function (brokenspork) {
    var core;
    (function (core) {
        var CollisionSystem = brokenspork.systems.CollisionSystem;
        var ColorAnimationSystem = brokenspork.systems.ColorAnimationSystem;
        var EntitySpawningTimerSystem = brokenspork.systems.EntitySpawningTimerSystem;
        var ExpiringSystem = brokenspork.systems.ExpiringSystem;
        var HealthRenderSystem = brokenspork.systems.HealthRenderSystem;
        var HudRenderSystem = brokenspork.systems.HudRenderSystem;
        var MovementSystem = brokenspork.systems.MovementSystem;
        var ParallaxStarRepeatingSystem = brokenspork.systems.ParallaxStarRepeatingSystem;
        var PlayerInputSystem = brokenspork.systems.PlayerInputSystem;
        var RemoveOffscreenShipsSystem = brokenspork.systems.RemoveOffscreenShipsSystem;
        var ScaleAnimationSystem = brokenspork.systems.ScaleAnimationSystem;
        var SoundEffectSystem = brokenspork.systems.SoundEffectSystem;
        var SpriteRenderSystem = brokenspork.systems.SpriteRenderSystem;
        var GroupManager = artemis.managers.GroupManager;
        var Constants = brokenspork.core.Constants;
        var GameScreen = (function () {
            function GameScreen(game) {
                this.game = game;
                this.game = game;
                this.world = new artemis.World();
                this.world.setManager(new GroupManager());
                this.world.setSystem(new MovementSystem());
                this.playerInputSystem = new PlayerInputSystem(game);
                this.world.setSystem(this.playerInputSystem);
                this.world.setSystem(new SoundEffectSystem());
                this.world.setSystem(new CollisionSystem(game));
                this.world.setSystem(new ExpiringSystem());
                this.world.setSystem(new EntitySpawningTimerSystem(game));
                this.world.setSystem(new ParallaxStarRepeatingSystem());
                this.world.setSystem(new ColorAnimationSystem());
                this.world.setSystem(new ScaleAnimationSystem());
                this.world.setSystem(new RemoveOffscreenShipsSystem());
                this.spriteRenderSystem = this.world.setSystem(new SpriteRenderSystem(game), true);
                this.healthRenderSystem = this.world.setSystem(new HealthRenderSystem(), true);
                this.hudRenderSystem = this.world.setSystem(new HudRenderSystem(), true);
                this.world.initialize();
                core.EntityFactory.createPlayer(this.game, this.world, Constants.FRAME_WIDTH / 4, Constants.FRAME_HEIGHT - 80).addToWorld();
                for (var i = 0; 500 > i; i++) {
                    core.EntityFactory.createStar(this.game, this.world).addToWorld();
                }
            }
            GameScreen.prototype.render = function (delta) {
                this.world.setDelta(delta);
                this.world.process();
                this.spriteRenderSystem.process();
                this.healthRenderSystem.process();
                this.hudRenderSystem.process();
            };
            GameScreen.ASPECT_RATIO = Constants.FRAME_WIDTH / Constants.FRAME_HEIGHT;
            return GameScreen;
        })();
        core.GameScreen = GameScreen;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=GameScreen.js.map