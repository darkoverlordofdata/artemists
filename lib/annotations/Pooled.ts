module artemis.annotations {

  /**
  * Mapper artemis.component.Position
  * em:ComponentMapper<artemis.component.Position>;
  * 
  */
  export function Pooled() {
    return function (klass:Function, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {

      Pooled['pooledComponents'] = Pooled['pooledComponents'] || {};
      Pooled['pooledComponents'][artemis.getClassName(klass)] = klass;

    }
  }
  Pooled['pooledComponents'] = {};
}


