module artemis {

  export interface Class extends Function {}

  export function getClassName(klass) {
    return klass.className || klass.name;
  }

}