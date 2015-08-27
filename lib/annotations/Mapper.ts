/**
 * Mapper artems.component.Position
 * em:ComponentMapper<Position>;
 * 
 */
function Mapper(component: Function) {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
  }
}
