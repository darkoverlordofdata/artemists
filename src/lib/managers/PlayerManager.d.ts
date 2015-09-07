declare module artemis.managers {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import Manager = artemis.Manager;
    /**
    * You may sometimes want to specify to which player an entity belongs to.
    *
    * An entity can only belong to a single player at a time.
    *
    * @author Arni Arent
    *
    */
    class PlayerManager extends Manager {
        private playerByEntity_;
        private entitiesByPlayer_;
        constructor();
        setPlayer(e: Entity, player: string): void;
        getEntitiesOfPlayer(player: string): ImmutableBag<Entity>;
        removeFromPlayer(e: Entity): void;
        getPlayer(e: Entity): any;
        initialize(): void;
        deleted(e: Entity): void;
    }
}
