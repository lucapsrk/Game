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