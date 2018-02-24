class Boot extends Phaser.Scene{
    constructor(){
        super({key: 'boot'});
    }
    preload(){
        this.load.image('splash', 'assets/splash.jpg')
        //load splash
    }
    create(){
        //show splash
        this.splashImage = this.add.image(400, 300, 'splash');
        this.timedEvent = this.time.delayedCall(3000, ()=>{
            this.scene.start('load');
        }, [], this);
    }
}