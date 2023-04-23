import GameElement from "./gameElement";
import srcArc from './assets/images/arc2.png';


export default class GameArc extends GameElement {

    static WIDTH = 96;
    static HEIGHT = 71;

    static nbFleches = 5;

    constructor(x,y,width,height){
        super(x,y,GameArc.WIDTH,GameArc.HEIGHT,srcArc);
        this.nbFleches = GameArc.nbFleches;
    }

    moveLeft() {
        this.deltaX = this.deltaX - 10; // le déplacement se fera vers la gauche, par pas de 10px
    }
    moveRight() {
        this.deltaX = this.deltaX + 10;// le déplacement se fera vers la droite, par pas de 10px
    }

    moveUp(){
        this.deltaY = this.deltaY - 10;
    }

    moveDown(){
        this.deltaY = this.deltaY + 10;
    }

    stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
    }
    move(box) {
        this.x = Math.max(0,Math.min(box.width - this.width, this.x + this.deltaX));
        this.y = Math.max(100,Math.min(box.height - this.height, this.y + this.deltaY));
    }

    handleMoveKeys(keyManager) {
        this.stopMoving(); // on réinitialise les déplacements
        if (keyManager.left) // touche flèche gauche pressée ?
            this.moveLeft();
        if (keyManager.right) // touche flèche droite pressée ?
            this.moveRight();
        if (keyManager.up)
            this.moveUp();
        if(keyManager.down)
            this.moveDown();
    }


}