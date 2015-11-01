/**
 * Inspired by Unity
 */
module artemis {

  export module utils {

    declare var dat;

    import World = artemis.World;
    //import Stopwatch = artemis.utils.Stopwatch;
    /** todo: SystemObserver track time spent in ms by system */

    export var gui;
    export class EntityViewer {
      public static _controllers;
      public static _entities;
      public static _pools;
      public static _systems;

      public static init(world:World) {
        if (location.search === "?debug=true" && window['dat']) {
          gui = new dat.GUI({height: 5 * 32 - 1, width: 300});

          var observer = new PoolObserver(pool);

          EntityViewer._controllers = {};
          EntityViewer._entities = gui.addFolder('Entities');
          EntityViewer._systems = gui.addFolder('Systems');

          EntityViewer._entities.open();
          EntityViewer._systems.open();

          world.onEntityCreated.add((pool, entity:Entity) => {
            var proxy = new EntityBehavior(entity);
            EntityViewer._controllers[entity.id] = EntityViewer._entities.add(proxy, proxy.name).listen();
          });

          world.onEntityDestroyed.add((pool, entity:Entity) => {
            var controller = EntityViewer._controllers[entity.id];
            delete EntityViewer._controllers[entity.id];
            EntityViewer._entities.remove(controller);
          });

        }
      }
    }

    /**
     * Profiler class for Entities
     */
    export class EntityBehavior {
      public get name():string {
        return this._name;
      }

      private _name:string;

      constructor(protected obj) {
        if (this.obj.name) {
          this._name = this.obj.name;
        } else {
          this._name = `Entity_${this.obj._creationIndex}`;
        }
        Object.defineProperty(this, this._name, {get: () => this.obj.toString()});
      }
    }

    /**
     * Profiler class for Systems
     */
    export class SystemObserver {
      public get name():string {
        return "Systems";
      }

      public get Systems():string {
        return "Systems " + " (" +
          this._systems._initializeSystems.length + " init, " +
          this._systems._executeSystems.length + " exe ";

      }

      public get initialize():string {
        return this._systems._initializeSystems.length;
      }

      public get execute():string {
        return this._systems._executeSystems.length;
      }

      constructor(protected _systems) {
      }
    }

    /**
     * Profiler class for Pools
     */
    export class PoolObserver {
      public get name():string {
        return "Pool";
      }

      public get Pool():string {
        return "Pool " + " (" +
          this._pool.count + " entities, " +
          this._pool.reusableEntitiesCount + " reusable, " +
          Object.keys(this._groups).length + " groups)";

      }

      public get entities():string {
        return this._pool.count;
      }

      public get reusable():string {
        return this._pool.reusableEntitiesCount;
      }

      protected _groups;

      constructor(protected _pool) {
        this._groups = this._pool._groups;
      }
    }
  }
}