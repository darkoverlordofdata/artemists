declare module artemis {
    import Manager = artemis.Manager;
    class EntityManager extends Manager {
        private entities_;
        private disabled_;
        private active_;
        private added_;
        private created_;
        private deleted_;
        private identifierPool_;
        constructor();
        initialize(): void;
        createEntityInstance(): Entity;
        added(e: Entity): void;
        enabled(e: Entity): void;
        disabled(e: Entity): void;
        deleted(e: Entity): void;
        /**
        * Check if this entity is active.
        * Active means the entity is being actively processed.
        *
        * @param entityId
        * @return true if active, false if not.
        */
        isActive(entityId: number): boolean;
        /**
        * Check if the specified entityId is enabled.
        *
        * @param entityId
        * @return true if the entity is enabled, false if it is disabled.
        */
        isEnabled(entityId: number): boolean;
        /**
        * Get a entity with this id.
        *
        * @param entityId
        * @return the entity
        */
        getEntity(entityId: number): Entity;
        /**
        * Get how many entities are active in this world.
        * @return how many entities are currently active.
        */
        getActiveEntityCount(): number;
        /**
        * Get how many entities have been created in the world since start.
        * Note: A created entity may not have been added to the world, thus
        * created count is always equal or larger than added count.
        * @return how many entities have been created since start.
        */
        getTotalCreated(): number;
        /**
        * Get how many entities have been added to the world since start.
        * @return how many entities have been added.
        */
        getTotalAdded(): number;
        /**
        * Get how many entities have been deleted from the world since start.
        * @return how many entities have been deleted since start.
        */
        getTotalDeleted(): number;
    }
}
