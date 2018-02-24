class Load extends Phaser.Scene{
    constructor(){
        super({key: 'load'});
    }
    preload(){
        this.load.image('hand', 'assets/hand.png')
        //load sprites
    }
    create(){
        console.log('load');
        this.scene.start('title');
    }
}