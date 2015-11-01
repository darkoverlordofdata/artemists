module shmup {

  declare var foreContainer;
  declare var viewContainer;

  import World = artemis.World;
  import Text = PIXI.Text;
  import ScoreComponent = artemis.components.ScoreComponent;

  export class ScoreLabelController {

    public label:Text;
    protected fps:Text;
    protected _fps:number;
    protected world:World;

    start() {


      this.label = new Text('Score', { font: 'bold 50px Arial', fill: 'white' });
      this.label.position.set((bosco.config.width - this.label.width) / 2, 10);
      viewContainer.addChild(this.label);
      //pool.getGroup(Matcher.Score).onEntityAdded.add((group, entity, index, component) => {
      //  this.updateScore(entity.score.value);
      //});
      //this.updateScore(this.world.score.value);
      this.fps = new Text('FPS', { font: 'bold 30px Arial', fill: 'white' });
      this.fps.position.set(0, 10);
      viewContainer.addChild(this.fps);

    }

    update(delta:number) {
      var fps = bosco.fps;
      if (this._fps !== fps) {
        this.fps.text = 'FPS ' + fps;
        this._fps = fps;
      }
    }

    updateScore(score:number) {
      this.label.text = 'Score '+score;
    }
  }
}