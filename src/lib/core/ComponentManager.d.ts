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
