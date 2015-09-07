declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import Velocity = brokenspork.components.Velocity;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class MovementSystem extends EntityProcessingSystem {
        pm: ComponentMapper<Position>;
        vm: ComponentMapper<Velocity>;
        constructor();
        processEach(e: Entity): void;
    }
}
