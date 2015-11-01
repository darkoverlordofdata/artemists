module example.components {
	
	import Component = artemis.Component;
	import PooledComponent = artemis.PooledComponent;
	import Pooled = artemis.annotations.Pooled;

	export enum EFFECT {
		PEW, ASPLODE, SMALLASPLODE
		
	}

  @Pooled()
	export class SoundEffect extends PooledComponent {
		
  	public static className = 'SoundEffect';
		public initialize(effect:EFFECT=EFFECT.PEW) {
			this.effect = effect;
		}
		public effect:EFFECT;
		
	}
	
	SoundEffect.prototype.effect = EFFECT.PEW;
}

