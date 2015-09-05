module artemis.annotations {
  
  /**
   * EntityTemplate
   *
   */
  export function EntityTemplate(component: string) {
    return function (target:Function, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {

      EntityTemplate['entityTemplates'] = EntityTemplate['entityTemplates'] || {};

      EntityTemplate['entityTemplates'][component] = target;

    }
  }
}


