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
        var GameScreen = (function () {
            function GameScreen(game) {
                //this.batch = new SpriteBatch();
                this.game = game;
                //this.camera = new OrthographicCamera(Constants.FRAME_WIDTH, Constants.FRAME_HEIGHT);
                this.world = new artemis.World();
                this.world.setManager(new GroupManager());
                this.world.setSystem(new MovementSystem());
                this.playerInputSystem = new PlayerInputSystem(camera, viewport);
                this.world.setSystem(playerInputSystem);
                this.world.setSystem(new SoundEffectSystem());
                this.world.setSystem(new CollisionSystem());
                this.world.setSystem(new ExpiringSystem());
                this.world.setSystem(new EntitySpawningTimerSystem());
                this.world.setSystem(new ParallaxStarRepeatingSystem());
                this.world.setSystem(new ColorAnimationSystem());
                this.world.setSystem(new ScaleAnimationSystem());
                this.world.setSystem(new RemoveOffscreenShipsSystem());
                this.spriteRenderSystem = this.world.setSystem(new SpriteRenderSystem(camera, batch), true);
                this.healthRenderSystem = this.world.setSystem(new HealthRenderSystem(camera), true);
                this.hudRenderSystem = this.world.setSystem(new HudRenderSystem(camera), true);
                this.world.initialize();
                core.EntityFactory.createPlayer(this.world, 0, 0).addToWorld();
                for (var i = 0; 500 > i; i++) {
                    core.EntityFactory.createStar(this.world).addToWorld();
                }
            }
            //@Override
            GameScreen.prototype.render = function (delta) {
                this.world.setDelta(delta);
                if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
                    for (var i = 0; 10 > i; i++) {
                        this.world.process();
                    }
                }
                this.world.process();
                this.spriteRenderSystem.process();
                this.healthRenderSystem.process();
                this.hudRenderSystem.process();
            };
            //@Override
            // public void resize(int width, int height) {
            // 	// calculate new viewport
            // 	float aspectRatio = (float) width / (float) height;
            // 	float scale = 1f;
            // 	Vector2 crop = new Vector2(0f, 0f);
            // 	if (aspectRatio > ASPECT_RATIO) {
            // 		scale = (float) height / (float) Constants.FRAME_HEIGHT;
            // 		crop.x = (width - Constants.FRAME_WIDTH * scale) / 2f;
            // 	} else if (aspectRatio < ASPECT_RATIO) {
            // 		scale = (float) width / (float) Constants.FRAME_WIDTH;
            // 		crop.y = (height - Constants.FRAME_HEIGHT * scale) / 2f;
            // 	} else {
            // 		scale = (float) width / (float) Constants.FRAME_WIDTH;
            // 	}
            // 	float w = (float) Constants.FRAME_WIDTH * scale;
            // 	float h = (float) Constants.FRAME_HEIGHT * scale;
            // 	viewport = new Rectangle(crop.x, crop.y, w, h);
            // 	playerInputSystem.setViewport(viewport);
            // }
            //@Override
            GameScreen.prototype.show = function () {
            };
            //@Override
            GameScreen.prototype.hide = function () {
            };
            //@Override
            GameScreen.prototype.pause = function () {
            };
            //@Override
            GameScreen.prototype.resume = function () {
            };
            //@Override
            GameScreen.prototype.dispose = function () {
            };
            GameScreen.ASPECT_RATIO = core.Constants.FRAME_WIDTH / core.Constants.FRAME_HEIGHT;
            return GameScreen;
        })();
        core.GameScreen = GameScreen;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=GameScreen.js.map