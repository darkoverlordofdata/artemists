declare module artemis {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntityObserver = artemis.EntityObserver;
    /**
    * The most raw entity system. It should not typically be used, but you can create your own
    * entity system handling by extending this. It is recommended that you use the other provided
    * entity system implementations.
    *
    * @author Arni Arent
    *
    */
    class EntitySystem implements EntityObserver {
        private systemIndex_;
        world: World;
        private actives_;
        private aspect_;
        private allSet_;
        private exclusionSet_;
        private oneSet_;
        private passive_;
        private dummy_;
        /**
        * Creates an entity system that uses the specified aspect as a matcher against entities.
        * @param aspect to match against entities
        */
        constructor(aspect: Aspect);
        /**
        * Called before processing of entities begins.
        */
        protected begin(): void;
        process(): void;
        /**
        * Called after the processing of entities ends.
        */
        protected end(): void;
        /**
        * Any implementing entity system must implement this method and the logic
        * to process the given entities of the system.
        *
        * @param entities the entities this system contains.
        */
        protected processEntities(entities: ImmutableBag<Entity>): void;
        /**
        *
        * @return true if the system should be processed, false if not.
        */
        protected checkProcessing(): boolean;
        /**
        * Override to implement code that gets executed when systems are initialized.
        */
        initialize(): void;
        /**
        * Called if the system has received a entity it is interested in, e.g. created or a component was added to it.
        * @param e the entity that was added to this system.
        */
        inserted(e: Entity): void;
        /**
        * Called if a entity was removed from this system, e.g. deleted or had one of it's components removed.
        * @param e the entity that was removed from this system.
        */
        protected removed(e: Entity): void;
        /**
        * Will check if the entity is of interest to this system.
        * @param e entity to check
        */
        protected check(e: Entity): void;
        private removeFromSystem(e);
        private insertToSystem(e);
        added(e: Entity): void;
        changed(e: Entity): void;
        deleted(e: Entity): void;
        disabled(e: Entity): void;
        enabled(e: Entity): void;
        setWorld(world: World): void;
        isPassive(): boolean;
        setPassive(passive: boolean): void;
        getActive(): ImmutableBag<Entity>;
    }
}
