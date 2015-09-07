declare module artemis {
    import ImmutableBag = artemis.utils.ImmutableBag;
    /**
    * The primary instance for the framework. It contains all the managers.
    *
    * You must use this to create, delete and retrieve entities.
    *
    * It is also important to set the delta each game loop iteration, and initialize before game loop.
    *
    * @author Arni Arent
    *
    */
    class World {
        private em_;
        private cm_;
        delta: number;
        private added_;
        private changed_;
        private deleted_;
        private enable_;
        private disable_;
        private managers_;
        private managersBag_;
        private systems_;
        private systemsBag_;
        constructor();
        /**
        * Makes sure all managers systems are initialized in the order they were added.
        */
        initialize(): void;
        /**
        * Returns a manager that takes care of all the entities in the world.
        * entities of this world.
        *
        * @return entity manager.
        */
        getEntityManager(): EntityManager;
        /**
        * Returns a manager that takes care of all the components in the world.
        *
        * @return component manager.
        */
        getComponentManager(): ComponentManager;
        /**
        * Add a manager into this world. It can be retrieved later.
        * World will notify this manager of changes to entity.
        *
        * @param manager to be added
        */
        setManager(manager: Manager): Manager;
        /**
        * Returns a manager of the specified type.
        *
        * @param <T>
        * @param managerType
        *            class type of the manager
        * @return the manager
        */
        getManager<T extends Manager>(managerType: Function): T;
        /**
        * Deletes the manager from this world.
        * @param manager to delete.
        */
        deleteManager(manager: Manager): void;
        /**
        * Time since last game loop.
        *
        * @return delta time since last game loop.
        */
        getDelta(): number;
        /**
        * You must specify the delta for the game here.
        *
        * @param delta time since last game loop.
        */
        setDelta(delta: number): void;
        /**
        * Adds a entity to this world.
        *
        * @param e entity
        */
        addEntity(e: Entity): void;
        /**
        * Ensure all systems are notified of changes to this entity.
        * If you're adding a component to an entity after it's been
        * added to the world, then you need to invoke this method.
        *
        * @param e entity
        */
        changedEntity(e: Entity): void;
        /**
        * Delete the entity from the world.
        *
        * @param e entity
        */
        deleteEntity(e: Entity): void;
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        enable(e: Entity): void;
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        disable(e: Entity): void;
        /**
        * Create and return a new or reused entity instance.
        * Will NOT add the entity to the world, use World.addEntity(Entity) for that.
        *
        * @return entity
        */
        createEntity(): Entity;
        /**
        * Get a entity having the specified id.
        *
        * @param entityId
        * @return entity
        */
        getEntity(entityId: number): Entity;
        /**
        * Gives you all the systems in this world for possible iteration.
        *
        * @return all entity systems in world.
        */
        getSystems(): ImmutableBag<EntitySystem>;
        /**
        * Adds a system to this world that will be processed by World.process()
        *
        * @param system the system to add.
        * @return the added system.
        */
        /**
        * Will add a system to this world.
        *
        * @param system the system to add.
        * @param passive wether or not this system will be processed by World.process()
        * @return the added system.
        */
        setSystem<T extends EntitySystem>(system: T, passive?: boolean): T;
        /**
        * Removed the specified system from the world.
        * @param system to be deleted from world.
        */
        deleteSystem(system: EntitySystem): void;
        private notifySystems(performer, e);
        private notifyManagers(performer, e);
        /**
        * Retrieve a system for specified system type.
        *
        * @param type type of system.
        * @return instance of the system in this world.
        */
        getSystem(type: Function): EntitySystem;
        /**
        * Performs an action on each entity.
        * @param entities
        * @param performer
        */
        private check(entities, performer);
        /**
        * Process all non-passive systems.
        */
        process(): void;
        /**
        * Retrieves a ComponentMapper instance for fast retrieval of components from entities.
        *
        * @param type of component to get mapper for.
        * @return mapper for specified component type.
        */
        getMapper<T extends Component>(type: Function): ComponentMapper<T>;
    }
}
