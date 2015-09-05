module artemis.utils {

  interface IHashMap {
    [key: string]: any;
  }
  export class Blackboard {

    private intelligence; IHashMap;

    constructor() {
      this.intelligence = {};
    }

    getEntry<T>(name:string):T {
      return this.intelligence[name];
    }

    setEntry<T>(name:string, intel:T) {
      this.intelligence[name] = intel;
    }

    removeEntry(name:string) {
      if (this.intelligence[name]) delete this.intelligence[name];
    }

  }
}