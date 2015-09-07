module artemis.annotations {

  interface Class extends Function {}

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


