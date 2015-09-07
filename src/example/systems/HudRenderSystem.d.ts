declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import Sprite = brokenspork.components.Sprite;
    import ComponentMapper = artemis.ComponentMapper;
    import VoidEntitySystem = artemis.systems.VoidEntitySystem;
    class HudRenderSystem extends VoidEntitySystem {
        pm: ComponentMapper<Position>;
        sm: ComponentMapper<Sprite>;
        private activeEntities;
        private totalCreated;
        private totalDeleted;
        private game;
        constructor(game: CCLayer);
        initialize(): void;
        processSystem(): void;
    }
}
