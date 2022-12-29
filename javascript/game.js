//--------.
// Entity |
//--------'
class Entity {
    constructor(x,y,name){
        this.x = x;
        this.y = y;
        this.name = name;
        this.height = 0;
        // ----------------------------------TEMP-------------------------------
        // TODO: test
        this.sprites = {
            "front": new Image(),
            "back": new Image(),
            "test": new Image()
        };
        this.sprites.front.src = 'image/siormax_front.png';
        this.sprites.back.src = 'image/siormax_back.png';
        this.sprites.test.src = 'image/test.png';
        this.setSprite(this.sprites.test);
        //this.sprite = new Image();
        //this.sprite.src = 'image/siormax2.png';
        // ----------------------------------TEMP-------------------------------
    }

    setSprite(image){
        this.height = image.height;
        this.sprite = image;
    }

    paintEntity(context){
        // ----------------------------------TEMP-------------------------------
        //this.paintImage(context,this.sprite,this.x,this.y);
        this.paintImageFlip(context,this.sprite,this.x,this.y);
        // ----------------------------------TEMP-------------------------------
        if(setting.debug.enable){
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
            context.fillRect(this.x, this.y, text.default.size*7, text.default.size*4);
            context.restore();
            // Debug: Mouse pointer position
            context.save();
            context.fillStyle = text.default.color;//'#66FF99';
            context.fillText('Entity'+this.name, this.x+text.default.box.textOffset, this.y+text.default.size+text.default.linespace);
            context.fillText('x: '+this.x.toFixed(2), this.x+text.default.box.textOffset, this.y+text.default.size*2+text.default.linespace);
            context.fillText('y: '+this.y.toFixed(2), this.x+text.default.box.textOffset, this.y+text.default.size*3+text.default.linespace);
            context.restore();
        }
    }

    /* Paint image */
    paintImage(context,image,x,y){
        context.drawImage(
            image,
            x-image.width/setting.canvas.scale,
            y-image.height/setting.canvas.scale
        );
    }

    /* Paint image flipped horizontaly */
    paintImageFlip(context,image,x,y){
        context.save();
        context.translate(x+image.width,y);
        context.scale(-1,1);
        context.drawImage(
            image,
            image.width/2,
            -image.height/2
            //image.width/setting.canvas.scale,
            //image.height/setting.canvas.scale
        );
        context.restore();

        //console.log("------- imageW: "+image.width+" imageH: "+image.height+"");
    }

}

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
            entity.paintEntity(context);
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
        this.entities.push(new Entity(this.mouseX,this.mouseY,this.entitiesCount++));
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
                    entity.sprite = entity.sprites.front;
                });
                break;
            case 'Digit2':
                // code block
                this.entities.forEach((entity) => {
                    entity.sprite = entity.sprites.back;
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

    /* Sort array elements by */
    sortArrayY(array){
        array.sort(function(a, b){
            // aggiungo alla y, metà della sprite
            if(a.y+a.height < b.y+b.height) return -1;
            if(a.y+a.height > b.y+b.height) return 1;
            return 0;   
        });
    }
}