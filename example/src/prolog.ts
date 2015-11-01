module example.components {
  export enum Layer {
    DEFAULT,
    BACKGROUND,
    ACTORS_1,
    ACTORS_2,
    ACTORS_3,
    PARTICLES

    // getLayerId() {
    // 	return ordinal();
    // }
  }
  export enum EFFECT {
    PEW, ASPLODE, SMALLASPLODE

  }

}
module example.core {

  export class Constants {

    public static FRAME_WIDTH:number = window.innerWidth;
    public static FRAME_HEIGHT:number = window.innerHeight;

    public static Groups = {
      PLAYER_BULLETS: "player bullets",
      PLAYER_SHIP: "player ship",
      ENEMY_SHIPS: "enemy ships",
      ENEMY_BULLETS: "enemy bullets"
    }

  }
}
