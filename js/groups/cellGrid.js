const cellGrid = {
    grid: null,
    mapData: null,

    createFromMapData: function(map){
        this.mapData = map;
        if(this.grid !== null){
            this.grid.removeAll(true);
        }else{
            this.grid = game.add.group();
        }
        this.populateGrid(map);
    },

    destroy: function(){
        this.grid.destroy();
        this.grid = null;
        this.mapData = null;
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
    },

    spawnCell:function(cellX, cellY, key){
        if(this.grid !== null){

            const newCell = game.add.button(cellX, cellY, gridToKey[key], ()=>{
                newCell.angle += 90;
            });
            this.grid.add(newCell);

            newCell.anchor.setTo(0.5, 0.5);
            newCell.onInputOver.add(
                (cell)=>{
                    game.add.tween(cell.scale).to({ x: cell.scale.x+0.02, y: cell.scale.y + 0.02}, 50, Phaser.Easing.Cubic.Out, true, 10);
                }, this);
            newCell.onInputOut.add(
                (cell)=>{
                    game.add.tween(cell.scale).to({ x: cell._scaleFactorX, y: cell._scaleFactorY}, 50, Phaser.Easing.Cubic.Out, true, 10);
                }, this);
            newCell.onInputUp.add(
                (cell)=>{}, this);

            this.scaleCell(newCell);

            newCell._nodeType = key;
            return newCell;
        }
    },

    scaleCell: function(cell){
        const scaleFactorX = CONSTANTS.cellSize / cell.width
        const scaleFactorY = CONSTANTS.cellSize / cell.height

        cell._scaleFactorX = scaleFactorX;
        cell._scaleFactorY = scaleFactorY;

        cell.scale.set(scaleFactorX, scaleFactorY);
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

}

