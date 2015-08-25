package net.brokenspork.systems;

import net.brokenspork.components.SoundEffect;
import net.brokenspork.components.SoundEffect.EFFECT;

import com.artemis.Aspect;
import com.artemis.ComponentMapper;
import com.artemis.Entity;
import com.artemis.annotations.Mapper;
import com.artemis.systems.EntityProcessingSystem;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.audio.Sound;

public class SoundEffectSystem extends EntityProcessingSystem {

	@Mapper
	ComponentMapper<SoundEffect> se;

	Sound pew = Gdx.audio.newSound(Gdx.files.internal("sounds/pew.wav"));
	Sound asplode = Gdx.audio.newSound(Gdx.files.internal("sounds/asplode.wav"));
	Sound smallasplode = Gdx.audio.newSound(Gdx.files.internal("sounds/smallasplode.wav"));

	@Override
	protected void initialize() {

	}

	@SuppressWarnings("unchecked")
	public SoundEffectSystem() {
		super(Aspect.getAspectForAll(SoundEffect.class));
	}

	@Override
    protected void process(Entity e) {

		SoundEffect soundEffect = se.get(e);
		
		switch (soundEffect.effect) {
		case PEW:
			pew.play();
			break;
		case ASPLODE:
			asplode.play();
			break;
		case SMALLASPLODE:
			smallasplode.play();
			break;
		default:
			break;
		}

		e.removeComponent(soundEffect);
		e.changedInWorld();
    }
}
