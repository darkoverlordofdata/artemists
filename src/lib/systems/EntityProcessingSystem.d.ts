declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntitySystem = artemis.EntitySystem;
    /**
    * A typical entity system. Use this when you need to process entities possessing the
    * provided component types.
    *
    * @author Arni Arent
    *
    */
    class EntityProcessingSystem extends EntitySystem {
        constructor(aspect: Aspect);
        /**
        * Process a entity this system is interested in.
        * @param e the entity to process.
        */
        protected processEach(e: Entity): void;
        protected processEntities(entities: ImmutableBag<Entity>): void;
        protected checkProcessing(): boolean;
    }
}
