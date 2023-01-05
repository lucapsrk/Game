//----------------.
// Game Interface |
//----------------'
class GameInterface {
    constructor(){
        if (this.constructor == GameInterface) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    paint(context) {
        throw new Error("Method 'paint(context)' must be implemented.");
    }

    animation() {
        throw new Error("Method 'animation()' must be implemented.");
    }

    collision() {
        throw new Error("Method 'collision()' must be implemented.");
    }

    click(){
        throw new Error("Method 'click()' must be implemented.");
    }

    mousemove(x, y){
        throw new Error("Method 'mousemove()' must be implemented.");
    }

    keydown(key, code){
        throw new Error("Method 'keydown()' must be implemented.");
    }

    keyup(key, code){
        throw new Error("Method 'keyup()' must be implemented.");
    }
}


//---------.
// Element |
//---------'
class Element{
    constructor(x,y,name,element,animation){
        this.x = x;
        this.y = y;
        this.name = name;
        this.element = element;
        this.direction = DIRECTION.RIGHT;
        this.animation = ANIMATION.IDLE;
        this.sprite = new Image();
        this.sprite.src = 'image/test.png';
    }

    paint(context){
        if(this.direction == DIRECTION.RIGHT){
            this.frame(context,this.sprite,this.x,this.y,false);
        }
        if(this.direction == DIRECTION.LEFT){
            this.frame(context,this.sprite,this.x,this.y,true);
        }
        if(setting.debug.enable){
            this.debug(context);
        }
    }

    /* Draw image, normal or flipped */
    frame(context,image,x,y,flip){
        context.save();
        if(flip){
            context.translate(x+image.width,y);
            context.scale(-1,1);
            context.drawImage(image,image.width/2,-image.height/2);
        }else{
            context.drawImage(image,x-image.width/2,y-image.height/2);
        }
        context.restore();
    }

    debug(context){
        // Circle
        context.save();
        context.beginPath();
        context.globalAlpha = text.default.dot.alpha;
        context.fillStyle = text.default.color;
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fill(); // riempe
        context.globalAlpha = 1;
        context.restore();
        // Box
        context.save();
        context.globalAlpha = text.default.box.alpha;
        context.fillRect(this.x, this.y, text.default.size*9, text.default.size*6);
        context.restore();
        // Debug: Mouse pointer position
        context.save();
        context.fillStyle = text.default.color;//'#66FF99';
        context.fillText(this.name, this.x+text.default.box.textOffset, this.y+text.default.size+text.default.linespace);
        context.fillText('    x: '+this.x.toFixed(2), this.x+text.default.box.textOffset, this.y+text.default.size*2+text.default.linespace);
        context.fillText('    y: '+this.y.toFixed(2), this.x+text.default.box.textOffset, this.y+text.default.size*3+text.default.linespace);
        context.fillText(' elem: '+this.element, this.x+text.default.box.textOffset, this.y+text.default.size*4+text.default.linespace);
        context.fillText(' anim: '+this.animation, this.x+text.default.box.textOffset, this.y+text.default.size*5+text.default.linespace);
        context.restore();
    }
}