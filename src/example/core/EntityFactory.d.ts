declare module brokenspork.core {
    import Layer = brokenspork.components.Layer;
    import World = artemis.World;
    import Entity = artemis.Entity;
    class EntityFactory {
        static createPlayer(game: CCLayer, world: World, x: number, y: number): Entity;
        static createPlayerBullet(game: CCLayer, world: World, x: number, y: number): Entity;
        static createEnemyShip(game: CCLayer, world: World, name: string, layer: Layer, health: number, x: number, y: number, velocityX: number, velocityY: number, boundsRadius: number): Entity;
        static createSmallExplosion(game: CCLayer, world: World, x: number, y: number): Entity;
        static createBigExplosion(game: CCLayer, world: World, x: number, y: number): Entity;
        static createExplosion(game: CCLayer, world: World, x: number, y: number, scale: number): Entity;
        static createStar(game: CCLayer, world: World): Entity;
        static createParticle(game: CCLayer, world: World, x: number, y: number): Entity;
    }
}
