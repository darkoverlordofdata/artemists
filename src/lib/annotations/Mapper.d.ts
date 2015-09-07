declare module artemis.annotations {
    /**
    * Mapper artemis.component.Position
    * em:ComponentMapper<artemis.component.Position>;
    *
    */
    function Mapper(component: Function): (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) => void;
}
