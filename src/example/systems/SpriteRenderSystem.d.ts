declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import Sprite = brokenspork.components.Sprite;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntitySystem = artemis.EntitySystem;
    import ImmutableBag = artemis.utils.ImmutableBag;
    class SpriteRenderSystem extends EntitySystem {
        pm: ComponentMapper<Position>;
        sm: ComponentMapper<Sprite>;
        private regions;
        private font;
        private regionsByEntity;
        private sortedEntities;
        private game;
        constructor(game: CCLayer);
        initialize(): void;
        protected checkProcessing(): boolean;
        processEntities(entities: ImmutableBag<Entity>): void;
        processEach(e: Entity): void;
        inserted(e: Entity): void;
        protected removed(e: Entity): void;
    }
}
