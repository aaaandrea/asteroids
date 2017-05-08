import Game from './game';
import GameView from './game_view';

// entry file
document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const playOrReset = () => {
    const game = new Game();
    new GameView(game, ctx).start();
  };

  key("enter", playOrReset);
});
