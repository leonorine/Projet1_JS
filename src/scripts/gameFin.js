import GameElement from "./gameElement";
import srcFin from "./assets/images/Mort.png";


export default class GameFin extends GameElement{

    static WIDTH = 500;
    static HEIGHT = 645;
    constructor() {
        super(0,0,GameFin.WIDTH,GameFin.HEIGHT,srcFin);
    }

}