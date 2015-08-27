module brokenspork.core {
  
  export class SpaceshipWarrior extends Game {
  
      public gameScreen:GameScreen;
  
      
      public create() {
          this.gameScreen = new GameScreen(this);
          //setScreen(gameScreen);
      }
  
  }
}

