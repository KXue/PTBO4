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
    enemies: [],
    player: null,
    bitCoin: null,
    winCallBack: null,
    lossCallBack: null,
    maxCellSize: 0,
    cellTapSound: null,
    createFromMapData: function(map){
        this.mapData = map;
        if(this.grid !== null){
            this.grid.removeAll(true);
        }else{
            this.grid = game.add.group();
        }
        this.calculateMaxCellSize(map, game.width * 0.8, game.height * 0.8);
        this.cellTapSound = game.add.audio('rotateSound');
        this.populateGrid(map);
        this.rotateCells(map.rotations);
    },

    calculateMaxCellSize: function(map, screenWidth, screenHeight){
        const maxWidth = screenWidth / map.width;
        const maxHeight = screenHeight / map.height;

        this.maxCellSize = Math.min(maxWidth, maxHeight);
    },

    destroy: function(){
        this.grid.destroy();
        this.grid = null;
        this.mapData = null;
        this.player.destroy();
        for(let i = 0; i < this.enemies.length; i++){
            this.enemies[i].destroy();
        }
        this.enemies = [];
        this.bitCoin.destroy();
        this.player = null;
        this.bitCoin = null;
        this.cellTapSound.destroy();
        this.cellTapSound = null;
    },
    setNodesEnabled: function(enabled){
        for(let i = 0; i < this.grid.length; i++){
            this.grid.getAt(i).inputEnabled = enabled;
        }
    },
    populateGrid: function(mapData){
        if(this.grid !== null && this.grid.length > 0){
            this.grid.removeAll(true);
        }

        const startX = (game.width  - (mapData.width - 1) * this.maxCellSize) * 0.5;
        const startY = (game.height - (mapData.height - 1) * this.maxCellSize) * 0.5;

        for(let i = 0; i < mapData.level.length; i++){
            const rowCol = getRowCol(mapData, i);

            const cellX = startX + rowCol.col * this.maxCellSize;
            const cellY = startY + rowCol.row * this.maxCellSize;

            this.spawnCell(cellX, cellY, mapData.level[i]);
        }
        let enemyIndexArray = [];

        if(this.mapData.fBI.constructor !== Array){
            enemyIndexArray.push(this.mapData.fBI);
        }
        else{
            enemyIndexArray = this.mapData.fBI;
        }


        for(let i = 0; i < enemyIndexArray.length; i++){
            let enemyRowCol = getRowCol(mapData, enemyIndexArray[i]);
            enemyRowCol.row *= this.maxCellSize;
            enemyRowCol.col *= this.maxCellSize;
            const enemy = game.add.image(startX + enemyRowCol.col, startY + enemyRowCol.row, 'FBI')
            this.enemies.push(enemy);
            enemy.anchor.set(0.5, 0.5);
            enemy.inputEnabled = false;
            this.squareScaleActor(enemy, this.maxCellSize);
        }

        let playerRowCol = getRowCol(mapData, this.mapData.roger);
        let bitCoinRowCol = getRowCol(mapData, this.mapData.bitCoin);

        playerRowCol.row *= this.maxCellSize;
        playerRowCol.col *= this.maxCellSize;

        bitCoinRowCol.row *= this.maxCellSize;
        bitCoinRowCol.col *= this.maxCellSize;

        this.player = game.add.image(startX + playerRowCol.col, startY + playerRowCol.row, 'Roger');
        this.bitCoin = game.add.image(startX + bitCoinRowCol.col, startY + bitCoinRowCol.row, 'bitcoin');

        this.player.anchor.set(0.5, 0.5);
        this.bitCoin.anchor.set(0.5, 0.5);

        this.player.inputEnabled = false;
        this.bitCoin.inputEnabled = false;

        this.squareScaleActor(this.player, this.maxCellSize);
        this.squareScaleActor(this.bitCoin, this.maxCellSize);
    },

    spawnCell:function(cellX, cellY, key){
        if(this.grid !== null){

            const newCell = game.add.button(cellX, cellY, gridToKey[key], ()=>{
                newCell.beginRotation();
                // newCell.angle += 90;
                // if(!this.cellTapSound.isPlaying){
                //     this.cellTapSound.play('', 0, 1);
                // }
                // this.evaluateGrid();
            });

            newCell._deltaAngle = 9;
            newCell._degreesToRotate = 0;
            newCell._completeRotationCallback = this.evaluateGrid;
            newCell._completeRotationCallbackContext = this;
            newCell._tapSound = this.cellTapSound;

            newCell.beginRotation = function(){
                // this.inputEnabled = false;
                this._degreesToRotate += 90;
                if (!this._tapSound.isPlaying) {
                    this._tapSound.play('', 0, 1);
                }
            }
            newCell.update = function(){
                if(this._degreesToRotate > 0){
                    this.angle += this._deltaAngle;
                    this._degreesToRotate -= this._deltaAngle;
                    if(Math.round(this._degreesToRotate) < this._deltaAngle){
                        // this.inputEnabled = true;
                        this._degreesToRotate = 0;
                        this.angle = Math.round(this.angle / 90) * 90;
                        this._completeRotationCallback.apply(this._completeRotationCallbackContext);
                    }
                }
            }

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
        const scaleFactorX = this.maxCellSize / cell.width;
        const scaleFactorY = this.maxCellSize / cell.height;

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
                const nextIndex = getIndex(this.mapData, nextPoints[i].y, nextPoints[i].x);
                if(!visited.has(nextIndex)){
                    unFilled.push(nextIndex);
                }
            }
            callBack(this.grid.getAt(currentIndex));
        }
    },

    getConnections: function(index){
        const potentialConnections = this.getPotentialConnections(index);
        const rowCol = getRowCol(this.mapData, index);
        const positionPoint = new Phaser.Point(rowCol.col, rowCol.row);
        let connections = [];
        for(let i = 0; i < potentialConnections.length; i++){
            const neighbourPoint = RoundPoint(Phaser.Point.add(positionPoint, potentialConnections[i]));
            if(neighbourPoint.x >= 0 && neighbourPoint.x < this.mapData.width && neighbourPoint.y >= 0 && neighbourPoint.y < this.mapData.height){
                const neighbourCell = this.grid.getAt(getIndex(this.mapData, neighbourPoint.y, neighbourPoint.x));
                if (this.doesCellHaveConnection(neighbourCell, RoundPoint(Phaser.Point.negative(potentialConnections[i])))){
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
            const potentialConnection = RoundPoint(Phaser.Point.rotate(cellConnections[i].clone(), 0, 0, cellRotation));
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
            cell.tint = 0x87a1FF;
            cell._isPirate = true;
            if(this.mapData.bitCoin == this.grid.getIndex(cell)){
                foundBitCoin = true;
            }
        });
        let enemyIndexArray = [];
        if(this.mapData.fBI.constructor !== Array){
            enemyIndexArray.push(this.mapData.fBI);
        }
        else{
            enemyIndexArray = this.mapData.fBI;
        }
        for(let i = 0; i < enemyIndexArray.length; i++){
            this.floodFillFrom(enemyIndexArray[i], (cell)=>{
                cell.tint = 0xff0404;
                cell._isFBI = true;
                if(cell._isPirate){
                    foundFBI = true;
                }
            });
        }
        if(foundFBI){
            this.lossCallBack();
        }
        else if(foundBitCoin){
            this.winCallBack();
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
function RoundPoint(point){
    return new Phaser.Point(Math.round(point.x), Math.round(point.y))
}
