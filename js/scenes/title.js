class Title extends Phaser.Scene{
    constructor(){
        super({key: 'title'});
    }
    create(){
        console.log('title');
        this.startButton = this.add.image(400, 300, 'hand').setInteractive();
        this.input.on('gameobjectdown', this.onStartButtonPressed, this);
    }
    onStartButtonPressed(pointer, gameObject){
        console.log("down");

        if(gameObject === this.startButton){
            this.scene.start('main');
        }
    }
}