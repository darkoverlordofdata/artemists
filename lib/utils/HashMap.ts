module artemis {
	export module utils {

		/**
		 * Decode HashMap key
		 * 
		 * When the key is an object, we generate a unique uuid and use that as the actual key.
	 	 */
		function decode(key) {
			switch(typeof key) {
				case 'boolean': 	return ''+key;
				case 'number': 		return ''+key;
				case 'string': 		return key;
				case 'function': 	return key.className || key.name;
				default: 					
					key.uuid = key.uuid ? key.uuid : UUID.randomUUID();
					return key.uuid
			}
		}
		
		/**
		 * HashMap
		 * 
		 * Allow object as key. 
		 */
		export class HashMap<K,V> implements Map<K,V> {
			
			private map_;
			private keys_;
			
			constructor() {
				this.clear();
			}
			
			clear() {
				this.map_ = {};
				this.keys_ = {};
			}
			
			values() {
				var result = [];
				for (var key in this.map_) {
					result.push(this.map_[key]);
				}
				return result;
			}
			
			
			contains(value):boolean {
				for (var key in this.map_) {
					if (value === this.map_[key]) {
						return true;
					}
				}
				return false;
			}
			
			containsKey(key):boolean {
				return decode(key) in this.map_;
			}
			
			containsValue(value):boolean {
				for (var key in this.map_) {
					if (value === this.map_[key]) {
						return true;
					}
				}
				return false;
			}
			
			
			get(key) {
				return this.map_[decode(key)];
			}
			
			isEmpty():boolean {
				return Object.keys(this.map_).length === 0;
			}
			
			keys() {
				var result = [];
				for (var key in this.keys_) {
					result.push(this.keys_[key]);
				}
				return result;
			}
			
			/**
			 * if key is a string, use as is, else use key.id_ or key.name
			 */
			put(key, value) {
				var k = decode(key);
				this.map_[k] = value;
				this.keys_[k] = key;
			}
			
			remove(key) {
				var k = decode(key);
				delete this.map_[k];
				delete this.keys_[k];
			}

			size():number {
				return Object.keys(this.map_).length;
			}
			
		}
	}
}
