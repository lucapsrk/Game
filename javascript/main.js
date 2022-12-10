// Init window.
const mainWindow = window;

/**
 * Refresh page on windows resize.
 */ 
mainWindow.onresize = function(){ 
    location.reload(true); 
    //window.location.reload(true)
}

// ------------------------------------.
//          SPRITE PIXEL STYLE         |
// ------------------------------------'
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

// --------------------------------.
//          SETTING CANVAS         |
// --------------------------------'
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
const frameBlackBorder = 20; 
canvas.width = wr-frameBlackBorder;
canvas.height = hr-frameBlackBorder;
const deltaX = (wi - canvas.width)/2;
const deltaY = (hi - canvas.height)/2;
pixelFrame(canvasCtx);

// ----------------------.
//          GAME         |
// ----------------------'
//game = new Game('MetalBuax', mainWindow);

console.log('data: '+setting.timeout.animation);

// -----------------------.
//       PAINT LOOP       |
// -----------------------'
function paint(){
    requestAnimationFrame(paint);
}
paint();

// ---------------------------.
//      ANIMATION LOOP        |
// ---------------------------'
function animation(){
    setTimeout(animation, setting.timeout.animation);
    console.log(' > animation');
}
animation();

// ---------------------------.
//      COLLISION LOOP        |
// ---------------------------'
function collision(){
    setTimeout(collision, setting.timeout.cosllision);
    console.log(' > collision');
}
collision();

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