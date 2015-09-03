/**
 * Cocos2d-js dev wrappers
 * Use for intellisene and typechecking
 */
declare class CCNode extends cc.Node {
    _super(): void;
}
declare class CCLayer extends cc.Layer {
    _super(): void;
}
declare class CCLayerColor extends cc.LayerColor {
    _super(color?: cc.Color, width?: number, height?: number): void;
}
declare class CCScene extends cc.Scene {
    _super(): void;
}
declare class CCSprite extends cc.Sprite {
    _super(fileName?: string, rect?: cc.Rect, rotated?: boolean): void;
}
declare module artemis.utils {
    /**
    * Collection type a bit like ArrayList but does not preserve the order of its
    * entities, speedwise it is very good, especially suited for games.
    */
    class Bag<E> implements ImmutableBag<E> {
        private data_;
        private size_;
        /**
        * Constructs an empty Bag with the specified initial capacity.
        * Constructs an empty Bag with an initial capacity of 64.
        *
        * @param capacity
        *            the initial capacity of Bag
        */
        constructor(capacity?: number);
        /**
        * Removes the element at the specified position in this Bag. does this by
        * overwriting it was last element then removing last element
        *
        * @param index
        *            the index of element to be removed
        * @return element that was removed from the Bag
        */
        removeAt(index: number): E;
        /**
        * Removes the first occurrence of the specified element from this Bag, if
        * it is present. If the Bag does not contain the element, it is unchanged.
        * does this by overwriting it was last element then removing last element
        *
        * @param e
        *            element to be removed from this list, if present
        * @return <tt>true</tt> if this list contained the specified element
        */
        remove(e: E): boolean;
        /**
        * Remove and return the last object in the bag.
        *
        * @return the last object in the bag, null if empty.
        */
        removeLast(): E;
        /**
        * Check if bag contains this element.
        *
        * @param e
        * @return
        */
        contains(e: E): boolean;
        /**
        * Removes from this Bag all of its elements that are contained in the
        * specified Bag.
        *
        * @param bag
        *            Bag containing elements to be removed from this Bag
        * @return {@code true} if this Bag changed as a result of the call
        */
        removeAll(bag: ImmutableBag<E>): boolean;
        /**
        * Returns the element at the specified position in Bag.
        *
        * @param index
        *            index of the element to return
        * @return the element at the specified position in bag
        */
        get(index: number): E;
        /**
        * Returns the number of elements in this bag.
        *
        * @return the number of elements in this bag
        */
        size(): number;
        /**
        * Returns the number of elements the bag can hold without growing.
        *
        * @return the number of elements the bag can hold without growing.
        */
        getCapacity(): number;
        /**
        * Checks if the internal storage supports this index.
        *
        * @param index
        * @return
        */
        isIndexWithinBounds(index: number): boolean;
        /**
        * Returns true if this list contains no elements.
        *
        * @return true if this list contains no elements
        */
        isEmpty(): boolean;
        /**
        * Adds the specified element to the end of this bag. if needed also
        * increases the capacity of the bag.
        *
        * @param e
        *            element to be added to this list
        */
        add(e: E): void;
        /**
        * Set element at specified index in the bag.
        *
        * @param index position of element
        * @param e the element
        */
        set(index: number, e: E): void;
        grow(newCapacity?: number): void;
        ensureCapacity(index: number): void;
        /**
        * Removes all of the elements from this bag. The bag will be empty after
        * this call returns.
        */
        clear(): void;
        /**
        * Add all items into this bag.
        * @param added
        */
        addAll(items: ImmutableBag<E>): void;
    }
}
declare module artemis.utils {
    class BitSet {
        private words_;
        constructor(nbits?: number);
        nextSetBit(fromIndex: number): number;
        intersects(set: BitSet): boolean;
        isEmpty(): boolean;
        set(bitIndex: number, value?: boolean): number;
        get(bitIndex: number): boolean;
        clear(bitIndex?: number): number;
    }
}
declare module artemis.utils {
    class MathUtils {
        static nextBool(): boolean;
        static nextDouble(): number;
        static nextInt(max: any): number;
        static random(start: any, end?: any): any;
    }
}
/**
 *--------------------------------------------------------------------+
 * MersenneTwister.ts
 *--------------------------------------------------------------------+
 * Copyright DarkOverlordOfData (c) 2014-2015
 *--------------------------------------------------------------------+
 *
 * This file is a part of Alien Zone
 *
 * Alien Zone is free software; you can copy, modify, and distribute
 * it under the terms of the GPLv3 License
 *
 * MersenneTwister:
 *  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
 *  All rights reserved.
 *
 *--------------------------------------------------------------------+
 *  An alternative PRNG
 *
 */
declare class MersenneTwister implements IRandum {
    private static N;
    private static M;
    private static MATRIX_A;
    private static UPPER_MASK;
    private static LOWER_MASK;
    mt: any;
    mti: number;
    constructor(seed?: number);
    nextBool(): boolean;
    nextDouble(): number;
    nextInt(max: any): number;
    init_genrand(s: any): void;
    init_by_array(init_key: any, key_length: any): void;
    genrand_int32(): number;
    genrand_int31(): number;
    genrand_real1(): number;
    genrand_real2(): number;
    genrand_real3(): number;
    genrand_res53(): number;
}
declare module artemis.utils {
    interface Map<K, V> {
        clear(): any;
        containsKey(key: any): boolean;
        containsValue(value: any): boolean;
        get(key: any): any;
        isEmpty(): boolean;
        put(key: any, value: any): any;
        remove(key: any): any;
        size(): number;
        values(): any;
    }
}
declare module artemis.utils {
    /**
     * HashMap
     *
     * Allow object as key.
     */
    class HashMap<K, V> implements Map<K, V> {
        private map_;
        private keys_;
        constructor();
        clear(): void;
        values(): any[];
        contains(value: any): boolean;
        containsKey(key: any): boolean;
        containsValue(value: any): boolean;
        get(key: any): any;
        isEmpty(): boolean;
        keys(): any[];
        /**
         * if key is a string, use as is, else use key.id_ or key.name
         */
        put(key: any, value: any): void;
        remove(key: any): void;
        size(): number;
    }
}
declare module artemis.utils {
    interface ImmutableBag<E> {
        get(index: number): E;
        size(): number;
        isEmpty(): boolean;
        contains(e: E): boolean;
    }
}
/**
 *--------------------------------------------------------------------+
 * IRandum.ts
 *--------------------------------------------------------------------+
 * Copyright DarkOverlordOfData (c) 2014-2015
 *--------------------------------------------------------------------+
 *
 * This file is a part of Alien Zone
 *
 * Alien Zone is free software; you can copy, modify, and distribute
 * it under the terms of the GPLv3 License
 *
 *--------------------------------------------------------------------+
 *
 * A more useful PRNG interface, based on MersenneTwister
 */
interface IRandum {
    nextBool(): any;
    nextDouble(): any;
    nextInt(max: any): any;
}
/**
 *--------------------------------------------------------------------+
 * Randum.ts
 *--------------------------------------------------------------------+
 * Copyright DarkOverlordOfData (c) 2014-2015
 *--------------------------------------------------------------------+
 *
 * This file is a part of Alien Zone
 *
 * Alien Zone is free software; you can copy, modify, and distribute
 * it under the terms of the GPLv3 License
 *
 *--------------------------------------------------------------------+
 *
 * Wrap the native PRNG
 */
declare class Randum implements IRandum {
    nextBool(): boolean;
    nextDouble(): number;
    nextInt(max: any): number;
}
declare module artemis.utils {
    class TrigLUT {
        static main(): void;
        static sin(rad: number): number;
        static cos(rad: number): number;
        static sinDeg(deg: number): number;
        static cosDeg(deg: number): number;
        private static RAD;
        private static DEG;
        private static SIN_BITS;
        private static SIN_MASK;
        private static SIN_COUNT;
        private static radFull;
        private static radToIndex;
        private static degFull;
        private static degToIndex;
        private static sin_;
        private static cos_;
        static init(update: boolean): void;
    }
}
declare module artemis.utils {
    class Timer {
        private delay;
        private repeat;
        private acc;
        private done;
        private stopped;
        constructor(delay: number, repeat?: boolean);
        update(delta: number): void;
        reset(): void;
        isDone(): boolean;
        isRunning(): boolean;
        stop(): void;
        setDelay(delay: number): void;
        execute: () => void;
        getPercentageRemaining(): number;
        getDelay(): number;
    }
}
declare module artemis {
    module utils {
        class UUID {
            /**
            * Fast UUID generator, RFC4122 version 4 compliant
        * format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        *
            * @author Jeff Ward (jcward.com).
            * @license MIT license
            * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
            **/
            static randomUUID(): string;
        }
    }
}
declare module artemis.annotations {
    /**
    * Mapper artemis.component.Position
    * em:ComponentMapper<artemis.component.Position>;
    *
    */
    function Mapper(component: Function): (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
}
declare module artemis {
    interface EntityObserver {
        added(e: Entity): any;
        changed(e: Entity): any;
        deleted(e: Entity): any;
        enabled(e: Entity): any;
        disabled(e: Entity): any;
    }
}
declare module artemis {
    /**
     * A tag class. All components in the system must extend this class.
     *
     * @author Arni Arent
     */
    class Component {
    }
}
declare module artemis {
    import BitSet = artemis.utils.BitSet;
    /**
    * An Aspects is used by systems as a matcher against entities, to check if a system is
    * interested in an entity. Aspects define what sort of component types an entity must
    * possess, or not possess.
    *
    * This creates an aspect where an entity must possess A and B and C:
    * Aspect.getAspectForAll(A.class, B.class, C.class)
    *
    * This creates an aspect where an entity must possess A and B and C, but must not possess U or V.
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class)
    *
    * This creates an aspect where an entity must possess A and B and C, but must not possess U or V, but must possess one of X or Y or Z.
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class).one(X.class, Y.class, Z.class)
    *
    * You can create and compose aspects in many ways:
    * Aspect.getEmpty().one(X.class, Y.class, Z.class).all(A.class, B.class, C.class).exclude(U.class, V.class)
    * is the same as:
    * Aspect.getAspectForAll(A.class, B.class, C.class).exclude(U.class, V.class).one(X.class, Y.class, Z.class)
    *
    * @author Arni Arent
    *
    */
    class Aspect {
        private allSet_;
        private exclusionSet_;
        private oneSet_;
        constructor();
        getAllSet(): BitSet;
        getExclusionSet(): BitSet;
        getOneSet(): BitSet;
        /**
        * Returns an aspect where an entity must possess all of the specified component types.
        * @param type a required component type
        * @param types a required component type
        * @return an aspect that can be matched against entities
        */
        all(type: Function, ...types: Function[]): Aspect;
        /**
        * Excludes all of the specified component types from the aspect. A system will not be
        * interested in an entity that possesses one of the specified exclusion component types.
        *
        * @param type component type to exclude
        * @param types component type to exclude
        * @return an aspect that can be matched against entities
        */
        exclude(type: Function, ...types: Function[]): Aspect;
        /**
        * Returns an aspect where an entity must possess one of the specified component types.
        * @param type one of the types the entity must possess
        * @param types one of the types the entity must possess
        * @return an aspect that can be matched against entities
        */
        one(type: Function, ...types: Function[]): Aspect;
        /**
        * Creates an aspect where an entity must possess all of the specified component types.
        *
        * @param type the type the entity must possess
        * @param types the type the entity must possess
        * @return an aspect that can be matched against entities
        *
        * @deprecated
        * @see getAspectForAll
        */
        static getAspectFor(type: Function, ...types: Function[]): Aspect;
        /**
        * Creates an aspect where an entity must possess all of the specified component types.
        *
        * @param type a required component type
        * @param types a required component type
        * @return an aspect that can be matched against entities
        */
        static getAspectForAll(type: Function, ...types: Function[]): Aspect;
        /**
        * Creates an aspect where an entity must possess one of the specified component types.
        *
        * @param type one of the types the entity must possess
        * @param types one of the types the entity must possess
        * @return an aspect that can be matched against entities
        */
        static getAspectForOne(type: Function, ...types: Function[]): Aspect;
        /**
        * Creates and returns an empty aspect. This can be used if you want a system that processes no entities, but
        * still gets invoked. Typical usages is when you need to create special purpose systems for debug rendering,
        * like rendering FPS, how many entities are active in the world, etc.
        *
        * You can also use the all, one and exclude methods on this aspect, so if you wanted to create a system that
        * processes only entities possessing just one of the components A or B or C, then you can do:
        * Aspect.getEmpty().one(A,B,C);
        *
        * @return an empty Aspect that will reject all entities.
        */
        static getEmpty(): Aspect;
    }
}
declare module artemis {
    import Bag = artemis.utils.Bag;
    import BitSet = artemis.utils.BitSet;
    import UUID = artemis.utils.UUID;
    /**
    * The entity class. Cannot be instantiated outside the framework, you must
    * create new entities using World.
    *
    * @author Arni Arent
    *
    */
    class Entity {
        uuid: string;
        private id_;
        private componentBits_;
        private systemBits_;
        private world_;
        private entityManager_;
        private componentManager_;
        constructor(world: World, id: number);
        /**
        * The internal id for this entity within the framework. No other entity
        * will have the same ID, but ID's are however reused so another entity may
        * acquire this ID if the previous entity was deleted.
        *
        * @return id of the entity.
        */
        getId(): number;
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        getComponentBits(): BitSet;
        /**
        * Returns a BitSet instance containing bits of the components the entity possesses.
        * @return
        */
        getSystemBits(): BitSet;
        /**
        * Make entity ready for re-use.
        * Will generate a new uuid for the entity.
        */
        protected reset(): void;
        toString(): string;
        /**
        * Add a component to this entity.
        *
        * @param component to add to this entity
        *
        * @return this entity for chaining.
        */
        /**
        * Faster adding of components into the entity. Not neccessery to use this, but
        * in some cases you might need the extra performance.
        *
        * @param component the component to add
        * @param type of the component
        *
        * @return this entity for chaining.
        */
        addComponent(component: Component, type?: ComponentType): Entity;
        /**
        * Removes the component from this entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        removeComponentInstance(component: Component): Entity;
        /**
        * Faster removal of components from a entity.
        *
        * @param component to remove from this entity.
        *
        * @return this entity for chaining.
        */
        removeComponent(type: ComponentType): Entity;
        /**
        * Remove component by its type.
        * @param type
        *
        * @return this entity for chaining.
        */
        removeComponentByType(type: Function): Entity;
        /**
        * Checks if the entity has been added to the world and has not been deleted from it.
        * If the entity has been disabled this will still return true.
        *
        * @return if it's active.
        */
        isActive(): boolean;
        /**
        * Will check if the entity is enabled in the world.
        * By default all entities that are added to world are enabled,
        * this will only return false if an entity has been explicitly disabled.
        *
        * @return if it's enabled
        */
        isEnabled(): boolean;
        /**
        * This is the preferred method to use when retrieving a component from a
        * entity. It will provide good performance.
        * But the recommended way to retrieve components from an entity is using
        * the ComponentMapper.
        *
        * @param type
        *            in order to retrieve the component fast you must provide a
        *            ComponentType instance for the expected component.
        * @return
        */
        getComponent(type: ComponentType): Component;
        /**
        * Slower retrieval of components from this entity. Minimize usage of this,
        * but is fine to use e.g. when creating new entities and setting data in
        * components.
        *
        * @param <T>
        *            the expected return component type.
        * @param type
        *            the expected return component type.
        * @return component that matches, or null if none is found.
        */
        getComponentByType(type: Function): Component;
        /**
        * Returns a bag of all components this entity has.
        * You need to reset the bag yourself if you intend to fill it more than once.
        *
        * @param fillBag the bag to put the components into.
        * @return the fillBag with the components in.
        */
        getComponents(fillBag: Bag<Component>): Bag<Component>;
        /**
        * Refresh all changes to components for this entity. After adding or
        * removing components, you must call this method. It will update all
        * relevant systems. It is typical to call this after adding components to a
        * newly created entity.
        */
        addToWorld(): void;
        /**
        * This entity has changed, a component added or deleted.
        */
        changedInWorld(): void;
        /**
        * Delete this entity from the world.
        */
        deleteFromWorld(): void;
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        enable(): void;
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        disable(): void;
        /**
        * Get the UUID for this entity.
        * This UUID is unique per entity (re-used entities get a new UUID).
        * @return uuid instance for this entity.
        */
        getUuid(): UUID;
        /**
        * Returns the world this entity belongs to.
        * @return world of entity.
        */
        getWorld(): World;
    }
}
declare module artemis {
    import EntityObserver = artemis.EntityObserver;
    /**
    * Manager.
    *
    * @author Arni Arent
    *
    */
    class Manager implements EntityObserver {
        protected world_: World;
        initialize(): void;
        setWorld(world: World): void;
        getWorld(): World;
        added(e: Entity): void;
        changed(e: Entity): void;
        deleted(e: Entity): void;
        disabled(e: Entity): void;
        enabled(e: Entity): void;
    }
}
declare module artemis {
    import ImmutableBag = artemis.utils.ImmutableBag;
    /**
    * The primary instance for the framework. It contains all the managers.
    *
    * You must use this to create, delete and retrieve entities.
    *
    * It is also important to set the delta each game loop iteration, and initialize before game loop.
    *
    * @author Arni Arent
    *
    */
    class World {
        private em_;
        private cm_;
        delta: number;
        private added_;
        private changed_;
        private deleted_;
        private enable_;
        private disable_;
        private managers_;
        private managersBag_;
        private systems_;
        private systemsBag_;
        constructor();
        /**
        * Makes sure all managers systems are initialized in the order they were added.
        */
        initialize(): void;
        /**
        * Returns a manager that takes care of all the entities in the world.
        * entities of this world.
        *
        * @return entity manager.
        */
        getEntityManager(): EntityManager;
        /**
        * Returns a manager that takes care of all the components in the world.
        *
        * @return component manager.
        */
        getComponentManager(): ComponentManager;
        /**
        * Add a manager into this world. It can be retrieved later.
        * World will notify this manager of changes to entity.
        *
        * @param manager to be added
        */
        setManager(manager: Manager): Manager;
        /**
        * Returns a manager of the specified type.
        *
        * @param <T>
        * @param managerType
        *            class type of the manager
        * @return the manager
        */
        getManager<T extends Manager>(managerType: Function): T;
        /**
        * Deletes the manager from this world.
        * @param manager to delete.
        */
        deleteManager(manager: Manager): void;
        /**
        * Time since last game loop.
        *
        * @return delta time since last game loop.
        */
        getDelta(): number;
        /**
        * You must specify the delta for the game here.
        *
        * @param delta time since last game loop.
        */
        setDelta(delta: number): void;
        /**
        * Adds a entity to this world.
        *
        * @param e entity
        */
        addEntity(e: Entity): void;
        /**
        * Ensure all systems are notified of changes to this entity.
        * If you're adding a component to an entity after it's been
        * added to the world, then you need to invoke this method.
        *
        * @param e entity
        */
        changedEntity(e: Entity): void;
        /**
        * Delete the entity from the world.
        *
        * @param e entity
        */
        deleteEntity(e: Entity): void;
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        enable(e: Entity): void;
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        disable(e: Entity): void;
        /**
        * Create and return a new or reused entity instance.
        * Will NOT add the entity to the world, use World.addEntity(Entity) for that.
        *
        * @return entity
        */
        createEntity(): Entity;
        /**
        * Get a entity having the specified id.
        *
        * @param entityId
        * @return entity
        */
        getEntity(entityId: number): Entity;
        /**
        * Gives you all the systems in this world for possible iteration.
        *
        * @return all entity systems in world.
        */
        getSystems(): ImmutableBag<EntitySystem>;
        /**
        * Adds a system to this world that will be processed by World.process()
        *
        * @param system the system to add.
        * @return the added system.
        */
        /**
        * Will add a system to this world.
        *
        * @param system the system to add.
        * @param passive wether or not this system will be processed by World.process()
        * @return the added system.
        */
        setSystem<T extends EntitySystem>(system: T, passive?: boolean): T;
        /**
        * Removed the specified system from the world.
        * @param system to be deleted from world.
        */
        deleteSystem(system: EntitySystem): void;
        private notifySystems(performer, e);
        private notifyManagers(performer, e);
        /**
        * Retrieve a system for specified system type.
        *
        * @param type type of system.
        * @return instance of the system in this world.
        */
        getSystem(type: Function): EntitySystem;
        /**
        * Performs an action on each entity.
        * @param entities
        * @param performer
        */
        private check(entities, performer);
        /**
        * Process all non-passive systems.
        */
        process(): void;
        /**
        * Retrieves a ComponentMapper instance for fast retrieval of components from entities.
        *
        * @param type of component to get mapper for.
        * @return mapper for specified component type.
        */
        getMapper<T extends Component>(type: Function): ComponentMapper<T>;
    }
}
declare module artemis {
    import Bag = artemis.utils.Bag;
    import Manager = artemis.Manager;
    import Component = artemis.Component;
    import ComponentType = artemis.ComponentType;
    import Entity = artemis.Entity;
    class ComponentManager extends Manager {
        private componentsByType_;
        private deleted_;
        constructor();
        initialize(): void;
        private removeComponentsOfEntity(e);
        addComponent(e: Entity, type: ComponentType, component: Component): void;
        removeComponent(e: Entity, type: ComponentType): void;
        getComponentsByType(type: ComponentType): Bag<Component>;
        getComponent(e: Entity, type: ComponentType): Component;
        getComponentsFor(e: Entity, fillBag: Bag<Component>): Bag<Component>;
        deleted(e: Entity): void;
        clean(): void;
    }
}
declare module artemis {
    class ComponentType {
        private static INDEX;
        private index_;
        private type_;
        constructor(type: Function);
        getIndex(): number;
        toString(): string;
        private static componentTypes;
        static getTypeFor(c: Function): ComponentType;
        static getIndexFor(c: Function): number;
    }
}
declare module artemis {
    import Component = artemis.Component;
    import Entity = artemis.Entity;
    /**
    * High performance component retrieval from entities. Use this wherever you
    * need to retrieve components from entities often and fast.
    *
    * @author Arni Arent
    *
    * @param <A> the class type of the component
    */
    class ComponentMapper<A extends Component> {
        private type_;
        private classType_;
        private components_;
        constructor(type: Function, world: World);
        /**
        * Fast but unsafe retrieval of a component for this entity.
        * No bounding checks, so this could throw an ArrayIndexOutOfBoundsExeption,
        * however in most scenarios you already know the entity possesses this component.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        get(e: Entity): A;
        /**
        * Fast and safe retrieval of a component for this entity.
        * If the entity does not have this component then null is returned.
        *
        * @param e the entity that should possess the component
        * @return the instance of the component
        */
        getSafe(e: Entity): A;
        /**
        * Checks if the entity has this type of component.
        * @param e the entity to check
        * @return true if the entity has this component type, false if it doesn't.
        */
        has(e: Entity): boolean;
        /**
        * Returns a component mapper for this type of components.
        *
        * @param type the type of components this mapper uses.
        * @param world the world that this component mapper should use.
        * @return a new mapper.
        */
        static getFor<T extends Component>(type: Function, world: World): ComponentMapper<T>;
    }
}
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
declare module artemis {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntityObserver = artemis.EntityObserver;
    /**
    * The most raw entity system. It should not typically be used, but you can create your own
    * entity system handling by extending this. It is recommended that you use the other provided
    * entity system implementations.
    *
    * @author Arni Arent
    *
    */
    class EntitySystem implements EntityObserver {
        private systemIndex_;
        world: World;
        private actives_;
        private aspect_;
        private allSet_;
        private exclusionSet_;
        private oneSet_;
        private passive_;
        private dummy_;
        /**
        * Creates an entity system that uses the specified aspect as a matcher against entities.
        * @param aspect to match against entities
        */
        constructor(aspect: Aspect);
        /**
        * Called before processing of entities begins.
        */
        protected begin(): void;
        process(): void;
        /**
        * Called after the processing of entities ends.
        */
        protected end(): void;
        /**
        * Any implementing entity system must implement this method and the logic
        * to process the given entities of the system.
        *
        * @param entities the entities this system contains.
        */
        protected processEntities(entities: ImmutableBag<Entity>): void;
        /**
        *
        * @return true if the system should be processed, false if not.
        */
        protected checkProcessing(): boolean;
        /**
        * Override to implement code that gets executed when systems are initialized.
        */
        initialize(): void;
        /**
        * Called if the system has received a entity it is interested in, e.g. created or a component was added to it.
        * @param e the entity that was added to this system.
        */
        inserted(e: Entity): void;
        /**
        * Called if a entity was removed from this system, e.g. deleted or had one of it's components removed.
        * @param e the entity that was removed from this system.
        */
        protected removed(e: Entity): void;
        /**
        * Will check if the entity is of interest to this system.
        * @param e entity to check
        */
        protected check(e: Entity): void;
        private removeFromSystem(e);
        private insertToSystem(e);
        added(e: Entity): void;
        changed(e: Entity): void;
        deleted(e: Entity): void;
        disabled(e: Entity): void;
        enabled(e: Entity): void;
        setWorld(world: World): void;
        isPassive(): boolean;
        setPassive(passive: boolean): void;
        getActive(): ImmutableBag<Entity>;
    }
}
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
declare module artemis.managers {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import Manager = artemis.Manager;
    /**
    * Use this class together with PlayerManager.
    *
    * You may sometimes want to create teams in your game, so that
    * some players are team mates.
    *
    * A player can only belong to a single team.
    *
    * @author Arni Arent
    *
    */
    class TeamManager extends Manager {
        private playersByTeam_;
        private teamByPlayer_;
        constructor();
        initialize(): void;
        getTeam(player: string): string;
        setTeam(player: string, team: string): void;
        getPlayers(team: string): ImmutableBag<String>;
        removeFromTeam(player: string): void;
    }
}
declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntitySystem = artemis.EntitySystem;
    /**
    * The purpose of this class is to allow systems to execute at varying intervals.
    *
    * An example system would be an ExpirationSystem, that deletes entities after a certain
    * lifetime. Instead of running a system that decrements a timeLeft value for each
    * entity, you can simply use this system to execute in a future at a time of the shortest
    * lived entity, and then reset the system to run at a time in a future at a time of the
    * shortest lived entity, etc.
    *
    * Another example system would be an AnimationSystem. You know when you have to animate
    * a certain entity, e.g. in 300 milliseconds. So you can set the system to run in 300 ms.
    * to perform the animation.
    *
    * This will save CPU cycles in some scenarios.
    *
    * Implementation notes:
    * In order to start the system you need to override the inserted(Entity e) method,
    * look up the delay time from that entity and offer it to the system by using the
    * offerDelay(float delay) method.
    * Also, when processing the entities you must also call offerDelay(float delay)
    * for all valid entities.
    *
    * @author Arni Arent
    *
    */
    class DelayedEntityProcessingSystem extends EntitySystem {
        private delay_;
        private running_;
        private acc_;
        constructor(aspect: Aspect);
        protected processEntities(entities: ImmutableBag<Entity>): void;
        inserted(e: Entity): void;
        /**
        * Return the delay until this entity should be processed.
        *
        * @param e entity
        * @return delay
        */
        protected getRemainingDelay(e: Entity): number;
        protected checkProcessing(): boolean;
        /**
        * Process a entity this system is interested in. Substract the accumulatedDelta
        * from the entities defined delay.
        *
        * @param e the entity to process.
        * @param accumulatedDelta the delta time since this system was last executed.
        */
        protected processDelta(e: Entity, accumulatedDelta: number): void;
        protected processExpired(e: Entity): void;
        /**
        * Start processing of entities after a certain amount of delta time.
        *
        * Cancels current delayed run and starts a new one.
        *
        * @param delta time delay until processing starts.
        */
        restart(delay: number): void;
        /**
        * Restarts the system only if the delay offered is shorter than the
        * time that the system is currently scheduled to execute at.
        *
        * If the system is already stopped (not running) then the offered
        * delay will be used to restart the system with no matter its value.
        *
        * If the system is already counting down, and the offered delay is
        * larger than the time remaining, the system will ignore it. If the
        * offered delay is shorter than the time remaining, the system will
        * restart itself to run at the offered delay.
        *
        * @param delay
        */
        offerDelay(delay: number): void;
        /**
        * Get the initial delay that the system was ordered to process entities after.
        *
        * @return the originally set delay.
        */
        getInitialTimeDelay(): number;
        /**
        * Get the time until the system is scheduled to run at.
        * Returns zero (0) if the system is not running.
        * Use isRunning() before checking this value.
        *
        * @return time when system will run at.
        */
        getRemainingTimeUntilProcessing(): number;
        /**
        * Check if the system is counting down towards processing.
        *
        * @return true if it's counting down, false if it's not running.
        */
        isRunning(): boolean;
        /**
        * Stops the system from running, aborts current countdown.
        * Call offerDelay or restart to run it again.
        */
        stop(): void;
    }
}
declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntitySystem = artemis.EntitySystem;
    /**
    * A typical entity system. Use this when you need to process entities possessing the
    * provided component types.
    *
    * @author Arni Arent
    *
    */
    class EntityProcessingSystem extends EntitySystem {
        constructor(aspect: Aspect);
        /**
        * Process a entity this system is interested in.
        * @param e the entity to process.
        */
        protected processEach(e: Entity): void;
        protected processEntities(entities: ImmutableBag<Entity>): void;
        protected checkProcessing(): boolean;
    }
}
declare module artemis.systems {
    import EntitySystem = artemis.EntitySystem;
    import Aspect = artemis.Aspect;
    /**
    * A system that processes entities at a interval in milliseconds.
    * A typical usage would be a collision system or physics system.
    *
    * @author Arni Arent
    *
    */
    class IntervalEntitySystem extends EntitySystem {
        private acc_;
        private interval_;
        constructor(aspect: Aspect, interval: number);
        protected checkProcessing(): boolean;
    }
}
declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import EntitySystem = artemis.EntitySystem;
    /**
    * This system has an empty aspect so it processes no entities, but it still gets invoked.
    * You can use this system if you need to execute some game logic and not have to concern
    * yourself about aspects or entities.
    *
    * @author Arni Arent
    *
    */
    class VoidEntitySystem extends EntitySystem {
        constructor();
        protected processEntities(entities: ImmutableBag<Entity>): void;
        protected processSystem(): void;
        protected checkProcessing(): boolean;
    }
}
declare module artemis.systems {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import IntervalEntitySystem = artemis.systems.IntervalEntitySystem;
    /**
    * If you need to process entities at a certain interval then use this.
    * A typical usage would be to regenerate ammo or health at certain intervals, no need
    * to do that every game loop, but perhaps every 100 ms. or every second.
    *
    * @author Arni Arent
    *
    */
    class IntervalEntityProcessingSystem extends IntervalEntitySystem {
        constructor(aspect: Aspect, interval: number);
        /**
        * Process a entity this system is interested in.
        * @param e the entity to process.
        */
        processEach(e: Entity): void;
        protected processEntities(entities: ImmutableBag<Entity>): void;
    }
}
declare module brokenspork.core {
    class Constants {
        static FRAME_WIDTH: number;
        static FRAME_HEIGHT: number;
        static Groups: {
            PLAYER_BULLETS: string;
            PLAYER_SHIP: string;
            ENEMY_SHIPS: string;
            ENEMY_BULLETS: string;
        };
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Bounds extends Component {
        static className: string;
        radius: number;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class ColorAnimation extends Component {
        static className: string;
        redMin: number;
        redMax: number;
        redSpeed: number;
        greenMin: number;
        greenMax: number;
        greenSpeed: number;
        blueMin: number;
        blueMax: number;
        blueSpeed: number;
        alphaMin: number;
        alphaMax: number;
        alphaSpeed: number;
        redAnimate: boolean;
        greenAnimate: boolean;
        blueAnimate: boolean;
        alphaAnimate: boolean;
        repeat: boolean;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Enemy extends Component {
        static className: string;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Expires extends Component {
        static className: string;
        delay: number;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Health extends Component {
        static className: string;
        health: number;
        maximumHealth: number;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class ParallaxStar extends Component {
        static className: string;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Player extends Component {
        static className: string;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Position extends Component {
        static className: string;
        x: number;
        y: number;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class ScaleAnimation extends Component {
        static className: string;
        min: number;
        max: number;
        speed: number;
        repeat: boolean;
        active: boolean;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    enum EFFECT {
        PEW = 0,
        ASPLODE = 1,
        SMALLASPLODE = 2,
    }
    class SoundEffect extends Component {
        static className: string;
        effect: EFFECT;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    enum Layer {
        DEFAULT = 0,
        BACKGROUND = 1,
        ACTORS_1 = 2,
        ACTORS_2 = 3,
        ACTORS_3 = 4,
        PARTICLES = 5,
    }
    class Sprite extends Component {
        static className: string;
        layer: Layer;
        name_: string;
        scaleX_: number;
        scaleY_: number;
        rotation_: number;
        r_: number;
        g_: number;
        b_: number;
        a_: number;
        sprite_: cc.Sprite;
        constructor();
        name: string;
        scaleX: number;
        scaleY: number;
        rotation: number;
        r: number;
        g: number;
        b: number;
        a: number;
        addTo(layer: CCLayer): void;
        removeFrom(layer: CCLayer): void;
    }
}
declare module brokenspork.components {
    import Component = artemis.Component;
    class Velocity extends Component {
        static className: string;
        vectorX: number;
        vectorY: number;
    }
}
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
declare module brokenspork.systems {
    import VoidEntitySystem = artemis.systems.VoidEntitySystem;
    class EntitySpawningTimerSystem extends VoidEntitySystem {
        private game;
        private timer1;
        private timer2;
        private timer3;
        constructor(game: CCLayer);
        protected processSystem(): void;
    }
}
declare module brokenspork.systems {
    import Expires = brokenspork.components.Expires;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;
    class ExpiringSystem extends DelayedEntityProcessingSystem {
        em: ComponentMapper<Expires>;
        constructor();
        protected processDelta(e: Entity, accumulatedDelta: number): void;
        protected processExpired(e: Entity): void;
        protected getRemainingDelay(e: Entity): number;
    }
}
declare module brokenspork.systems {
    import Health = brokenspork.components.Health;
    import Position = brokenspork.components.Position;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class HealthRenderSystem extends EntityProcessingSystem {
        pm: ComponentMapper<Position>;
        hm: ComponentMapper<Health>;
        private texts;
        private game;
        constructor(game: CCLayer);
        inserted(e: Entity): void;
        protected removed(e: Entity): void;
        processEach(e: Entity): void;
    }
}
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
declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import Velocity = brokenspork.components.Velocity;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class MovementSystem extends EntityProcessingSystem {
        pm: ComponentMapper<Position>;
        vm: ComponentMapper<Velocity>;
        constructor();
        processEach(e: Entity): void;
    }
}
declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
    class ParallaxStarRepeatingSystem extends IntervalEntityProcessingSystem {
        pm: ComponentMapper<Position>;
        constructor();
        processEach(e: Entity): void;
    }
}
declare module brokenspork.systems {
    import Position = brokenspork.components.Position;
    import Velocity = brokenspork.components.Velocity;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class PlayerInputSystem extends EntityProcessingSystem {
        private static FireRate;
        pm: ComponentMapper<Position>;
        vm: ComponentMapper<Velocity>;
        private shoot;
        private timeToFire;
        private mouseVector;
        private game;
        constructor(game: CCLayer);
        initialize(): void;
        protected processEach(e: Entity): void;
    }
}
declare module brokenspork.systems {
    import Bounds = brokenspork.components.Bounds;
    import Position = brokenspork.components.Position;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import IntervalEntityProcessingSystem = artemis.systems.IntervalEntityProcessingSystem;
    class RemoveOffscreenShipsSystem extends IntervalEntityProcessingSystem {
        pm: ComponentMapper<Position>;
        bm: ComponentMapper<Bounds>;
        constructor();
        processEach(e: Entity): void;
    }
}
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
declare module brokenspork.systems {
    import SoundEffect = brokenspork.components.SoundEffect;
    import ComponentMapper = artemis.ComponentMapper;
    import Entity = artemis.Entity;
    import EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
    class SoundEffectSystem extends EntityProcessingSystem {
        se: ComponentMapper<SoundEffect>;
        initialize(): void;
        constructor();
        processEach(e: Entity): void;
    }
}
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
declare module brokenspork.core {
    class GameScreen {
        game: CCLayer;
        private world;
        private spriteRenderSystem;
        private healthRenderSystem;
        private hudRenderSystem;
        private viewport;
        private static ASPECT_RATIO;
        constructor(game: CCLayer);
        render(delta: number): void;
    }
}
declare module brokenspork.core {
    class SpaceshipWarrior extends CCLayer {
        scene: any;
        gameScreen: GameScreen;
        /**
          * Start the menu
          * @return {cc.Scene} the menu scene
          */
        static start(): cc.Scene;
        /**
         *
         * @constructor
         * @extends {cc.Layer}
         * @param {cc.Scene} scene
         */
        constructor(scene: any);
        ctor(): void;
        update(time: number): void;
    }
}
