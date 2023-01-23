//--------.
// Window |
//--------'
// Init window.
const mainWindow = window;

/**
 * Refresh canvas on window resize.
 */ 
mainWindow.onresize = function(){ 
    setCanvas();
    setFont();
    pixelFrame(canvasCtx, setting.canvas.pixelize);
}

/** 
 * Disable rigth click on canvas. 
 */
mainWindow.addEventListener("contextmenu", function (event){
    if(!setting.canvas.rightclick){
        event.preventDefault();
    }
}, false);

/**
 * Set Canvas size and center coordinates.
 */
function setCanvas() {
    // Set canvas size
    canvas.width = setting.canvas.width;
    canvas.height = setting.canvas.height;
    // Set canvas center variables
    centerX = (canvas.width/setting.canvas.scale)/2;
    centerY = (canvas.height/setting.canvas.scale)/2;
}

/**
 * Set canvas text font and size.
 */  
function setFont() {
    canvasCtx.font = text.default.weight+' '+text.default.size+'px '+text.default.font;
}

/**
 * If enable is true, prevent pixel smoothing, preserve pixeled image when scaled.
 * @param {object} context 
 * @param {boolean} enable 
 */
function pixelFrame(context, enable) {
    if(enable) {
        context.imageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;    
    }
}

//--------.
// Canvas |
//--------'
const canvas = document.getElementById('canvasId');
const canvasCtx = canvas.getContext('2d');
var centerX = null;
var centerY = null;
setCanvas();
setFont();
pixelFrame(canvasCtx, setting.canvas.pixelize);

//-------.
// Debug |
//-------'
if(setting.debug.enable) {
    console.log('setting: ',setting);
} 

//------.
// Game |
//------'
var game = new Game();

//------------.
// Paint loop |
//------------'
/**
 * Call requestAnimationFrame (60 FPS). 
 * On each call, canvas scale it's set and game elemets draws. 
 */
function paint() {
    requestAnimationFrame(paint);
    // Scale & Paint
    canvasCtx.save();
    canvasCtx.scale(setting.canvas.scale, setting.canvas.scale);
    game.paint(canvasCtx);
    canvasCtx.restore();
}
paint();

//-------------.
// Update loop |
//-------------'
function update() {
    setTimeout(update, setting.timeout.update);
    game.update();
}
update();

//----------------.
// Animation loop |
//----------------'
function animation() {
    setTimeout(animation, setting.timeout.animation);
    game.animation();
}
animation();

//----------------.
// Collision loop |
//----------------'
function collision() {
    setTimeout(collision, setting.timeout.collision);
    game.collision();
}
collision();

//----------------.
// Mouse Listener |
//----------------'
// Mouse click
mainWindow.addEventListener('click', (event) => {
    game.click(event);
});

// Mouse move [scaled]
mainWindow.addEventListener('mousemove', (event) => {
    game.mousemove(event.offsetX/setting.canvas.scale, event.offsetY/setting.canvas.scale);
});

//-------------------.
// Keyboard Listener |
//-------------------'
// Keyboard
mainWindow.addEventListener('keydown', function(event){
    game.keydown(event.key, event.code);
});

mainWindow.addEventListener('keyup', function(event){
    game.keyup(event.key, event.code);
});

/*
 * Load file async.
 * @param {string} url 
 * @returns 
async function upload(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(">>>> data: "+data);
        return console.log(data);
    } catch (error) {
        console.error(error);
    }
}*/