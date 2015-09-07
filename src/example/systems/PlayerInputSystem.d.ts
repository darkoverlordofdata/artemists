declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import Velocity = brokenspork.components.Velocity;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class PlayerInputSystem extends EntityProcessingSystem {
        private static FireRate;
        pm: ComponentMapper<Position>;
        vm: ComponentMapper<Velocity>;
        private shoot;
        private timeToFire;
        private mouseVector;
        private game;
        constructor(game: CCLayer);
        initialize(): void;
        protected processEach(e: Entity): void;
    }
}
