package net.brokenspork.systems;

import net.brokenspork.components.Position;
import net.brokenspork.components.Velocity;

import com.artemis.Aspect;
import com.artemis.ComponentMapper;
import com.artemis.Entity;
import com.artemis.annotations.Mapper;
import com.artemis.systems.EntityProcessingSystem;

public class MovementSystem extends EntityProcessingSystem {
	@Mapper ComponentMapper<Position> pm;
	@Mapper ComponentMapper<Velocity> vm;

	@SuppressWarnings("unchecked")
    public MovementSystem() {
		super(Aspect.getAspectForAll(Position.class, Velocity.class));
	}

	@Override
	protected void process(Entity e) {
		Position position = pm.get(e);
		Velocity velocity = vm.get(e);
		
		if(velocity == null) {
		    return;
		}
		position.x += velocity.vectorX*world.delta;
		position.y += velocity.vectorY*world.delta;
	}

}
