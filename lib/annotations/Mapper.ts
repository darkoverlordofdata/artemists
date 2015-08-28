module artemis.annotations {
  
  /**
  * Mapper artems.component.Position
  * em:ComponentMapper<artems.component.Position>;
  * 
  */
  export function Mapper(component: Function) {
    return function (target: Object, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {
      
      /**
       * component - reference to component class
       * target.constructor - class the property is defined on
       * propertyKey - property name
       */
       var klass:any = target.constructor;
       var name:string = klass.className || klass.name;
       
       var system = Mapper['annotation'][name] = Mapper['annotation'][name] || {};
       system[propertyKey] = component;
       
    }
  }
  Mapper['annotation'] = {};
}


