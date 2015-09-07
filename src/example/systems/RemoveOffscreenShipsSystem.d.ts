declare module brokenspork.systems {
    import Bounds = brokenspork.components.Bounds;
    import Position = brokenspork.components.Position;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
    class RemoveOffscreenShipsSystem extends IntervalEntityProcessingSystem {
        pm: ComponentMapper<Position>;
        bm: ComponentMapper<Bounds>;
        constructor();
        processEach(e: Entity): void;
    }
}
