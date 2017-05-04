import Game from './game';
import GameView from './game_view';

// entry file
document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas")[0];
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;

  let ctx = canvas.getContext('2d');
  let game = new Game();

  new GameView(game, ctx).start();
});
