const titleState = {
    create: function(){
        let startButton = this.add.image(game.width * 0.5, game.height * 0.5, 'hand');
        startButton.width = game.width;
        startButton.height = game.height;
        startButton.anchor.set(0.5, 0.5);
        startButton.inputEnabled = true;
        startButton.events.onInputDown.add(this.onStartButtonPressed, this);
    },
    onStartButtonPressed: function(){
        console.log(this.input.x + " " + this.input.y);
        this.state.start('select');
    }
}

// class Title extends Phaser.Scene{
//     constructor(){
//         super({key: 'title'});
//     }
//     create(){
//         console.log('title');
//         this.startButton = this.add.image(400, 300, 'hand').setInteractive();
//         this.input.on('gameobjectdown', this.onStartButtonPressed, this);
//     }
//     onStartButtonPressed(pointer, gameObject){
//         console.log("down");

//         if(gameObject === this.startButton){
//             this.scene.start('main');
//         }
//     }
// }