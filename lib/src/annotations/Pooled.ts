module artemis.annotations {
  "use strict";

  import Class = artemis.Class;
  /**
  * Mapper artemis.component.Position
  * em:ComponentMapper<artemis.component.Position>;
  * 
  */
  export function Pooled() {
    return function (klass:Class, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {

      Pooled['pooledComponents'] = Pooled['pooledComponents'] || {};
      Pooled['pooledComponents'][artemis.getClassName(klass)] = klass;

    }
  }
  Pooled['pooledComponents'] = {};
}


