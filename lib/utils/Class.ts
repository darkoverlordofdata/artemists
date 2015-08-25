module artemis {
	export module utils {

		export class Class<T> {
			
			private class_;
			public name:string;
			
			constructor(obj:Object, name?:string) {
				this.class_ = obj.constructor;
				if (name === null) {
					this.name = this.class_.name;
				}	 else {
					this.name = name;
				}
			}
			
			getSimpleName():string {
				return this.name;	
			}
		}
	}
}
