declare module brokenspork.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import Bounds = brokenspork.components.Bounds;
    import Expires = brokenspork.components.Expires;
    import Health = brokenspork.components.Health;
    import Position = brokenspork.components.Position;
    import EntitySystem = artemis.EntitySystem;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    class CollisionSystem extends EntitySystem {
        pm: ComponentMapper<Position>;
        bm: ComponentMapper<Bounds>;
        hm: ComponentMapper<Health>;
        ex: ComponentMapper<Expires>;
        private collisionPairs;
        private game;
        constructor(game: CCLayer);
        initialize(): void;
        protected processEntities(entities: ImmutableBag<Entity>): void;
        protected checkProcessing(): boolean;
    }
}
