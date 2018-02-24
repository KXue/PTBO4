const loadState = {
    preload: function(){
        this.load.image('hand', 'assets/images/hand.png');
        this.load.image('Cross', 'assets/images/Cross.png');
        this.load.image('I', 'assets/images/I.png');
        this.load.image('T', 'assets/images/T.png');
        this.load.image('FBI', 'assets/images/FBI.png');
        this.load.image('Roger', 'assets/images/JollyRoger.png');

        //load sprites
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