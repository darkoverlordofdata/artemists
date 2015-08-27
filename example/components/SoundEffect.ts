module brokenspork.components {
	
	import Component = artemis.Component;

	export enum EFFECT {
		PEW, ASPLODE, SMALLASPLODE
		
	};
		
	export class SoundEffect extends Component {
		
  	public static className = 'SoundEffect';
		public effect:EFFECT;
		
	}
	
	SoundEffect.prototype.effect = EFFECT.PEW;
}

