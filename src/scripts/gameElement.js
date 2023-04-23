export default class GameElement {

    constructor(x,y,width,height,srcImage,deltaX = 0, deltaY=0){
        this.image = this.#createImage(srcImage);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.deltaX = deltaX;
        this.deltaY = deltaY;

    }

    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    #createImage(imageSource) {
    	  const newImg = new Image();
      	newImg.src = imageSource;
      	return newImg;
      }

    collisionWith(obj) {
        if(!obj){
            return false;
        }
        return this.x < obj.x + obj.width && this.x + this.width > obj.x
            && this.y < obj.y + obj.height && this.y + this.height > obj.y;
    }
}