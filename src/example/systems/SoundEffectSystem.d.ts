declare module brokenspork.systems {
    import SoundEffect = brokenspork.components.SoundEffect;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class SoundEffectSystem extends EntityProcessingSystem {
        se: ComponentMapper<SoundEffect>;
        initialize(): void;
        constructor();
        processEach(e: Entity): void;
    }
}
