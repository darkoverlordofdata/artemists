declare module artemis {
    import Component = artemis.Component;
    import Entity = artemis.Entity;
    /**
    * High performance component retrieval from entities. Use this wherever you
    * need to retrieve components from entities often and fast.
    *
    * @author Arni Arent
    *
    * @param <A> the class type of the component
    */
    class ComponentMapper<A extends Component> {
        private type_;
        private classType_;
        private components_;
        constructor(type: Function, world: World);
        /**
        * Fast but unsafe retrieval of a component for this entity.
        * No bounding checks, so this could throw an ArrayIndexOutOfBoundsExeption,
        * however in most scenarios you already know the entity possesses this component.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        get(e: Entity): A;
        /**
        * Fast and safe retrieval of a component for this entity.
        * If the entity does not have this component then null is returned.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        getSafe(e: Entity): A;
        /**
        * Checks if the entity has this type of component.
        * @param e the entity to check
        * @return true if the entity has this component type, false if it doesn't.
        */
        has(e: Entity): boolean;
        /**
        * Returns a component mapper for this type of components.
        *
        * @param type the type of components this mapper uses.
        * @param world the world that this component mapper should use.
        * @return a new mapper.
        */
        static getFor<T extends Component>(type: Function, world: World): ComponentMapper<T>;
    }
}
