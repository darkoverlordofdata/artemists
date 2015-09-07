declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntitySystem = artemis.EntitySystem;
    /**
    * This system has an empty aspect so it processes no entities, but it still gets invoked.
    * You can use this system if you need to execute some game logic and not have to concern
    * yourself about aspects or entities.
    *
    * @author Arni Arent
    *
    */
    class VoidEntitySystem extends EntitySystem {
        constructor();
        protected processEntities(entities: ImmutableBag<Entity>): void;
        protected processSystem(): void;
        protected checkProcessing(): boolean;
    }
}
