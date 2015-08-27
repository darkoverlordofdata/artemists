var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
        * Mapper artems.component.Position
        * em:ComponentMapper<artems.component.Position>;
        *
        */
        function Mapper(component) {
            return function (target, propertyKey, descriptor) {
                return descriptor;
            };
        }
        annotations.Mapper = Mapper;
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Mapper.js.map