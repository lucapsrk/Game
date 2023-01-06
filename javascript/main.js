//--------.
// Window |
//--------'
// Init window.
const mainWindow = window;

/**
 * Refresh page on windows resize.
 */ 
mainWindow.onresize = function(){ 
    location.reload(true); 
    //window.location.reload(true)
}

/** 
 * Disable rigth click on canvas. 
 */
mainWindow.addEventListener("contextmenu", function (event){
    event.preventDefault();
}, false);

//--------------------.
// Sprite pixel style |
//--------------------'
/**
 * Prevent pixel smoothing, preserve pixeled image when scaled.
 * @param {object} context 
 */
function pixelFrame(context) {
    context.imageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
}

//--------.
// Canvas |
//--------'
const canvas = document.getElementById('canvasId');
const canvasCtx = canvas.getContext('2d');
const wi = mainWindow.innerWidth;
const hi = mainWindow.innerHeight;
// Arrotondo alla decina più prossima per mantenere la proporzione
// e permettere l'ingrandimento dei pixel senza blur.
const wr = Math.round(wi/10)*10;
const hr = Math.round(hi/10)*10;
//alert('w: '+wi+' h: '+hi+' --- '+' wr: '+wr+' hr: '+hr);
// black border on canvas.
const frameBlackBorder = setting.canvas.border; 
canvas.width = wr - frameBlackBorder;
canvas.height = hr - frameBlackBorder;
const deltaX = (wi - canvas.width)/2;
const deltaY = (hi - canvas.height)/2;
// Text [scaled]
canvasCtx.font = text.default.weight+' '+text.default.size+'px '+text.default.font;

//----------.
// Pixelize |
//----------'
if(setting.canvas.pixelize){
    pixelFrame(canvasCtx);
}

//-------.
// Debug |
//-------'
if(setting.debug.enable){
    console.log('setting: ',setting);
} 

//------.
// Game |
//------'
var game = new Game();

//------------.
// Paint loop |
//------------'
function paint(){
    requestAnimationFrame(paint);
    // Scale & Paint
    canvasCtx.save();
    //canvasCtx.translate(0,0);
    canvasCtx.scale(setting.canvas.scale, setting.canvas.scale);
    game.paint(canvasCtx);
    canvasCtx.restore();
}
paint();

//-------------.
// Update loop |
//-------------'
function update(){
    setTimeout(update, setting.timeout.update);
    game.update();
}
update();

//----------------.
// Animation loop |
//----------------'
function animation(){
    setTimeout(animation, setting.timeout.animation);
    game.animation();
}
animation();

//----------------.
// Collision loop |
//----------------'
function collision(){
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