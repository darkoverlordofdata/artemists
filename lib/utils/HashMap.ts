module artemis {
	export module utils {

		function decode(key) {
			switch(typeof key) {
				case 'boolean': 	return ''+key;
				case 'number': 		return ''+key;
				case 'string': 		return key;
				case 'function': 	return key.className | key.name;
				default: 					return key.uuid;
			}
		}
		export class HashMap<K,V> implements Map<K,V> {
			private map_;
			
			
			constructor() {
				this.clear();
			}
			
			clear() {
				this.map_ = {};
			}
			
			values() {
				var data = [];
				for (var key in this.map_) {
					data.push(this.map_[key]);
				}
				return data;
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
				return Object.keys(this.map_);
			}
			
			/**
			 * if key is a string, use as is, else use key.id_ or key.name
			 */
			put(key, value) {
				this.map_[decode(key)] = value;
			}
			
			remove(key) {
				delete this.map_[decode(key)];
			}

			size():number {
				return Object.keys(this.map_).length;
			}
			
		}
	}
}
