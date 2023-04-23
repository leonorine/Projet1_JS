import GameElement from "./gameElement";
import imgCarquois from "./assets/images/fleches2.png";


export default class GameCarquois extends GameElement {
    static WIDTH = 27;
    static HEIGHT = 72;
    constructor(width_canvas) {
        super(Math.floor(Math.random()*(width_canvas-GameCarquois.WIDTH)),
            Math.floor(Math.random()*300)+100,
            GameCarquois.WIDTH,GameCarquois.HEIGHT,imgCarquois);
    }

}