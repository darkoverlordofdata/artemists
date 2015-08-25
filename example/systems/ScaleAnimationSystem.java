package net.brokenspork.systems;

import net.brokenspork.components.ScaleAnimation;
import net.brokenspork.components.Sprite;

import com.artemis.Aspect;
import com.artemis.ComponentMapper;
import com.artemis.Entity;
import com.artemis.annotations.Mapper;
import com.artemis.systems.EntityProcessingSystem;

public class ScaleAnimationSystem extends EntityProcessingSystem {
	@Mapper
	ComponentMapper<ScaleAnimation> sa;
	@Mapper
	ComponentMapper<Sprite> sm;

	@SuppressWarnings("unchecked")
    public ScaleAnimationSystem() {
		super(Aspect.getAspectForAll(ScaleAnimation.class));
	}

	@Override
	protected void process(Entity e) {
		ScaleAnimation scaleAnimation = sa.get(e);
		if (scaleAnimation.active) {
			Sprite sprite = sm.get(e);

			sprite.scaleX += scaleAnimation.speed * world.delta;
			sprite.scaleY = sprite.scaleX;

			if (sprite.scaleX > scaleAnimation.max) {
				sprite.scaleX = scaleAnimation.max;
				scaleAnimation.active = false;
			} else if (sprite.scaleX < scaleAnimation.min) {
				sprite.scaleX = scaleAnimation.min;
				scaleAnimation.active = false;
			}
		}
	}

}
