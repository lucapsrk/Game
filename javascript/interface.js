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
}