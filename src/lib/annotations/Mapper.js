var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
        * Mapper artemis.component.Position
        * em:ComponentMapper<artemis.component.Position>;
        *
        */
        function Mapper(component) {
            return function (target, propertyKey, descriptor) {
                var klass = target.constructor;
                klass.declaredFields = klass.declaredFields || [];
                klass.declaredFields.push(propertyKey);
                klass.prototype[propertyKey] = component;
            };
        }
        annotations.Mapper = Mapper;
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Mapper.js.map