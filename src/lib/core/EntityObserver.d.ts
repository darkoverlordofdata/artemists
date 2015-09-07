declare module artemis {
    interface EntityObserver {
        added(e: Entity): any;
        changed(e: Entity): any;
        deleted(e: Entity): any;
        enabled(e: Entity): any;
        disabled(e: Entity): any;
    }
}
