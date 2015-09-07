declare module artemis.managers {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import Manager = artemis.Manager;
    /**
    * If you need to group your entities together, e.g. tanks going into "units" group or explosions into "effects",
    * then use this manager. You must retrieve it using world instance.
    *
    * A entity can be assigned to more than one group.
    *
    * @author Arni Arent
    *
    */
    class GroupManager extends Manager {
        private entitiesByGroup_;
        private groupsByEntity_;
        constructor();
        initialize(): void;
        /**
        * Set the group of the entity.
        *
        * @param group group to add the entity into.
        * @param e entity to add into the group.
        */
        add(e: Entity, group: string): void;
        /**
        * Remove the entity from the specified group.
        * @param e
        * @param group
        */
        remove(e: Entity, group: string): void;
        removeFromAllGroups(e: Entity): void;
        /**
        * Get all entities that belong to the provided group.
        * @param group name of the group.
        * @return read-only bag of entities belonging to the group.
        */
        getEntities(group: string): ImmutableBag<Entity>;
        /**
        * @param e entity
        * @return the groups the entity belongs to, null if none.
        */
        getGroups(e: Entity): ImmutableBag<String>;
        /**
        * Checks if the entity belongs to any group.
        * @param e the entity to check.
        * @return true if it is in any group, false if none.
        */
        isInAnyGroup(e: Entity): boolean;
        /**
        * Check if the entity is in the supplied group.
        * @param group the group to check in.
        * @param e the entity to check for.
        * @return true if the entity is in the supplied group, false if not.
        */
        isInGroup(e: Entity, group: string): boolean;
        deleted(e: Entity): void;
    }
}
