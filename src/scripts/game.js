import GameArc from "./gameArc";
import KeyManager from "./keyManager";
import GameCible from "./gameCible";
import GameFleche from "./gameFleche";
import GameCarquois from "./gameCarquois";
import GameOiseau from "./gameOiseau";
import GameFin from "./gameFin";

function randChance(chance) {
   return Math.random() > chance;
}
export default class Game {

   #canvas;

   constructor(canvas,affichageNbFleches,afficheScore,affichageVies) {
      this.#canvas = canvas;
      this.context = this.#canvas.getContext("2d");
      this.arc = new GameArc((this.canvas.width/2)-GameArc.WIDTH/2,this.canvas.height);
      this.cible = new GameCible(this.canvas.width);
      this.fleches = [];
      this.affichageNbFleches = affichageNbFleches;
      this.nbFleches = this.arc.nbFleches;
      this.affichageScore = afficheScore;
      this.score = 0;
      this.carquois = new GameCarquois(this.canvas.width);
      this.carquoisInter = null;
      this.oiseaux = [];
      this.oiseauInter = null;
      this.affichageVies = affichageVies;
      this.vies = 3;
      this.finale = new GameFin();
      this.keyManager = new KeyManager();
      this.pause = null;
      this.raf = null;
   }

   /** donne accès au canvas correspondant à la zone de jeu */
   get canvas() {
      return this.#canvas;
   }

   animate(){
      this.context.clearRect(0,0,this.canvas.width,this.canvas.height);

      this.arc.handleMoveKeys(this.keyManager);
      this.arc.move(this.canvas);
      this.arc.draw(this.context);

      this.cible.draw(this.context);


      this.fleches.forEach(fleche => fleche.move(this.canvas));
      this.fleches.forEach(fleche => fleche.draw(this.context));
      this.fleches = this.fleches.filter((fleche) => {
         if(fleche.collisionWith(this.cible)){
            this.cible = null;
            this.score+=1000;
            return false;
         }
         return true

      });

      this.fleches = this.fleches.filter(fleche => {
         if (fleche.y < 0-GameFleche.HEIGHT){
            return false;
         }
         return !this.oiseaux.reduce((prev, oiseau) => prev || fleche.collisionOiseauWithFleche(oiseau), false);
      });

      this.oiseaux = this.oiseaux.filter(oiseau => !(oiseau.touche));



      if(this.cible === null) {
         this.cible = new GameCible(this.canvas.width);
      }

      this.carquois?.draw(this.context);

      if(this.arc.collisionWith(this.carquois)){
         this.nbFleches = 5;
         this.carquois = null;
      }

      this.oiseaux.forEach(oiseau => oiseau.move());
      this.oiseaux.forEach(oiseau => oiseau.draw(this.context));
      this.oiseaux = this.oiseaux.filter(oiseau => {
         if ( oiseau.x >= (this.canvas.width)|| oiseau.x < 0-GameOiseau.WIDTH){
            return false;
         }
         else if(oiseau.collisionWith(this.arc)){
            this.nbVies -= 1;
            return false;
         }
         if(oiseau.collisionWith(this.carquois)){
            this.carquois = null;
         }
         return true;
      });


      if(this.nbVies === 0){
         this.finale.draw(this.context);
         return this.startAndStop();
      }
     this.raf = window.requestAnimationFrame(this.animate.bind(this));
   }

   get nbVies(){
      return this.vies;
   }

   set nbVies(value){
      this.vies = value;
      for(let i = 0; i < this.affichageVies.children.length; ++i) {
         if(i < this.vies) { // afficher
            this.affichageVies.children[i].style.display = "";
         }
         else { // cacher
            this.affichageVies.children[i].style.display = "none";
         }
      }
   }
   get nbFleches(){
      return this.arc.nbFleches;
   }

   set nbFleches(value){
      this.arc.nbFleches = value;
      this.affichageNbFleches.textContent = this.arc.nbFleches;
   }
   get score(){
      return this._score;
   }
   set score(value) {
      this._score = value;
      this.affichageScore.textContent = this._score;
   }
   startAndStop() {
      if(this.raf === null && this.nbVies !== 0) {
         this.raf = window.requestAnimationFrame(this.animate.bind(this));
         this.carquoisInter = setInterval(() => {
            if (randChance(0.5)) {
               this.carquois = new GameCarquois(this.canvas.width);
            }
         }, 1500);
         this.oiseauInter = setInterval(() => {
            if (randChance(0.75)) {
               this.oiseaux.push(new GameOiseau(this.canvas.width));
            }
         }, 1000);
         document.getElementById('stopAndStartGame').textContent = "Pause";
         this.pause = false;
      }
      else{
         clearInterval(this.carquoisInter);
         clearInterval(this.oiseauInter)
         window.cancelAnimationFrame(this.raf);
         this.raf = null;
         document.getElementById('stopAndStartGame').textContent = "Jouer";
         this.pause = true;

      }

   }

   flechesTirees(){
      if(this.keyManager.space && this.nbFleches > 0 && this.pause === false) {
         this.fleches.push(new GameFleche(this.arc.x+ (GameArc.WIDTH/2 - GameFleche.WIDTH/2), this.arc.y));
         this.nbFleches -=1;
      }

   }



   keyDownActionHandler(event) {
      switch (event.key) {
         case "ArrowLeft":
         case "Left":
            this.keyManager.leftPressed();
            break;
         case "ArrowRight":
         case "Right":
            this.keyManager.rightPressed();
            break;
         case "ArrowUp":
         case "Up":
            this.keyManager.upPressed();
            break;
         case "ArrowDown":
         case "Down":
            this.keyManager.downPressed();
            break;
         case " ":
            if(event.repeat) this.keyManager.spaceReleased();
            else this.keyManager.spacePressed();
            break;
         default: return;
      }
      event.preventDefault();
   }
   keyUpActionHandler(event) {
      switch (event.key) {
         case "ArrowLeft":
         case "Left":
            this.keyManager.leftReleased();
            break;
         case "ArrowRight":
         case "Right":
            this.keyManager.rightReleased();
            break;
         case "ArrowUp":
         case "Up":
            this.keyManager.upReleased();
            break;
         case "ArrowDown":
         case "Down":
            this.keyManager.downReleased();
            break;
         case " ":
            this.flechesTirees();
            break;
         default: return;
      }
      event.preventDefault();
   }
}
