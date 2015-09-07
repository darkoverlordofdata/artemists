var artemis;
(function (artemis) {
    var annotations;
    (function (annotations) {
        /**
         * EntityTemplate
         *
         */
        function EntityTemplate(component) {
            return function (target, propertyKey, descriptor) {
                EntityTemplate['entityTemplates'] = EntityTemplate['entityTemplates'] || {};
                EntityTemplate['entityTemplates'][component] = target;
            };
        }
        annotations.EntityTemplate = EntityTemplate;
    })(annotations = artemis.annotations || (artemis.annotations = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityTemplate.js.map