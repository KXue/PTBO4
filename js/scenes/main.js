const testGrid = [
    'R', 'O', 'I', 'I', 'L',
    'T', 'L', 'L', 'O', 'C',
    'L', 'I', 'T', 'I', 'C',
    'C', 'L', 'C', 'I', 'T',
    'L', 'T', 'O', 'C', 'F'
];

const gridMap = {
    F: 'FBI',
    R: 'Roger',
    T: 'perpendicularTails',
    L: 'rightAngleTails',
    I: 'lineTails',
    C: 'crossTails',
    O: 'oneTail'
};

const mainState = {
    nodeGrid: null,
    create: function(){
        console.log('main');
        this.populateGrid(testGrid);
    },

    fillGrid: function(key){
        if(this.nodeGrid === null){
            this.nodeGrid = this.add.group();
        }
        const startX = (game.width  - CONSTANTS.gridWidth * CONSTANTS.cellSize) * 0.5;
        const startY = (game.height - CONSTANTS.gridHeight * CONSTANTS.cellSize) * 0.5;

        for(let row = 0; row < CONSTANTS.gridHeight; row++){
            for(let col = 0; col < CONSTANTS.gridWidth; col++){

                const cellX = startX + col * CONSTANTS.cellSize;
                const cellY = startY + row * CONSTANTS.cellSize;

                const cell = game.add.button(cellX, cellY, key, ()=>{console.log("rotate");});

                this.nodeGrid.add(cell);
                this.scaleCell(cell);
            }
        }
    },

    populateGrid: function(gridData){
        if(this.nodeGrid === null){
            this.nodeGrid = this.add.group();
        }

        const startX = (game.width  - CONSTANTS.gridWidth * CONSTANTS.cellSize) * 0.5;
        const startY = (game.height - CONSTANTS.gridHeight * CONSTANTS.cellSize) * 0.5;

        for(let i = 0; i < gridData.length; i++){
            const col = i % CONSTANTS.gridWidth;
            const row =  Math.floor(i / CONSTANTS.gridWidth);

            const cellX = startX + col * CONSTANTS.cellSize;
            const cellY = startY + row * CONSTANTS.cellSize;

            const cell = game.add.button(cellX, cellY, gridMap[gridData[i]], ()=>{cell.angle +=90;});
            this.nodeGrid.add(cell);
            cell.onInputOver.add(this.over, this);
            cell.onInputOut.add(this.out, this);
            cell.onInputUp.add(this.up, this);

            this.scaleCell(cell);

        }
    },

    scaleCell: function(cell){
        const scaleFactorX = CONSTANTS.cellSize / cell.width
        const scaleFactorY = CONSTANTS.cellSize / cell.height

        cell.scale.set(scaleFactorX, scaleFactorY);
    },

    up: function(cell){

    },
    over: function(cell){
    this.add.tween(cell.scale).to({ x: 1.2, y: 1.2}, 100, Phaser.Easing.Cubic.Out, true, 10);
    },
    out: function(cell){
    this.add.tween(cell.scale).to({ x: 1, y: 1}, 100, Phaser.Easing.Cubic.Out, true, 10);
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
