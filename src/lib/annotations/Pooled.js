var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
        * Mapper artemis.component.Position
        * em:ComponentMapper<artemis.component.Position>;
        *
        */
        function Pooled() {
            return function (klass, propertyKey, descriptor) {
                Pooled['pooledComponents'] = Pooled['pooledComponents'] || {};
                Pooled['pooledComponents'][artemis.getClassName(klass)] = klass;
            };
        }
        annotations.Pooled = Pooled;
        Pooled['pooledComponents'] = {};
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=Pooled.js.map