module artemis.annotations {
  "use strict";

  import Class = artemis.Class;

  /**
   * EntityTemplate
   *
   */
  export function EntityTemplate(component: string) {
    return function (target:Class, propertyKey?: string, descriptor?: TypedPropertyDescriptor<any>) {

      EntityTemplate['entityTemplates'] = EntityTemplate['entityTemplates'] || {};

      EntityTemplate['entityTemplates'][component] = target;

    }
  }
}


