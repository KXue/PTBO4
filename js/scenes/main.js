const testLevel = {
    level:[
        'C', 'O', 'I', 'L', 'T',
        'T', 'C', 'C', 'O', 'C',
        'L', 'I', 'T', 'I', 'C',
        'C', 'L', 'C', 'I', 'T',
        'L', 'T', 'O', 'C', 'C'
    ],
    width: 5,
    height: 5,
    // rotation: {index, angle}
    rotations: [],
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

const GAMESTATES = {
    playing: 0,
    won: 1,
    lost: 2
}

Object.freeze(GAMESTATES);

const mainState = {
    cellGrid: null,
    BGM:null,
    winSound: null,
    lossSound: null,
    winLossTransitionTime: 800,
    level: level1,
    titleText: null,
    currentState: GAMESTATES.playing,
    create: function(){
        this.currentState = GAMESTATES.playing;
        this.titleText = this.add.text(game.width * 0.5, 5, this.level.name, CONSTANTS.titleStyle);
        this.titleText.anchor.set(0.5, 0);
        this.BGM = this.add.audio('BGM');
        this.winSound = this.add.audio('winSound');
        this.lossSound = this.add.audio('loseSound');

        let winLossTransitionTimer = game.time.create(true);
        this.cellGrid = cellGrid;
        this.cellGrid.createFromMapData(this.level);
        this.cellGrid.evaluateGrid();
        cellGrid.winCallBack = ()=>{
            this.cellGrid.setNodesEnabled(false);
            this.currentState = GAMESTATES.won;
            this.BGM.stop();
            this.winSound.play('', 0, 1.2);
            this.level.complete = true;
            winLossTransitionTimer.add(this.winLossTransitionTime, ()=>{
                this.currentLevel+=1;
                this.showEndPopUp();
            });
            winLossTransitionTimer.start();
        };
        cellGrid.lossCallBack = ()=>{
            this.cellGrid.setNodesEnabled(false);
            this.currentState = GAMESTATES.lost;
            this.BGM.stop();
            this.currentLevel = 0;
            this.lossSound.play('', 0, 3);
            winLossTransitionTimer.add(this.winLossTransitionTime, ()=>{
                this.showEndPopUp();
            });
            winLossTransitionTimer.start();

        };

        let button = this.add.button(16, 16, 'back', ()=>{
            this.state.start('select');
        }, this);

        this.BGM.loopFull(0.3);
    },

    shutdown: function(){
        this.BGM.destroy();
        this.winSound.destroy();
        this.lossSound.destroy();

        this.BGM = null;
        this.winSound = null;
        this.lossSound = null;

        this.cellGrid.destroy();
        this.cellGrid = null;
        this.titleText.destroy();
        this.titleText = null;
    },

    showEndPopUp: function(){
        //fixed to 400 x 300
        const borderRadius = 20;
        const width = 250;
        const height = 100;
        const endText = this.currentState == GAMESTATES.won ? 'Congrats!' : 'Too Bad!';
        const popUpRectangle = new Phaser.Rectangle(
            (game.width - width) * 0.5,
            (game.height - height) * 0.5, 
            width, 
            height);
        
            const popUpFrame = this.add.graphics();
        popUpFrame.beginFill(0x000000, 1);
        popUpFrame.lineStyle(4, 0xffffff, 1);
        popUpFrame.drawRoundedRect(popUpRectangle.x, popUpRectangle.y, popUpRectangle.width, popUpRectangle.height, borderRadius);
        popUpFrame.endFill();
        
        const popUpTitle = this.add.text(popUpRectangle.centerX, popUpRectangle.top, endText, CONSTANTS.titleStyle);
        popUpTitle.anchor.set(0.5, 0);
        popUpFrame.addChild(popUpTitle);
        
        const buttonGroup = this.addEndButtons();
        buttonGroup.centerX = popUpRectangle.centerX;
        buttonGroup.y = popUpRectangle.bottom;
        popUpFrame.addChild(buttonGroup);

        // if(this.level.next === null){

        // }
        // else{

        // }
    },

    addEndButtons: function(){
        const buttonWidth = 60;

        const buttonGroup = this.add.group();

        const backButton = this.add.button(-buttonWidth, 0, 'back', ()=>{
            this.state.start('select');
        }, this);
        backButton.anchor.set(0.5, 1);


        const resetButton = this.add.button(0, 0, 'retry', () => {
            this.state.restart();
        }, this);
        resetButton.anchor.set(0.5, 1);
        if(this.level.next != null && this.currentState == GAMESTATES.won){
            const nextButton = this.add.button(buttonWidth, 0, 'next', () => {
                this.level = this.level.next;
                this.state.restart();
            }, this);
            nextButton.anchor.set(0.5, 1);
            buttonGroup.add(nextButton);
        }

        buttonGroup.add(backButton);
        buttonGroup.add(resetButton);
        return buttonGroup;
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
