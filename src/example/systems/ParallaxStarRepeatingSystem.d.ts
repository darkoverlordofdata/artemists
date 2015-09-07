declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
    class ParallaxStarRepeatingSystem extends IntervalEntityProcessingSystem {
        pm: ComponentMapper<Position>;
        constructor();
        processEach(e: Entity): void;
    }
}
