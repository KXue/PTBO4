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

const cellGrid = {
    grid: null,
    mapData: null,
    enemy: null,
    player: null,
    bitCoin: null,
    createFromMapData: function(map){
        this.mapData = map;
        if(this.grid !== null){
            this.grid.removeAll(true);
        }else{
            this.grid = game.add.group();
        }
        this.populateGrid(map);
        this.rotateCells(map.rotations);
    },

    destroy: function(){
        this.grid.destroy();
        this.grid = null;
        this.mapData = null;
        this.player.destroy();
        this.enemy.destroy();
        this.bitcoin.destroy();
        this.player = null;
        this.enemy = null;
        this.bitCoin = null;
    },

    populateGrid: function(mapData){
        if(this.grid !== null && this.grid.length > 0){
            this.grid.removeAll(true);
        }

        const startX = (game.width  - (mapData.width - 1) * CONSTANTS.cellSize) * 0.5;
        const startY = (game.height - (mapData.height - 1) * CONSTANTS.cellSize) * 0.5;

        for(let i = 0; i < mapData.level.length; i++){
            const rowCol = mapData.getRowCol(i);

            const cellX = startX + rowCol.col * CONSTANTS.cellSize;
            const cellY = startY + rowCol.row * CONSTANTS.cellSize;

            this.spawnCell(cellX, cellY, mapData.level[i]);
        }

        let enemyRowCol = this.mapData.getRowCol(this.mapData.fBI);
        let playerRowCol = this.mapData.getRowCol(this.mapData.roger);
        let bitCoinRowCol = this.mapData.getRowCol(this.mapData.bitCoin);

        enemyRowCol.row *= CONSTANTS.cellSize;
        enemyRowCol.col *= CONSTANTS.cellSize;

        playerRowCol.row *= CONSTANTS.cellSize;
        playerRowCol.col *= CONSTANTS.cellSize;

        bitCoinRowCol.row *= CONSTANTS.cellSize;
        bitCoinRowCol.col *= CONSTANTS.cellSize;

        this.enemy = game.add.image(startX + enemyRowCol.col, startY + enemyRowCol.row, 'FBI');
        this.player = game.add.image(startX + playerRowCol.col, startY + playerRowCol.row, 'Roger');
        this.bitCoin = game.add.image(startX + bitCoinRowCol.col, startY + bitCoinRowCol.row, 'bitcoin');

        this.enemy.anchor.set(0.5, 0.5);
        this.player.anchor.set(0.5, 0.5);
        this.bitCoin.anchor.set(0.5, 0.5);

        this.enemy.inputEnabled = false;
        this.player.inputEnabled = false;
        this.bitCoin.inputEnabled = false;

        this.squareScaleActor(this.enemy, CONSTANTS.cellSize * 0.5);
        this.squareScaleActor(this.player, CONSTANTS.cellSize * 0.5);
        this.squareScaleActor(this.bitCoin, CONSTANTS.cellSize * 0.5);
    },

    spawnCell:function(cellX, cellY, key){
        if(this.grid !== null){

            const newCell = game.add.button(cellX, cellY, gridToKey[key], ()=>{
                newCell.angle += 90;
                this.evaluateGrid();
            });

            newCell.anchor.setTo(0.5, 0.5);
            this.scaleCell(newCell);
            this.grid.add(newCell);

            newCell._expandTween = game.add.tween(newCell.scale).to({ x: newCell.scale.x + 0.02, y: newCell.scale.y + 0.02}, 50, Phaser.Easing.Cubic.Out, false, 10);
            newCell._contractTween = game.add.tween(newCell.scale).to({ x: newCell._scaleFactorX, y: newCell._scaleFactorY}, 50, Phaser.Easing.Cubic.Out, false, 10);

            newCell.onInputOver.add(
                (cell)=>{
                    newCell._expandTween.start();
                }, this);
            newCell.onInputOut.add(
                (cell)=>{
                    newCell._contractTween.start();
                }, this);
            newCell.onInputUp.add(
                (cell)=>{}, this);


            newCell._nodeType = key;
            return newCell;
        }
    },

    scaleCell: function(cell){
        const scaleFactorX = CONSTANTS.cellSize / cell.width;
        const scaleFactorY = CONSTANTS.cellSize / cell.height;

        cell._scaleFactorX = scaleFactorX;
        cell._scaleFactorY = scaleFactorY;

        cell.scale.set(scaleFactorX, scaleFactorY);
    },

    squareScaleActor: function(actor, newSize){
        const scaleFactorX = newSize / actor.width;
        const scaleFactorY = newSize / actor.height;

        actor.scale.setTo(scaleFactorX, scaleFactorY);
    },

    floodFillFrom: function(index, callBack){
        let unFilled = [index];
        let visited = new Set();

        while(unFilled.length > 0){
            const currentIndex = unFilled.shift();
            visited.add(currentIndex);
            const nextPoints = this.getConnections(currentIndex);
            for(let i = 0; i < nextPoints.length; i++){
                const nextIndex = this.mapData.getIndex(nextPoints[i].y, nextPoints[i].x);
                if(!visited.has(nextIndex)){
                    unFilled.push(nextIndex);
                }
            }
            callBack(this.grid.getAt(currentIndex));
        }
    },

    getConnections: function(index){
        const potentialConnections = this.getPotentialConnections(index);
        const rowCol = this.mapData.getRowCol(index);
        const positionPoint = new Phaser.Point(rowCol.col, rowCol.row);
        let connections = [];

        for(let i = 0; i < potentialConnections.length; i++){
            const neighbourPoint = Phaser.Point.add(positionPoint, potentialConnections[i]).round();
            if(neighbourPoint.x >= 0 && neighbourPoint.x < this.mapData.width && neighbourPoint.y >= 0 && neighbourPoint.y < this.mapData.height){
                const neighbourCell = this.grid.getAt(this.mapData.getIndex(neighbourPoint.y, neighbourPoint.x));
                if(this.doesCellHaveConnection(neighbourCell, Phaser.Point.negative(potentialConnections[i]).round())){
                    connections.push(neighbourPoint);
                }
            }
        }
        return connections;
    },

    getPotentialConnections: function(index){
        const cell = this.grid.getAt(index);
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
        const potentialConnections = this.getPotentialConnections(this.grid.getIndex(cell));

        for(let i = 0; i < potentialConnections.length; i++){
            if(Phaser.Point.equals(potentialConnections[i], direction)){
                hasConnection = true;
                break;
            }
        }
        return hasConnection;
    },

    evaluateGrid: function(){
        this.resetGrid()
        let foundBitCoin = false;
        let foundFBI = false;
        this.floodFillFrom(this.mapData.roger, (cell)=>{
            cell.tint = 0xff0000;
            cell._isPirate = true;
            if(this.mapData.bitCoin == this.grid.getIndex(cell)){
                foundBitCoin = true;
            }
        });
        this.floodFillFrom(this.mapData.fBI, (cell)=>{
            cell.tint = 0x0090ff;
            cell._isFBI = true;
            if(cell._isPirate){
                foundFBI = true;
            }
        });
        if(foundFBI){
            //lost
        }
        else if(foundBitCoin){
            //won
        }
    },
    resetGrid: function(){
        for(let i = 0; i < this.grid.length; i++){
            const cell = this.grid.getAt(i);
            cell._isPirate = false;
            cell._isFBI = false;
            cell.tint = 0xffffff;
        }
    },
    rotateCells: function(rotations){
        for(let i = 0; i < rotations.length; i++){
            this.grid.getAt(rotations[i].index).angle = rotations[i].angle;
        }
    },
}
