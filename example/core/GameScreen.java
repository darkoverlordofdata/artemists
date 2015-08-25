package net.brokenspork.core;

import net.brokenspork.systems.CollisionSystem;
import net.brokenspork.systems.ColorAnimationSystem;
import net.brokenspork.systems.EntitySpawningTimerSystem;
import net.brokenspork.systems.ExpiringSystem;
import net.brokenspork.systems.HealthRenderSystem;
import net.brokenspork.systems.HudRenderSystem;
import net.brokenspork.systems.MovementSystem;
import net.brokenspork.systems.ParallaxStarRepeatingSystem;
import net.brokenspork.systems.PlayerInputSystem;
import net.brokenspork.systems.RemoveOffscreenShipsSystem;
import net.brokenspork.systems.ScaleAnimationSystem;
import net.brokenspork.systems.SoundEffectSystem;
import net.brokenspork.systems.SpriteRenderSystem;

import com.artemis.World;
import com.artemis.managers.GroupManager;
import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.math.Vector2;

public class GameScreen implements Screen {

	private Game game;
	private World world;
	private OrthographicCamera camera;

	private SpriteRenderSystem spriteRenderSystem;
	private HealthRenderSystem healthRenderSystem;
	private HudRenderSystem hudRenderSystem;
	private SpriteBatch batch;
	private Rectangle viewport;
	private PlayerInputSystem playerInputSystem;

	private static final float ASPECT_RATIO = (float) Constants.FRAME_WIDTH / (float) Constants.FRAME_HEIGHT;

	public GameScreen(Game game) {
		this.batch = new SpriteBatch();
		this.game = game;
		this.camera = new OrthographicCamera(Constants.FRAME_WIDTH, Constants.FRAME_HEIGHT);

		world = new World();

		world.setManager(new GroupManager());
		world.setSystem(new MovementSystem());
		this.playerInputSystem = new PlayerInputSystem(camera, viewport);
		world.setSystem(playerInputSystem);
		world.setSystem(new SoundEffectSystem());
		world.setSystem(new CollisionSystem());
		world.setSystem(new ExpiringSystem());
		world.setSystem(new EntitySpawningTimerSystem());
		world.setSystem(new ParallaxStarRepeatingSystem());
		world.setSystem(new ColorAnimationSystem());
		world.setSystem(new ScaleAnimationSystem());
		world.setSystem(new RemoveOffscreenShipsSystem());

		spriteRenderSystem = world.setSystem(new SpriteRenderSystem(camera, batch), true);
		healthRenderSystem = world.setSystem(new HealthRenderSystem(camera), true);
		hudRenderSystem = world.setSystem(new HudRenderSystem(camera), true);

		world.initialize();

		EntityFactory.createPlayer(world, 0, 0).addToWorld();

		for (int i = 0; 500 > i; i++) {
			EntityFactory.createStar(world).addToWorld();
		}

	}

	@Override
	public void render(float delta) {
		Gdx.gl.glClearColor(0, 0, 0, 0);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

		camera.update();

		Gdx.gl.glViewport((int) viewport.x, (int) viewport.y,
                (int) viewport.width, (int) viewport.height);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
		
		world.setDelta(delta);
		if (Gdx.input.isKeyPressed(Input.Keys.SPACE)) {
			for (int i = 0; 10 > i; i++) {
				world.process();
			}
		}
		world.process();

		spriteRenderSystem.process();
		healthRenderSystem.process();
		hudRenderSystem.process();
	}

	@Override
	public void resize(int width, int height) {
		// calculate new viewport
		float aspectRatio = (float) width / (float) height;
		float scale = 1f;
		Vector2 crop = new Vector2(0f, 0f);

		if (aspectRatio > ASPECT_RATIO) {
			scale = (float) height / (float) Constants.FRAME_HEIGHT;
			crop.x = (width - Constants.FRAME_WIDTH * scale) / 2f;
		} else if (aspectRatio < ASPECT_RATIO) {
			scale = (float) width / (float) Constants.FRAME_WIDTH;
			crop.y = (height - Constants.FRAME_HEIGHT * scale) / 2f;
		} else {
			scale = (float) width / (float) Constants.FRAME_WIDTH;
		}

		float w = (float) Constants.FRAME_WIDTH * scale;
		float h = (float) Constants.FRAME_HEIGHT * scale;
		viewport = new Rectangle(crop.x, crop.y, w, h);
		playerInputSystem.setViewport(viewport);
	}

	@Override
	public void show() {
	}

	@Override
	public void hide() {
	}

	@Override
	public void pause() {
	}

	@Override
	public void resume() {
	}

	@Override
	public void dispose() {
	}

}
