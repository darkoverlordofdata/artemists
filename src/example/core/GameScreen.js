var example;
(function (example) {
    var core;
    (function (core) {
        var CollisionSystem = example.systems.CollisionSystem;
        var ColorAnimationSystem = example.systems.ColorAnimationSystem;
        var EntitySpawningTimerSystem = example.systems.EntitySpawningTimerSystem;
        var ExpiringSystem = example.systems.ExpiringSystem;
        var HealthRenderSystem = example.systems.HealthRenderSystem;
        var MovementSystem = example.systems.MovementSystem;
        var ParallaxStarRepeatingSystem = example.systems.ParallaxStarRepeatingSystem;
        var PlayerInputSystem = example.systems.PlayerInputSystem;
        var RemoveOffscreenShipsSystem = example.systems.RemoveOffscreenShipsSystem;
        var ScaleAnimationSystem = example.systems.ScaleAnimationSystem;
        var SpriteRenderSystem = example.systems.SpriteRenderSystem;
        var GroupManager = artemis.managers.GroupManager;
        var EntitySystem = artemis.EntitySystem;
        var GameScreen = (function () {
            function GameScreen(game) {
                EntitySystem.blackBoard.setEntry('game', game);
                var world = this.world = new artemis.World();
                world.setManager(new GroupManager());
                world.setSystem(new MovementSystem());
                world.setSystem(new PlayerInputSystem(game));
                //world.setSystem(new SoundEffectSystem());
                world.setSystem(new CollisionSystem(game));
                world.setSystem(new ExpiringSystem());
                world.setSystem(new EntitySpawningTimerSystem(game));
                world.setSystem(new ParallaxStarRepeatingSystem());
                world.setSystem(new ColorAnimationSystem());
                world.setSystem(new ScaleAnimationSystem());
                world.setSystem(new RemoveOffscreenShipsSystem());
                this.spriteRenderSystem = world.setSystem(new SpriteRenderSystem(game), true);
                this.healthRenderSystem = world.setSystem(new HealthRenderSystem(game), true);
                world.initialize();
                world.createEntityFromTemplate('player').addToWorld();
                for (var i = 0; 5 > i; i++) {
                    world.createEntityFromTemplate('star').addToWorld();
                }
            }
            GameScreen.prototype.render = function (delta) {
                this.world.setDelta(delta);
                this.world.process();
                this.spriteRenderSystem.process();
                this.healthRenderSystem.process();
            };
            return GameScreen;
        })();
        core.GameScreen = GameScreen;
    })(core = example.core || (example.core = {}));
})(example || (example = {}));
//# sourceMappingURL=GameScreen.js.map