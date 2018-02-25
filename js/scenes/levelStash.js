//level arrays
const tutorialOne = {
    level:[
        'C', 'T', 'I', 'C',
        'O', 'O', 'O', 'O',
        'O', 'O', 'O', 'C'
    ],
    width: 4,
    height: 3,
    // rotation: {index, angle}
    rotations: [],
    roger: 0,
    fBI: [11,10],
    bitCoin: 3,

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

const tutorial2 = {
    level:[
        'C', 'T', 'T', 'C',
        'O', 'O', 'I', 'T',
        'O', 'C', 'L', 'C'
    ],
    width: 4,
    height: 3,
    // rotation: {index, angle}
    rotations: [{index:10,angle:-90}],
    roger: 0,
    fBI: 9,
    bitCoin: 11,

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
