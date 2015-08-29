module artemis.annotations {
  
  /**
  * Mapper artems.component.Position
  * em:ComponentMapper<artems.component.Position>;
  * 
  */
  export function Mapper(component: Function) {
    return function (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {
      
       var klass:any = target.constructor;
       
       klass.declaredFields = klass.declaredFields || [];
       klass.declaredFields.push(propertyKey);
       
       klass.prototype[propertyKey] = component;
    }
  }
}


