module artemis {
	export module utils {
		var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
		
		export class UUID {
			
		/**
		* Fast UUID generator, RFC4122 version 4 compliant.
		* @author Jeff Ward (jcward.com).
		* @license MIT license
		* @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
		**/			
 		static randomUUID() {
				var d0 = Math.random()*0xffffffff|0;
				var d1 = Math.random()*0xffffffff|0;
				var d2 = Math.random()*0xffffffff|0;
				var d3 = Math.random()*0xffffffff|0;
				return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
					lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
					lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
					lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
			}				
			
			/**
			 * Serendipity Theory:
			 * 
			 * What we call 'luck', is a contigous stream of randomness.
			 * The game user has a more realistic 'luck' experience when 
			 * seperate instances of prng's are used per player/agent.
			 * 
			 * ex:
			 * System requirements for a prng source use Math.random().
			 * Each player owns an instance of a MersenneTwister. 
			 * 
			 */
			// static randomUUID():UUID {
			// 	var d = performace.now();
			// 	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			// 			var r = (d + Math.random()*16)%16 | 0;
			// 			d = Math.floor(d/16);
			// 			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
			// 	});
			// 	return uuid;				
			// }
		}
	}
}