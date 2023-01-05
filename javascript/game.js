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
        // entity
        this.entitiesCount = 1;
        this.entities = [];
    }

    paint(context) {
        // Background
        this.paintBackground(context);
        // TODO: Entities
        this.sortArrayY(this.entities);
        this.entities.forEach((entity) => {
            entity.paint(context);
        });
        // Pointer
        this.paintPointer(context);
        // Center
        this.paintCenter(context);
    }

    animation() {
        //console.log(' > animation');
    }

    collision() {
        //console.log(' > collision');
    }

    click(event){
        console.log(' < click '+event.button);
        // TODO: test pain entities
        //this.entities.push(new Entity(this.mouseX,this.mouseY,this.entitiesCount++));

        this.entities.push(new Element(this.mouseX,this.mouseY,'Element-'+this.entitiesCount++,'punto'));
    }

    mousemove(x, y){
        //console.log(' < mouse x: '+x+' y: '+y);
        this.mouseX = x;
        this.mouseY = y;
    }

    keydown(key, code){
        console.log(' < keydown key: '+key+' code: '+code);
        // ----------------------------------TEMP-------------------------------
        switch(code) {
            case 'Digit1':
                // code block
                this.entities.forEach((entity) => {
                    entity.direction = DIRECTION.LEFT;
                });
                break;
            case 'Digit2':
                // code block
                this.entities.forEach((entity) => {
                    entity.direction = DIRECTION.RIGHT;
                });
            break;
          }
          // ----------------------------------TEMP-------------------------------
    }

    keyup(key, code){
        console.log(' < keyup key: '+key+' code: '+code);
    }

    //-------.
    // Paint |
    //-------'
    paintBackground(context){
        // Background:
        context.save();
        context.fillStyle = setting.canvas.color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
    }

    paintPointer(context) {
        // Debug: Mouse pointer position
        if(setting.debug.enable){
            // Circle
            context.save();
            context.beginPath();
            context.globalAlpha = text.default.dot.alpha;
            context.fillStyle = 'red';
            context.arc(this.mouseX, this.mouseY, 2.5, 0, 2*Math.PI);
            context.fill(); // riempe
            context.restore();
            // Box
            context.save();
            context.globalAlpha = text.default.box.alpha;
            context.fillRect(this.mouseX, this.mouseY, text.default.size*7, text.default.size*4);
            context.restore();
            // Text
            context.save();
            context.fillStyle = text.default.color;
            context.fillText('Pointer', this.mouseX+text.default.box.textOffset, this.mouseY+text.default.size);
            context.fillText('x: '+this.mouseX.toFixed(2), this.mouseX+text.default.box.textOffset, this.mouseY+text.default.size*2);
            context.fillText('y: '+this.mouseY.toFixed(2), this.mouseX+text.default.box.textOffset, this.mouseY+text.default.size*3);
            context.restore();
        }
    }

    paintCenter(context) {
        // Circle
        context.save();
        context.beginPath();
        context.globalAlpha = text.default.center.alpha;
        context.fillStyle = text.default.center.color;
        context.arc(
            (canvas.width/setting.canvas.scale)/2, 
            (canvas.height/setting.canvas.scale)/2, 
            2.5, 0, 2*Math.PI
        );
        context.fill();
        context.restore();
    }

    /* Sort array elements by ...*/
    sortArrayY(array){
        array.sort(function(a, b){
            // aggiungo alla y, metà della sprite
            if(a.y+a.height < b.y+b.height) return -1;
            if(a.y+a.height > b.y+b.height) return 1;
            return 0;   
        });
    }
}