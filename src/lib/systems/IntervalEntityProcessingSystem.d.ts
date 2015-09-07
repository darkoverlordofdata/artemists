declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import IntervalEntitySystem = artemis.systems.IntervalEntitySystem;
    /**
    * If you need to process entities at a certain interval then use this.
    * A typical usage would be to regenerate ammo or health at certain intervals, no need
    * to do that every game loop, but perhaps every 100 ms. or every second.
    *
    * @author Arni Arent
    *
    */
    class IntervalEntityProcessingSystem extends IntervalEntitySystem {
        constructor(aspect: Aspect, interval: number);
        /**
        * Process a entity this system is interested in.
        * @param e the entity to process.
        */
        processEach(e: Entity): void;
        protected processEntities(entities: ImmutableBag<Entity>): void;
    }
}
