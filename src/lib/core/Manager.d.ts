declare module artemis {
    import EntityObserver = artemis.EntityObserver;
    /**
    * Manager.
    *
    * @author Arni Arent
    *
    */
    class Manager implements EntityObserver {
        protected world_: World;
        initialize(): void;
        setWorld(world: World): void;
        getWorld(): World;
        added(e: Entity): void;
        changed(e: Entity): void;
        deleted(e: Entity): void;
        disabled(e: Entity): void;
        enabled(e: Entity): void;
    }
}
