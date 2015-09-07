var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var ComponentType = artemis.ComponentType;
    var Aspect = artemis.Aspect;
    var ComponentTypeFactory = (function () {
        function ComponentTypeFactory() {
            /** Amount of generated component types. */
            this.componentTypeCount_ = 0;
            this.componentTypes_ = {};
            this.types = new Bag();
            Aspect.typeFactory = this;
        }
        /**
         * Gets the component type for the given component class.
         * <p>
         * If no component type exists yet, a new one will be created and stored
         * for later retrieval.
         * </p>
         *
         * @param c
         *			the component's class to get the type for
         *
         * @return the component's {@link ComponentType}
         */
        ComponentTypeFactory.prototype.getTypeFor = function (c) {
            if ('number' === typeof c) {
                return this.types.get(parseInt(c));
            }
            var type = this.componentTypes_[artemis.getClassName(c)];
            if (type == null) {
                var index = this.componentTypeCount_++;
                type = new ComponentType(c, index);
                this.componentTypes_[artemis.getClassName(c)] = type;
                this.types.set(index, type);
            }
            return type;
        };
        /**
         * Get the index of the component type of given component class.
         *
         * @param c
         *			the component class to get the type index for
         *
         * @return the component type's index
         */
        ComponentTypeFactory.prototype.getIndexFor = function (c) {
            return this.getTypeFor(c).getIndex();
        };
        ComponentTypeFactory.prototype.getTaxonomy = function (index) {
            return this.types.get(index).getTaxonomy();
        };
        return ComponentTypeFactory;
    })();
    artemis.ComponentTypeFactory = ComponentTypeFactory;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentTypeFactory.js.map