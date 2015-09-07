declare module brokenspork.systems {
    import Expires = brokenspork.components.Expires;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;
    class ExpiringSystem extends DelayedEntityProcessingSystem {
        em: ComponentMapper<Expires>;
        constructor();
        protected processDelta(e: Entity, accumulatedDelta: number): void;
        protected processExpired(e: Entity): void;
        protected getRemainingDelay(e: Entity): number;
    }
}
