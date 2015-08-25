package net.brokenspork.systems;

import net.brokenspork.components.Bounds;
import net.brokenspork.components.Health;
import net.brokenspork.components.Player;
import net.brokenspork.components.Position;
import net.brokenspork.components.Velocity;
import net.brokenspork.core.Constants;

import com.artemis.Aspect;
import com.artemis.ComponentMapper;
import com.artemis.Entity;
import com.artemis.annotations.Mapper;
import com.artemis.systems.IntervalEntityProcessingSystem;

public class RemoveOffscreenShipsSystem extends IntervalEntityProcessingSystem {
	@Mapper ComponentMapper<Position> pm;
	@Mapper ComponentMapper<Bounds> bm;

	@SuppressWarnings("unchecked")
    public RemoveOffscreenShipsSystem() {
		super(Aspect.getAspectForAll(Velocity.class, Position.class, Health.class, Bounds.class), 5);
	}

	@Override
	protected void process(Entity e) {
		Position position = pm.get(e);
		Bounds bounds = bm.get(e);
		
		if(position.y < -Constants.FRAME_HEIGHT/2-bounds.radius) {
			e.deleteFromWorld();
		}
	}

}
