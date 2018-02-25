//level arrays
const level1 = {
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
    fBI: 11,
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

const level2 = {
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

const level3 = {
    level:[
        'C', 'L', 'L', 'T', 'L',
        'L', 'C', 'T', 'C', 'L',
        'T', 'L', 'C', 'C', 'T',
        'I', 'I', 'T', 'T', 'C',
        'L', 'T', 'T', 'C', 'C'
    ],
    width: 5,
    height: 5,
    // rotation: {index, angle}
    rotations: [{index:2,angle:-90}, {index:5,angle:-90}],
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

const level4 = {
    level:[
        'C', 'T', 'L', 'T', 'C','C', 'C', 'C', 'C', 'C',
        'L', 'T', 'L', 'I', 'L','L', 'C', 'T', 'L', 'C',
        'T', 'L', 'C', 'T', 'L','C', 'T', 'L', 'T', 'C',
        'T', 'T', 'L', 'C', 'I','I', 'C', 'T', 'C', 'C',
        'C', 'T', 'T', 'I', 'C','L', 'L', 'L', 'T', 'C',
        'C', 'L', 'L', 'I', 'I','I', 'L', 'L', 'T', 'C',
        'C', 'L', 'C', 'I', 'I','L', 'C', 'T', 'L', 'C',
        'C', 'T', 'T', 'L', 'L','L', 'T', 'T', 'L', 'C',
        'C', 'L', 'C', 'L', 'T','T', 'L', 'L', 'L', 'C',
        'C', 'C', 'C', 'C', 'C','C', 'C', 'C', 'C', 'C'

    ],
    width: 10,
    height: 10,
    // rotation: {index, angle}
    rotations: [{index:2,angle:-90}, {index:5,angle:-90}],
    roger: 0,
    fBI: 99,
    bitCoin: 66,

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
