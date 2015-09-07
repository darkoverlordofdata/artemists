module artemis {
  export function getClassName(klass) {
    return klass.className || klass.name;
  }
}