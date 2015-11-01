module example.systems {

  import EFFECT = example.components.EFFECT;
	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
  import SoundEffectComponent = artemis.components.SoundEffectComponent;

	export class SoundEffectSystem extends EntityProcessingSystem {
	
		constructor() {
			super(Aspect.getAspectForAll(SoundEffectComponent));
		}
	
		
		public processEach(e:Entity) {
      var soundEffect:SoundEffectComponent = e.soundEffect;

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

