module artemis {
	
	import HashMap = artemis.utils.HashMap;
	import PooledComponent = artemis.PooledComponent;
  import Pooled = artemis.annotations.Pooled;
  import ComponentManager = artemis.ComponentManager;

  export enum Taxonomy {
    BASIC, POOLED //, PACKED
  }
	export class ComponentType {
		private static INDEX:number = 0;
    public static componentManager:ComponentManager;
	
		private index_:number=0;
		private type_:Function;
    private taxonomy_:Taxonomy;

		constructor(type:Function, index?:number) {
      if (index !== undefined) {
        this.index_ = ComponentType.INDEX++;
      } else {
        this.index_ = index;
      }
			this.type_ = type;
      if (Pooled['pooledComponents'][artemis.getClassName(type)] === type) {
        this.taxonomy_ = Taxonomy.POOLED;
      } else {
        this.taxonomy_ = Taxonomy.BASIC;
      }
		}

    public getName():string {
      return artemis.getClassName(this.type_);
    }

		public getIndex():number {
			return this.index_;
		}

    public getTaxonomy():Taxonomy {
      return this.taxonomy_;
    }
		
		public toString():string {
			return "ComponentType["+artemis.getClassName(ComponentType)+"] ("+this.index_+")";
		}
	
	}
}