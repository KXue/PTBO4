const testLevel = {
    map:[
        'C', 'O', 'I', 'L', 'T',
        'T', 'C', 'C', 'O', 'C',
        'L', 'I', 'T', 'I', 'C',
        'C', 'L', 'C', 'I', 'T',
        'L', 'T', 'O', 'C', 'C'
    ],
    roger: new Phaser.Point(0, 0),
    fBI: new Phaser.Point(2, 2),
    bitCoin: new Phaser.Point(4, 4)
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
    nodeGrid: null,
    create: function(){
        console.log('main');
        this.populateGrid(testLevel.map);
        this.floodFillFrom(0);
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
            
            this.spawnCell(cellX, cellY, gridData[i]);

        }
    },

    spawnCell:function(cellX, cellY, key){
        if(this.nodeGrid !== null){
            const cell = game.add.button(cellX, cellY, gridToKey[key], ()=>{
                cell.angle +=90;
                this.floodFillFrom(0);
            });
            this.nodeGrid.add(cell);
            cell.anchor.setTo(0.5, 0.5);
            cell.onInputOver.add(this.over, this);
            cell.onInputOut.add(this.out, this);
            cell.onInputUp.add(this.up, this);

            this.scaleCell(cell);

            cell._nodeType = key;
            return cell;
        }
    },

    scaleCell: function(cell){
        const scaleFactorX = CONSTANTS.cellSize / cell.width
        const scaleFactorY = CONSTANTS.cellSize / cell.height

        cell.scale.set(scaleFactorX, scaleFactorY);
    },

    floodFillFrom: function(index){
        let unFilled = [index];
        let visited = new Set();
        for(let i = 0; i < this.nodeGrid.length; i++){
            this.nodeGrid.getAt(i).tint = 0xffffff;
        }
        while(unFilled.length > 0){
            const currentIndex = unFilled.shift();
            visited.add(currentIndex);
            const nextPoints = this.getConnections(currentIndex);
            for(let i = 0; i < nextPoints.length; i++){
                const nextIndex = CONSTANTS.getIndex(nextPoints[i].y, nextPoints[i].x);
                if(!visited.has(nextIndex)){
                    unFilled.push(nextIndex);
                }
            }
            this.nodeGrid.getAt(currentIndex).tint = 0xff0000;
        }
    },

    getConnections: function(index){
        const potentialConnections = this.getPotentialConnections(index);
        const rowCol = CONSTANTS.getRowCol(index);
        const positionPoint = new Phaser.Point(rowCol.col, rowCol.row);
        let connections = [];

        for(let i = 0; i < potentialConnections.length; i++){
            const neighbourPoint = Phaser.Point.add(positionPoint, potentialConnections[i]).round();
            if(neighbourPoint.x >= 0 && neighbourPoint.x < CONSTANTS.gridWidth && neighbourPoint.y >= 0 && neighbourPoint.y < CONSTANTS.gridHeight){
                const neighbourCell = this.nodeGrid.getAt(CONSTANTS.getIndex(neighbourPoint.y, neighbourPoint.x));
                if(this.doesCellHaveConnection(neighbourCell, Phaser.Point.negative(potentialConnections[i]).round())){
                    connections.push(neighbourPoint);
                }
            }
        }
        return connections;
    },

    getPotentialConnections: function(index){
        const cell = this.nodeGrid.getAt(index);
        const cellConnections = CONNECTIONS[cell._nodeType];
        const cellRotation = cell.rotation;

        let potentialConnections = [];

        for(let i = 0; i < cellConnections.length; i++){
            const potentialConnection = Phaser.Point.rotate(cellConnections[i].clone(), 0, 0, cellRotation).round();
            potentialConnections.push(potentialConnection);
        }
        return potentialConnections;
    },

    doesCellHaveConnection: function(cell, direction){
        let hasConnection = false;
        const potentialConnections = this.getPotentialConnections(this.nodeGrid.getIndex(cell));

        for(let i = 0; i < potentialConnections.length; i++){
            if(Phaser.Point.equals(potentialConnections[i], direction)){
                hasConnection = true;
                break;
            }
        }
        return hasConnection;
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
