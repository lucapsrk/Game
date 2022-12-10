//------.
// Game |
//------'
class Game extends GameInterface {
    constructor(){
        super();
        this.states = null;
        this.currentState = null;
        this.mouseX = 0;
        this.mouseY = 0;
    }

    paint(context) {
        context.save();
        context.fillStyle = '#212121';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();

        context.save();
        context.fillStyle = '#FF0000';
        context.fillRect(this.mouseX, this.mouseY, 10, 10);
        context.restore();
    }

    animation() {
        //console.log(' > animation');
    }

    collision() {
        //console.log(' > collision');
    }

    click(){
        console.log(' < click');
    }

    mousemove(x, y){
        console.log(' < mouse x: '+x+' y: '+y);
        this.mouseX = x;
        this.mouseY = y;
    }

    keydown(key, code){
        console.log(' < keydown key: '+key+' code: '+code);
    }

    keyup(key, code){
        console.log(' < keyup key: '+key+' code: '+code);
    }

}