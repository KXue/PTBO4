const mainState = {
    nodeGrid: null,
    create: function(){
        console.log('main');
        this.populateGrid();
    },

    populateGrid: function(){
        if(this.nodeGrid === null){
            this.nodeGrid = this.add.group();
        }
        const startX = (game.width  - CONSTANTS.gridWidth * CONSTANTS.cellSize) * 0.5;
        const startY = (game.height - CONSTANTS.gridHeight * CONSTANTS.cellSize) * 0.5;
    
        for(let row = 0; row < CONSTANTS.gridHeight; row++){
            for(let col = 0; col < CONSTANTS.gridWidth; col++){

                const cellX = startX + col * CONSTANTS.cellSize;
                const cellY = startY + row * CONSTANTS.cellSize;
                
                const cell = this.nodeGrid.create(cellX, cellY, 'Roger');

                this.scaleCell(cell);         
            }
        }
    },

    scaleCell: function(cell){
        const scaleFactorX = CONSTANTS.cellSize / cell.width
        const scaleFactorY = CONSTANTS.cellSize / cell.height

        cell.scale.set(scaleFactorX, scaleFactorY);
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