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
        // debug
        this.updateDebugCount = 0;
        this.animationDebugCount = 0;
        this.collisionDebugCount = 0;
        // entity
        this.entitiesCount = 1;
        this.entities = [];
        // Pointer 
        this.pointer = new Element(this.mouseX,this.mouseY,'Pointer','pointer');
    }

    paint(context) {
        // Background
        this.paintBackground(context);
        // TODO: Entities
        sortArrayByHitbox(this.entities);
        this.entities.forEach((entity) => {
            entity.paint(context);
        });
        // Pointer
        this.pointer.paint(context);
        // Info
        if(setting.debug.enable){
            this.paintInfo(context);
        }
    }

    update(){
        // debug
        if(setting.debug.enable){
            //console.log(' > update');
            this.updateDebugCount++;
        }
        // update
        this.entities.forEach((entity) => {
            entity.update();
        });
    }

    animation() {
        // debug
        if(setting.debug.enable){
            //console.log(' > animation');
            this.animationDebugCount++;
        }
        // animation 
        // ----------------------------- TEST -----------------------------
        this.entities.forEach((entity) => {
            if(entity.getDirection() == DIRECTION.LEFT){
                entity.setDirection(DIRECTION.RIGHT);
            }else{
                entity.setDirection(DIRECTION.LEFT);
            }
        });
        // ----------------------------- TEST -----------------------------
    }

    collision() {
        // debug
        if(setting.debug.enable){
            //console.log(' > collision');
            this.collisionDebugCount++;
        }
        // collision
        this.entities.forEach((entity) => {
            entity.getHitbox().setHit(collisionBetweenCircles(entity, this.pointer));
        });
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
        // Pointer
        this.pointer.setX(this.mouseX);
        this.pointer.setY(this.mouseY);
        this.pointer.update();
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

    paintInfo(context) {
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
        // Box
        context.save();
        context.globalAlpha = text.default.box.alpha;
        context.fillRect(0, 0, text.default.size*10, text.default.size*5);
        context.restore();
        // Info
        context.save();
        context.fillStyle = text.default.color;
        context.fillText('Info', text.default.box.textOffset, text.default.size);
        context.fillText(' update: '+this.updateDebugCount, text.default.box.textOffset, text.default.size*2);
        context.fillText(' animation: '+this.animationDebugCount, text.default.box.textOffset, text.default.size*3);
        context.fillText(' collision: '+this.collisionDebugCount, text.default.box.textOffset, text.default.size*4);
        context.restore();
    }
}