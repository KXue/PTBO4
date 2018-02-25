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
    fBI: 13,
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

const mainState = {
    cellGrid: null,
    create: function(){
        console.log('main');
        this.cellGrid = cellGrid;
        this.cellGrid.createFromMapData(testLevel);
        this.cellGrid.evaluateGrid()
        let button = this.add.button(16, 16, 'back', ()=>{
            this.state.start('title');
        }, this);
        console.log(button);
    },
    shutdown:function (){
        this.cellGrid.destroy();
        this.cellGrid = null;
    }
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
