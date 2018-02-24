class Title extends Phaser.Scene{
    constructor(){
        super({key: 'title'});
    }
    preload(){
        //load sprites
    }
    create(){
        this.scene.start('main');
    }
}