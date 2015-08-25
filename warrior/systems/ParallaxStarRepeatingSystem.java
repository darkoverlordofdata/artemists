package net.brokenspork.systems;

import net.brokenspork.components.ParallaxStar;
import net.brokenspork.components.Position;
import net.brokenspork.core.Constants;

import com.artemis.Aspect;
import com.artemis.ComponentMapper;
import com.artemis.Entity;
import com.artemis.annotations.Mapper;
import com.artemis.systems.IntervalEntityProcessingSystem;

public class ParallaxStarRepeatingSystem extends IntervalEntityProcessingSystem {
	@Mapper
	ComponentMapper<Position> pm;

	@SuppressWarnings("unchecked")
    public ParallaxStarRepeatingSystem() {
		super(Aspect.getAspectForAll(ParallaxStar.class, Position.class), 1);
	}

	@Override
	protected void process(Entity e) {
		Position position = pm.get(e);

		if (position.y < -Constants.FRAME_HEIGHT / 2) {
			position.y = Constants.FRAME_HEIGHT / 2;
		}
	}

}
