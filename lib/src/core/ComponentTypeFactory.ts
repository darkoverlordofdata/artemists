module artemis {
  "use strict";

  //import java.util.IdentityHashMap;

  interface IdentityHashMap {
    [key: string]: ComponentType;
  }

  import Taxonomy = artemis.Taxonomy;
  import Bag = artemis.utils.Bag;
  import ComponentType = artemis.ComponentType;
  import Aspect = artemis.Aspect;

  export class ComponentTypeFactory {
    /**
     * Contains all generated component types, newly generated component types
     * will be stored here.
     */
    private componentTypes_:IdentityHashMap;

    /** Amount of generated component types. */
    private componentTypeCount_:number = 0;

    /** Index of this component type in componentTypes. */
    public types:Bag<ComponentType>;

    constructor() {
      this.componentTypes_ = {};
      this.types = new Bag<ComponentType>();
      Aspect.typeFactory = this;
    }

    /**
     * Gets the component type for the given component class.
     * <p>
     * If no component type exists yet, a new one will be created and stored
     * for later retrieval.
     * </p>
     *
     * @param c
     *			the component's class to get the type for
     *
     * @return the component's {@link ComponentType}
     */
    public getTypeFor(c):ComponentType {
      if ('number' === typeof c) {
        return this.types.get(parseInt(c));
      }

      var type:ComponentType = this.componentTypes_[artemis.getClassName(c)];

      if (type == null) {
        var index:number = this.componentTypeCount_++;
        type = new ComponentType(c, index);
        this.componentTypes_[artemis.getClassName(c)] = type;
        this.types.set(index, type);
      }

      return type;
    }

    /**
     * Get the index of the component type of given component class.
     *
     * @param c
     *			the component class to get the type index for
     *
     * @return the component type's index
     */
    public getIndexFor(c):number {
      return this.getTypeFor(c).getIndex();
    }

    public getTaxonomy(index:number):Taxonomy {
      return this.types.get(index).getTaxonomy();
    }

  }
}
