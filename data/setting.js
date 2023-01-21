//----------.
// Settings |
//----------'
const setting = {
    canvas: {
        height: 600,
        width: 600,
        pixelize: true,
        rightclick: true,
        scale: 4.4,
        color: 'grey'//'#1A1A1A'
    },
    timeout: {
        update: 250,
        animation: 2000,
        collision: 200
    },
    debug: {
        enable: true,
        info: true
    }
};

const text = {
    default: {
        size: 14/setting.canvas.scale,
        weight: 'lighter',
        linespace: 1/setting.canvas.scale, 
        font: 'Courier New',
        color: 'white',
        box: {
            alpha: 0.75,
            textOffset: 5/setting.canvas.scale
        },
        dot: {
            alpha: 0.5,
            color: 'yellow',
            size: 5
        },
        center: {
            alpha: 0.75,
            color: 'green'
        }
    },
    debug: 0
};

//------.
// Keys |
//------'
const keyCode = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    RIGHT: 'ArrowRight',
    LEFT: 'ArrowLeft',
    W: 'KeyW',
    A: 'KeyA',
    S: 'KeyS',
    D: 'KeyD',
    SPACE: 'Space'
};

//-----------.
// Animation |
//-----------'
const ANIMATION = {
    IDLE: 'idle',
    WALK: 'walk',
    JUMP: 'rump',
    PUNCH: 'punch'
};

//-----------.
// Direction |
//-----------'
const DIRECTION = {
    UP: 'up',
    UPRIGHT: 'up-right',
    RIGHT: 'right',
    DOWNRIGHT: 'down-right',
    DOWN: 'down',
    DOWNLEFT: 'down-left',
    LEFT: 'left',
    UPLEFT: 'up-left'
};