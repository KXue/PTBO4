const bootState = {
    preload: function(){
    },
    create: function () {
        game.stage.backgroundColor = 0x000000;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.state.start('load');
    }
}
// class Boot extends Phaser.Scene{
//     constructor(){
//         super({key: 'boot'});
//     }
//     preload(){
//         this.load.image('splash', 'assets/splash.jpg')
//         //load splash
//     }
//     create(){
//         //show splash
//         console.log('boot');
//         this.splashImage = this.add.image(400, 300, 'splash');
//         this.timedEvent = this.time.delayedCall(3000, ()=>{
//             this.scene.start('load');
//         }, [], this);
//     }
// }
