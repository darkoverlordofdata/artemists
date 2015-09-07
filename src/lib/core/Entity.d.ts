declare module artemis {
    import Bag = artemis.utils.Bag;
    import BitSet = artemis.utils.BitSet;
    import UUID = artemis.utils.UUID;
    /**
    * The entity class. Cannot be instantiated outside the framework, you must
    * create new entities using World.
    *
    * @author Arni Arent
    *
    */
    class Entity {
        uuid: string;
        private id_;
        private componentBits_;
        private systemBits_;
        private world_;
        private entityManager_;
        private componentManager_;
        constructor(world: World, id: number);
        /**
        * The internal id for this entity within the framework. No other entity
        * will have the same ID, but ID's are however reused so another entity may
        * acquire this ID if the previous entity was deleted.
        *
        * @return id of the entity.
        */
        getId(): number;
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        getComponentBits(): BitSet;
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        getSystemBits(): BitSet;
        /**
        * Make entity ready for re-use.
        * Will generate a new uuid for the entity.
        */
        protected reset(): void;
        toString(): string;
        /**
        * Add a component to this entity.
        *
        * @param component to add to this entity
        *
        * @return this entity for chaining.
        */
        /**
        * Faster adding of components into the entity. Not neccessery to use this, but
        * in some cases you might need the extra performance.
        *
        * @param component the component to add
        * @param type of the component
        *
        * @return this entity for chaining.
        */
        addComponent(component: Component, type?: ComponentType): Entity;
        /**
        * Removes the component from this entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        removeComponentInstance(component: Component): Entity;
        /**
        * Faster removal of components from a entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        removeComponent(type: ComponentType): Entity;
        /**
        * Remove component by its type.
        * @param type
        *
        * @return this entity for chaining.
        */
        removeComponentByType(type: Function): Entity;
        /**
        * Checks if the entity has been added to the world and has not been deleted from it.
        * If the entity has been disabled this will still return true.
        *
        * @return if it's active.
        */
        isActive(): boolean;
        /**
        * Will check if the entity is enabled in the world.
        * By default all entities that are added to world are enabled,
        * this will only return false if an entity has been explicitly disabled.
        *
        * @return if it's enabled
        */
        isEnabled(): boolean;
        /**
        * This is the preferred method to use when retrieving a component from a
        * entity. It will provide good performance.
        * But the recommended way to retrieve components from an entity is using
        * the ComponentMapper.
        *
        * @param type
        *            in order to retrieve the component fast you must provide a
        *            ComponentType instance for the expected component.
        * @return
        */
        getComponent(type: ComponentType): Component;
        /**
        * Slower retrieval of components from this entity. Minimize usage of this,
        * but is fine to use e.g. when creating new entities and setting data in
        * components.
        *
        * @param <T>
        *            the expected return component type.
        * @param type
        *            the expected return component type.
        * @return component that matches, or null if none is found.
        */
        getComponentByType(type: Function): Component;
        /**
        * Returns a bag of all components this entity has.
        * You need to reset the bag yourself if you intend to fill it more than once.
        *
        * @param fillBag the bag to put the components into.
        * @return the fillBag with the components in.
        */
        getComponents(fillBag: Bag<Component>): Bag<Component>;
        /**
        * Refresh all changes to components for this entity. After adding or
        * removing components, you must call this method. It will update all
        * relevant systems. It is typical to call this after adding components to a
        * newly created entity.
        */
        addToWorld(): void;
        /**
        * This entity has changed, a component added or deleted.
        */
        changedInWorld(): void;
        /**
        * Delete this entity from the world.
        */
        deleteFromWorld(): void;
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        enable(): void;
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        disable(): void;
        /**
        * Get the UUID for this entity.
        * This UUID is unique per entity (re-used entities get a new UUID).
        * @return uuid instance for this entity.
        */
        getUuid(): UUID;
        /**
        * Returns the world this entity belongs to.
        * @return world of entity.
        */
        getWorld(): World;
    }
}
