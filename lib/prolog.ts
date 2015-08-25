import Map = artemis.utils.Map;
import Class = artemis.utils.Class;
import HashMap = artemis.utils.HashMap;
import BitSet = artemis.utils.BitSet;
import Bag = artemis.utils.Bag;
import UUID = artemis.utils.UUID;
import ImmutableBag = artemis.utils.ImmutableBag;
import Manager = artemis.Manager;
import Entity = artemis.Entity;
import Aspect = artemis.Aspect;
import EntitySystem = artemis.EntitySystem;

function Id() {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
  }
}

/**
 * @Mapper artems.component.Position
 * em:ComponentMapper<Position>;
 * 
 */
function Mapper(component: Function) {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    return descriptor;
  }
}
