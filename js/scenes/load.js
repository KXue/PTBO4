class Load extends Phaser.Scene{
    constructor(){
        super({key: 'load'});
    }
    preload(){
        //load sprites
    }
    create(){
        this.scene.start('title');
    }
}