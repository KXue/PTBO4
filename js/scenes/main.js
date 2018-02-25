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
    BGM:null,
    winSound: null,
    lossSound: null,
    winLossTransitionTime: 1000,
    levels: [level1, level2, level3, level4],
    currentLevel: 0,
    create: function(){
        console.log('main');

        this.BGM = this.add.audio('BGM');
        this.winSound = this.add.audio('winSound');
        this.lossSound = this.add.audio('loseSound');

        let winLossTransitionTimer = game.time.create(true);
        this.cellGrid = cellGrid;
        this.cellGrid.createFromMapData(this.levels[this.currentLevel]);
        this.cellGrid.evaluateGrid();
        cellGrid.winCallBack = ()=>{
            this.BGM.stop();
            this.winSound.play('', 0, 1.2);
            winLossTransitionTimer.add(this.winLossTransitionTime, ()=>{
                this.currentLevel+=1;
                if(this.currentLevel < this.levels.length){
                    this.state.restart();
                }
                else{
                    this.currentLevel = 0;
                    this.state.start('win');
                }
            });
            winLossTransitionTimer.start();
        };
        cellGrid.lossCallBack = ()=>{
            this.BGM.stop();
            this.currentLevel = 0;
            this.lossSound.play('', 0, 3);
            winLossTransitionTimer.add(this.winLossTransitionTime, ()=>{this.state.start('loss');});
            winLossTransitionTimer.start();

        };

        let button = this.add.button(16, 16, 'back', ()=>{
            this.state.start('title');
        }, this);

        this.BGM.loopFull(0.3);
    },

    shutdown: function(){
        this.BGM.destroy();
        this.winSound.destroy();
        this.lossSound.destroy();

        this.BGM = null;
        this.winSound = null;
        this.lossSound = null;

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
