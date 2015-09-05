module artemis {

  export interface IEntityTemplate {
    buildEntity(entity:artemis.Entity, world:artemis.World, ...args:any[]);
  }

}