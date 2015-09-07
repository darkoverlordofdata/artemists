var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var ComponentPool = (function () {
        function ComponentPool() {
            this.pools = new Bag();
        }
        ComponentPool.prototype.obtain = function (componentClass, type) {
            var pool = this.getPool(type.getIndex());
            return ((pool.size() > 0) ? pool.obtain() : new componentClass());
        };
        ComponentPool.prototype.free = function (c, type) {
            this.freeByIndex(c, type.getIndex());
        };
        ComponentPool.prototype.freeByIndex = function (c, typeIndex) {
            c.reset();
            this.getPool(typeIndex).free(c);
        };
        ComponentPool.prototype.getPool = function (typeIndex) {
            var pool = this.pools.safeGet(typeIndex);
            if (pool == null) {
                pool = new Pool();
                this.pools.set(typeIndex, pool);
            }
            return pool;
        };
        return ComponentPool;
    })();
    artemis.ComponentPool = ComponentPool;
    var Pool = (function () {
        function Pool() {
            this.cache = new Bag();
        }
        Pool.prototype.obtain = function () {
            return this.cache.removeLast();
        };
        Pool.prototype.size = function () {
            return this.cache.size();
        };
        Pool.prototype.free = function (component) {
            this.cache.add(component);
        };
        return Pool;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentPool.js.map