module example.systems {
	
	import SoundEffect = example.components.SoundEffect;
	import EFFECT = example.components.EFFECT;
	
	import Aspect = artemis.Aspect;
	import ComponentMapper = artemis.ComponentMapper;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
	import Mapper = artemis.annotations.Mapper;
	// import  = badlogic.gdx.Gdx;
	// import  = badlogic.gdx.audio.Sound;
	
	export class SoundEffectSystem extends EntityProcessingSystem {
	
		@Mapper(SoundEffect) se:ComponentMapper<SoundEffect>;
	
		// pew:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/pew.wav"));
		// asplode:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/asplode.wav"));
		// smallasplode:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/smallasplode.wav"));
	
		
		public initialize() {
	
		}
	
		//@SuppressWarnings("unchecked")
		constructor() {
			super(Aspect.getAspectForAll(SoundEffect));
		}
	
		
		public processEach(e:Entity) {
	
			var soundEffect:SoundEffect = this.se.get(e);

			switch (soundEffect.effect) {
			case EFFECT.PEW:
				//pew.play();
				break;
			case EFFECT.ASPLODE:
				//asplode.play();
				break;
			case EFFECT.SMALLASPLODE:
				//smallasplode.play();
				break;
			default:
				break;
			}
	
			e.removeComponentInstance(soundEffect);
			e.changedInWorld();
		}
	}
}

