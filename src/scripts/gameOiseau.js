import GameElement from "./gameElement";
import srcOiseauD from "./assets/images/OiseauVersGauche.png";
import srcOiseauG from "./assets/images/OiseauVersDroite.png";

function randomChoice(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}
export default class GameOiseau extends GameElement{

    static WIDTH = 96;

        constructor(width_canvas){
            let img;
            let height;
            let dX;
            let x;
            const cote = randomChoice(['droite','gauche']);
            if(cote === 'droite'){
                img = srcOiseauD;
                height = 92;
                dX = -4;
                x = width_canvas-GameOiseau.WIDTH;
            }
            else{
                img = srcOiseauG;
                height = 91;
                dX = +4;
                x = 0
            }
            super(x, Math.floor(Math.random()*300)+100,
                GameOiseau.WIDTH,height,img,dX);
            this.touche = false;

    }

    move(){
        this.x += this.deltaX;
    }


}