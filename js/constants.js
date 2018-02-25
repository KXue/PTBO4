const CONSTANTS ={
    width: 960,
    height: 680,
    cellSize: 75,
    gridWidth: 5,
    gridHeight: 5,

    getIndex: function(row, col){
        return row * this.gridWidth + col
    },
    getRowCol: function(index){
        return {
            row: Math.floor(index / CONSTANTS.gridWidth),
            col: index % CONSTANTS.gridWidth
        }
    },
}