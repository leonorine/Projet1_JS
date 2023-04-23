import GameElement from "./gameElement";
import srcCible from "./assets/images/cible.png";

export default class GameCible extends GameElement{

    static WIDTH = 64;
    static HEIGHT = 64;

    constructor(width_canvas){
        super(Math.floor(Math.random()*(width_canvas-GameCible.WIDTH)),0,GameCible.WIDTH,GameCible.HEIGHT,srcCible);

    }
}