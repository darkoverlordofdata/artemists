declare module brokenspork.systems {
    import Health = brokenspork.components.Health;
    import Position = brokenspork.components.Position;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class HealthRenderSystem extends EntityProcessingSystem {
        pm: ComponentMapper<Position>;
        hm: ComponentMapper<Health>;
        private texts;
        private game;
        constructor(game: CCLayer);
        inserted(e: Entity): void;
        protected removed(e: Entity): void;
        processEach(e: Entity): void;
    }
}
