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
