module example {

  declare var viewContainer;

  import Input = bosco.utils.Input;
  import World = artemis.World;

  export class InputController {
    
    world:World;

    start() {
      //this.world.replaceMouse(0, 0);
    }

    update(delta:number) {

      var pos = Input.mousePosition;

      //this.world.mouse.x = pos.x;
      //this.world.mouse.y = pos.y;
      //this.world.isFiring = Input.getMouseButton(0);

    }
  }
}