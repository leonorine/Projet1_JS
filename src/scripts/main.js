
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler le panier
const init = () => {
   const canvas = document.getElementById("playfield");
   const nbArrows = document.getElementById("nbArrows");
   const score = document.getElementById("score");
   const vies = document.getElementById("lifes");
   const game = new Game(canvas,nbArrows,score,vies);

   document.getElementById("stopAndStartGame").addEventListener("click", event => {
      event.target.blur();
      game.startAndStop();
   });
   window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
   window.addEventListener('keyup', game.keyUpActionHandler.bind(game));
}

window.addEventListener("load", init);


console.log('le bundle a été généré');
