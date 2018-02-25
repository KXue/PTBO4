const testLevel = {
    level:[
        'C', 'O', 'I', 'L', 'T',
        'T', 'C', 'C', 'O', 'C',
        'L', 'I', 'T', 'I', 'C',
        'C', 'L', 'C', 'I', 'T',
        'L', 'T', 'O', 'C', 'C'
    ],
    width: 5,
    height: 5,
    // rotation: {index, angle}
    rotations: [],
    roger: 0,
    fBI: 12,
    bitCoin: 24,

    getIndex: function(row, col){
        return row * this.width + col
    },
    getRowCol: function(index){
        return {
            row: Math.floor(index / this.width),
            col: index % this.width
        }
    },
};

const gridToKey = {
    F: 'FBI',
    R: 'Roger',
    T: 'perpendicularTails',
    L: 'rightAngleTails',
    I: 'lineTails',
    C: 'crossTails',
    O: 'oneTail'
};

//clockwise from 12 o clock. Matches images
const CONNECTIONS = {
    T:[
        new Phaser.Point(0, -1), 
        new Phaser.Point(1, 0),
        new Phaser.Point(0, 1)
    ],
    L:[
        new Phaser.Point(0, -1), 
        new Phaser.Point(1, 0)
    ],
    I:[
        new Phaser.Point(0, -1),
        new Phaser.Point(0, 1)
    ],
    C: [
        new Phaser.Point(0, -1),
        new Phaser.Point(1, 0),
        new Phaser.Point(0, 1),
        new Phaser.Point(-1, 0)
    ],
    O:[        
        new Phaser.Point(0, -1),
    ]
};

const mainState = {
    cellGrid: null,
    create: function(){
        console.log('main');
        this.cellGrid = cellGrid;
        this.cellGrid.createFromMapData(testLevel);
        this.cellGrid.floodFillFrom(0, (cell)=>{cell.tint = 0xff0000});
    },

    up: function(cell){

    },
    over: function(cell){
    this.add.tween(cell.scale).to({ x: this.scaleCell.scaleFactorX, y: this.scaleCell.scaleFactorY}, 100, Phaser.Easing.Cubic.Out, true, 10);
    },
    out: function(cell){
    this.add.tween(cell.scale).to({ x: this.scaleCell.scaleFactorX, y: this.scaleCell.scaleFactorY}, 100, Phaser.Easing.Cubic.Out, true, 10);
    },

}


// class Main extends Phaser.Scene{
//     constructor(){
//         super({key: 'main'});
//     }
//     preload(){
//         // this.load.image('hand', 'assets/hand.png')
//         //load sprites
//     }
//     create(){
//         console.log('main');
//         // this.scene.start('title');
//     }
// }
