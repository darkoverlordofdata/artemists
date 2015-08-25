module artemis {
	export module utils {

		export class HashMap<K,V> implements Map<K,V> {
			private keys_;
			private data_;
			private size_:number;
			private capacity_:number;
			
			constructor(capacity: number = 64) {
				this.size_ = 0;
				this.keys_ = new Array(capacity);
				this.data_ = new Array(capacity);
				this.capacity_ = capacity;
			}
			
			clear() {
				var size = this.size_;
				var keys = this.keys_;
				var data = this.data_;
				
				for (var index=0; size>index; index++) {
					keys[index] = null;
					data[index] = null;
				}
				this.size_ = 0;
			}
			
			contains(value):boolean {
				var size = this.size_;
				var data = this.data_;
				
				for(var index = 0; size > index; index++) {
					if(value === data[index]) {
						return true;
					}
				}
				return false;
			}
			
			containsKey(key):boolean {
				var size = this.size_;
				var keys = this.keys_;
				
				for(var index = 0; size > index; index++) {
					if(key === keys[index]) {
						return true;
					}
				}
				return false;
			}
			
			containsValue(value):boolean {
				var size = this.size_;
				var data = this.data_;
				
				for(var index = 0; size > index; index++) {
					if(value === data[index]) {
						return true;
					}
				}
				return false;
			}
			
			elements() {
				return this.data_;
			}
			
			values() {
				return this.data_;
			}
			
			get(key) {
				var size = this.size_;
				var keys = this.keys_;
				var data = this.data_;

				for(var index = 0; size > index; index++) {
					if(key === keys[index]) {
						return data[index];
					}
				}
				return null;
			}
			
			isEmpty():boolean {
				return this.size_ === 0;
			}
			
			keys() {
				return this.keys_;
			}
			
			put(key, value) {
				var size = this.size_;
				var keys = this.keys_;
				var data = this.data_;

				for(var index = 0; size > index; index++) {
					if(key === keys[index]) {
						data[index] = value;
						return;
					}
				}
				if (size >= data.length) {
					keys.length += this.capacity_;
					data.length += this.capacity_;
					this.capacity_ += this.capacity_; 
				}
				keys.push(key);
				data.push(value);
				this.size_ = data.length;
			}
			
			remove(key) {
				var size = this.size_;
				var keys = this.keys_;
				var data = this.data_;
				var last = size-1;

				for(var index = 0; size > index; index++) {
					if(key === keys[index]) {
						data[index] = data[last];
						keys[index] = keys[last];
						data[last] = null;
						keys[last] = null;
						this.size_ = last;
						return;
					}
				}
			}

			size():number {
				return this.size_;
			}
			
		}
	}
}
