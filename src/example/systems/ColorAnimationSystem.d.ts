declare module brokenspork.systems {
    import ColorAnimation = brokenspork.components.ColorAnimation;
    import Sprite = brokenspork.components.Sprite;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    class ColorAnimationSystem extends EntityProcessingSystem {
        cam: ComponentMapper<ColorAnimation>;
        sm: ComponentMapper<Sprite>;
        constructor();
        protected processEach(e: Entity): void;
    }
}
