module artemis {
  "use strict";

  export interface IEntityTemplate {
    buildEntity(entity:artemis.Entity, world:artemis.World, ...args:any[]);
  }

}