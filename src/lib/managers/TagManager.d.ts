declare module artemis.managers {
    import Manager = artemis.Manager;
    /**
    * If you need to tag any entity, use this. A typical usage would be to tag
    * entities such as "PLAYER", "BOSS" or something that is very unique.
    *
    * @author Arni Arent
    *
    */
    class TagManager extends Manager {
        private entitiesByTag_;
        private tagsByEntity_;
        constructor();
        register(tag: string, e: Entity): void;
        unregister(tag: string): void;
        isRegistered(tag: string): boolean;
        getEntity(tag: string): Entity;
        getRegisteredTags(): string[];
        deleted(e: Entity): void;
        initialize(): void;
    }
}
