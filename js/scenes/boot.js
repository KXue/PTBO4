const bootState = {
    preload: function(){
        game.load.image('splash', 'assets/splash.jpg');
    },
    create: function () {
        console.log('boot');
        let splashImage = this.add.image(400, 300, 'splash');
        splashImage.anchor.set(0.5, 0.5);
        let timedEvent = this.time.create(true);
        timedEvent.add(1000, ()=>{
            this.state.start('load');
        });
        timedEvent.start();
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