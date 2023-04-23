import GameElement from "./gameElement";
import srcFleche from "./assets/images/fleche2.png"

export default class GameFleche extends GameElement {

    static WIDTH = 39;
    static HEIGHT = 72;

    constructor(x,y) {
        super(x,y,39,72,srcFleche,0,-8);
    }

    move(canvas){
        this.y += this.deltaY;
    }

    collisionOiseauWithFleche(oiseau) {
        if(!oiseau){
            return false;
        }
        if(this.x < oiseau.x + oiseau.width && this.x + this.width > oiseau.x
            && this.y < oiseau.y + oiseau.height && this.y + this.height > oiseau.y){
            console.log("oiseau touche fleche");
            oiseau.touche = true;
            return true;
        }
    }






}