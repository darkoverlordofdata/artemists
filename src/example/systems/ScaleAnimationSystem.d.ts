declare module brokenspork.systems {
    import ScaleAnimation = brokenspork.components.ScaleAnimation;
    import Sprite = brokenspork.components.Sprite;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class ScaleAnimationSystem extends EntityProcessingSystem {
        sa: ComponentMapper<ScaleAnimation>;
        sm: ComponentMapper<Sprite>;
        constructor();
        processEach(e: Entity): void;
    }
}
