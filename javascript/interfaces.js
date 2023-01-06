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

    update() {
        throw new Error("Method 'update()' must be implemented.");
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
    constructor(x,y,name,element){
        this.x = x;
        this.y = y;
        this.name = name;
        this.element = element;
        this.direction = DIRECTION.RIGHT;
        this.animation = ANIMATION.IDLE;
        this.sprite = new Image();
        this.sprite.src = 'image/test.png';
        this.hitbox = new Hitbox(x,y+this.sprite.height/2,10);
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    
    getName(){
        return this.name;
    }
    
    getElement(){
        return this.element;
    }
    
    getDirection(){
        return this.direction;
    }
    
    getAnimation(){
        return this.animation;
    }
    
    getSprite(){
        return this.sprite;
    }

    getHitbox(){
        return this.hitbox;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    setDirection(direction){
        this.direction = direction;
    }

    setAnimation(animation){
        this.animation = animation;
    }

    update(){
        // Update hitbox position
        this.getHitbox().update(this.getX(),this.getY()+this.getSprite().height/2);
    }

    paint(context){
        if(this.direction == DIRECTION.RIGHT){
            this.frame(context,this.getSprite(),this.getX(),this.getY(),false);
        }
        if(this.direction == DIRECTION.LEFT){
            this.frame(context,this.getSprite(),this.getX(),this.getY(),true);
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
        // Center
        context.save();
        context.beginPath();
        context.globalAlpha = text.default.dot.alpha;
        context.fillStyle = text.default.dot.color;
        context.arc(this.getX(), this.getY(), text.default.dot.size, 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 1;
        context.restore();
        // Hitbox
        this.getHitbox().paint(context);
        // Box
        context.save();
        context.globalAlpha = text.default.box.alpha;
        context.fillRect(this.getX(), this.getY(), text.default.size*9, text.default.size*6);
        context.restore();
        // Debug: Mouse pointer position
        context.save();
        context.fillStyle = text.default.color;//'#66FF99';
        context.fillText(this.getName(), this.getX()+text.default.box.textOffset, this.getY()+text.default.size+text.default.linespace);
        context.fillText('    x: '+this.getX().toFixed(2), this.getX()+text.default.box.textOffset, this.getY()+text.default.size*2+text.default.linespace);
        context.fillText('    y: '+this.getY().toFixed(2), this.getX()+text.default.box.textOffset, this.getY()+text.default.size*3+text.default.linespace);
        context.fillText(' elem: '+this.getElement(),this.getX()+text.default.box.textOffset, this.getY()+text.default.size*4+text.default.linespace);
        context.fillText(' anim: '+this.getAnimation(),this.getX()+text.default.box.textOffset, this.getY()+text.default.size*5+text.default.linespace);
        context.restore();
    }
}

class Hitbox{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = 'white';
        this.hit = false;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getRadius(){
        return this.radius;
    }

    getColor(){
        return this.color;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    setColor(color){
        this.color = color;
    }

    isHit(){
        return this.hit;
    }

    setHit(hit){
        this.hit = hit;
    }

    update(x,y){
        this.setX(x);
        this.setY(y);
        // If get hit change color:
        if(this.isHit()){
            this.setColor('red');
        }else{
            this.setColor('white');
        }
    }

    paint(context){
        if(setting.debug.enable){
            this.debug(context);
        }
    }

    debug(context){
        // Center
        context.save();
        context.beginPath();
        context.globalAlpha = text.default.dot.alpha;
        context.fillStyle = this.getColor();
        context.arc(this.getX(), this.getY(), this.getRadius(), 0, 2*Math.PI);
        context.fill();
        context.globalAlpha = 1;
        context.restore();
    }
}