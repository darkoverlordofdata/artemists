package net.brokenspork.systems;

import net.brokenspork.components.ColorAnimation;
import net.brokenspork.components.Sprite;

import com.artemis.Aspect;
import com.artemis.ComponentMapper;
import com.artemis.Entity;
import com.artemis.annotations.Mapper;
import com.artemis.systems.EntityProcessingSystem;

public class ColorAnimationSystem extends EntityProcessingSystem {
	@Mapper ComponentMapper<ColorAnimation> cam;
	@Mapper ComponentMapper<Sprite> sm;

	public ColorAnimationSystem() {
		super(Aspect.getAspectForAll(ColorAnimation.class, Sprite.class));
	}

	@Override
	protected void process(Entity e) {
		ColorAnimation c = cam.get(e);
		Sprite sprite = sm.get(e);
		
		if(c.alphaAnimate) {
			sprite.a += c.alphaSpeed * world.delta;
			
			if(sprite.a > c.alphaMax || sprite.a < c.alphaMin) {
				if(c.repeat) {
					c.alphaSpeed = -c.alphaSpeed;
				} else {
					c.alphaAnimate = false;
				}
			}
		}
	}

}
