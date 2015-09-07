var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        /**
         * Decode HashMap key
         *
         * When the key is an object, we generate a unique uuid and use that as the actual key.
         */
        function decode(key) {
            switch (typeof key) {
                case 'boolean': return '' + key;
                case 'number': return '' + key;
                case 'string': return '' + key;
                case 'function': return artemis.getClassName(key);
                default:
                    key.uuid = key.uuid ? key.uuid : utils.UUID.randomUUID();
                    return key.uuid;
            }
        }
        /**
         * HashMap
         *
         * Allow object as key.
         */
        var HashMap = (function () {
            function HashMap() {
                this.clear();
            }
            HashMap.prototype.clear = function () {
                this.map_ = {};
                this.keys_ = {};
            };
            HashMap.prototype.values = function () {
                var result = [];
                for (var key in this.map_) {
                    result.push(this.map_[key]);
                }
                return result;
            };
            HashMap.prototype.contains = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.containsKey = function (key) {
                return decode(key) in this.map_;
            };
            HashMap.prototype.containsValue = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.get = function (key) {
                return this.map_[decode(key)];
            };
            HashMap.prototype.isEmpty = function () {
                return Object.keys(this.map_).length === 0;
            };
            HashMap.prototype.keys = function () {
                var result = [];
                for (var key in this.keys_) {
                    result.push(this.keys_[key]);
                }
                return result;
            };
            /**
             * if key is a string, use as is, else use key.id_ or key.name
             */
            HashMap.prototype.put = function (key, value) {
                var k = decode(key);
                this.map_[k] = value;
                this.keys_[k] = key;
            };
            HashMap.prototype.remove = function (key) {
                var k = decode(key);
                delete this.map_[k];
                delete this.keys_[k];
            };
            HashMap.prototype.size = function () {
                return Object.keys(this.map_).length;
            };
            return HashMap;
        })();
        utils.HashMap = HashMap;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=HashMap.js.map