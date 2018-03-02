const levelSelectState = {
    levels: [level1, level2, level3, level4], //convenience
    buttonsGroup: null,
    create: function(){
        const titleText = this.add.text(game.width * 0.5, 5, "Choose a Level", CONSTANTS.titleStyle);
        titleText.anchor.set(0.5, 0);
        const maxWidth = game.width * 0.9;
        const maxHeight = game.height * 0.75;
        const smallestDimension = Math.min(maxWidth / this.levels.length, maxHeight);

        const startX = (game.width - (this.levels.length - 1) * smallestDimension) * 0.5;
        const startY = (game.height * 0.5);
        if(this.buttonsGroup === null){
            this.buttonsGroup = this.add.group();
        }

        for(let i = 0; i < this.levels.length; i++){
            const buttonX = startX + i * smallestDimension;
            const buttonY = startY;
            let selectButton = this.spawnLevelObject({x: buttonX, y: buttonY}, smallestDimension, this.levels[i], i);
            this.buttonsGroup.add(selectButton.button);
            selectButton.button.inputEnabled = selectButton.inputEnabled;
        }
    },
    shutdown: function(){
        this.buttonsGroup.destroy();
        this.buttonsGroup = null;
    },
    spawnLevelObject: function (centeredPosition, size, level, index){
        let displaySprite = 'crossTails';
        let interactive = true;
        if (level.prerequisite !== null){
            level.prerequisite.next = level;
            if (!level.prerequisite.complete){
                displaySprite = 'FBI';
                interactive = false;
            }
        }
        const addedButton = this.add.button(centeredPosition.x, centeredPosition.y, displaySprite, function () {
            mainState.level = level;
            this.state.start('main');
        }, this);

        addedButton.anchor.set(0.5, 0.5);

        const scaleFactorX = size / addedButton.width;
        const scaleFactorY = size / addedButton.height;

        addedButton._scaleFactorX = scaleFactorX;
        addedButton._scaleFactorY = scaleFactorY;

        addedButton.scale.set(scaleFactorX, scaleFactorY);

        addedButton._expandTween = game.add.tween(addedButton.scale).to({ x: addedButton.scale.x + 0.02, y: addedButton.scale.y + 0.02 }, 50, Phaser.Easing.Cubic.Out, false, 10);
        addedButton._contractTween = game.add.tween(addedButton.scale).to({ x: addedButton._scaleFactorX, y: addedButton._scaleFactorY }, 50, Phaser.Easing.Cubic.Out, false, 10);
        
        addedButton.onInputOver.add(
            (cell) => {
                addedButton._expandTween.start();
            }, this);
        addedButton.onInputOut.add(
            (cell) => {
                addedButton._contractTween.start();
            }, this);
            
        if(interactive){
            const buttonText = this.add.text(0, 0, '' + (index + 1), CONSTANTS.titleStyle);
            buttonText.anchor.set(0.5, 0.5);
            addedButton.addChild(buttonText);
        }

        return {button: addedButton,inputEnabled: interactive};
    }

};