const loadState = {
    preload: function(){
        this.load.image('hand', 'assets/images/hand.png');
        this.load.image('FBI', 'assets/images/FBI.png');
        this.load.image('Roger', 'assets/images/JollyRoger.png');
        this.load.image('back', 'assets/images/arrow_back_white_36x36.png');
        this.load.image('bitcoin', 'assets/images/bitcoin.png');

        this.load.image('crossTails', 'assets/images/crossTails.png');
        this.load.image('lineTails', 'assets/images/linearTails.png');
        this.load.image('oneTail', 'assets/images/oneTail.png');
        this.load.image('perpendicularTails', 'assets/images/perpendicularTails.png');
        this.load.image('rightAngleTails', 'assets/images/rightAngleTails.png');

        this.load.audio('BGM', 'assets/sounds/ptbo4track.wav');
        this.load.audio('winSound', 'assets/sounds/win.wav');
        this.load.audio('loseSound', 'assets/sounds/lose.wav');
        this.load.audio('rotateSound', 'assets/sounds/rotate.mp3');

    },
    create: function(){
        console.log('load');
        this.state.start('title');
    }
}
// class Load extends Phaser.Scene{
//     constructor(){
//         super({key: 'load'});
//     }
//     preload(){
//         this.load.image('hand', 'assets/hand.png')
//         //load sprites
//     }
//     create(){
//         console.log('load');
//         this.scene.start('title');
//     }
// }