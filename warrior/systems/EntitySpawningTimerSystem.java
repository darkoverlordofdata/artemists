package net.brokenspork.systems;

import net.brokenspork.components.Sprite;
import net.brokenspork.core.Constants;
import net.brokenspork.core.EntityFactory;

import com.artemis.systems.VoidEntitySystem;
import com.artemis.utils.Timer;
import com.badlogic.gdx.math.MathUtils;

public class EntitySpawningTimerSystem extends VoidEntitySystem {

	private Timer timer1;
	private Timer timer2;
	private Timer timer3;

	public EntitySpawningTimerSystem() {
		timer1 = new Timer(2, true) {
			@Override
			public void execute() {
				EntityFactory.createEnemyShip(world, "enemy1", Sprite.Layer.ACTORS_3, 10, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 50, 0, -40, 20).addToWorld();
			}
		};

		timer2 = new Timer(6, true) {
			@Override
			public void execute() {
				EntityFactory.createEnemyShip(world, "enemy2", Sprite.Layer.ACTORS_2, 20, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 100, 0, -30, 40).addToWorld();
			}
		};

		timer3 = new Timer(12, true) {
			@Override
			public void execute() {
				EntityFactory.createEnemyShip(world, "enemy3", Sprite.Layer.ACTORS_1, 60, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 200, 0, -20, 70).addToWorld();
			}
		};
	}

	@Override
	protected void processSystem() {
		timer1.update(world.delta);
		timer2.update(world.delta);
		timer3.update(world.delta);
	}

}
